//Dependencies
require('dotenv').config({ path: '../.env' });
const faa = require('./faaData/functionData/faa');
const fs = require("fs");
const path = require("path");

// Global Constant
const thisFile = path.basename(module.filename);
let exportObj = {}; // export object
deleteList = [];
importList = getFiles();

// Extrapolates file list and table names to import and deletes old data
function getFiles() {
    // Dependencies
    var knexCleaner = require('knex-cleaner');
    const knexFile = require('../knexFile');
    let dbConfig = {};

    // Database connection init (knex) 
    knexFile.development ? dbConfig = knexFile.development : dbConfig = knexFile.production;
    const knex = require('knex')(dbConfig);

    // Deletes all database rows
    console.log('Removing all table data!')
    // knexCleaner.clean(knex).then(console.log('Deleting table data...')); **********************************

    const importFiles = [];
    const holdTillEnd = [];
    fs
        .readdirSync(`${__dirname}/faaData/json/`)
        .forEach(function (file) {
            if (file.substring(file.length - 5) === ".json") {
                if (file.slice(0, file.indexOf('.json')) != 'master') {
                    importFiles.push([`./faaData/json/${file}`, file.slice(0, file.indexOf('.json'))])
                } else {
                    holdTillEnd.push([`./faaData/json/${file}`, file.slice(0, file.indexOf('.json'))])
                }
            }
        });
    // move master file to end of array, to be processed last
    importFiles.push([holdTillEnd[0][0], holdTillEnd[0][1]]);
    for (let i = 0; i < importFiles.length; i++) {
        deleteList.push(importFiles[i][1]);
    }
    return importFiles;
}

function loadData(dataFile, tableName, _callback) {
    // Dependencies
    const knexFile = require('../knexFile');
    const LineByLineReader = require('line-by-line');

    // Global Constant
    lr = new LineByLineReader(dataFile, { skipEmptyLines: true });
    let row = {};
    let recording = false;
    let dbConfig = {};

    // Database connection init (knex) 
    knexFile.development ? dbConfig = knexFile.development : dbConfig = knexFile.production;
    const knex = require('knex')(dbConfig);

    // Line by line stream error catch
    lr.on('error', function (err) {
        throw err;
    });

    // Line by line stream start function
    lr.on('open', function () {
        console.log(`Loading ${tableName}...`)
    });

    // Line by line stream - process line
    lr.on('line', function (line) {
        if (line.indexOf('{') > -1 && !recording) {
            recording = true; // start recording key value pairs
        } else if (line.indexOf('}') > -1) {
            // End of key value pairs - pause stream and insert object (row) into database
            recording = false;
            lr.pause(); // Pause stream
            knex.insert(row) // Insert row object into database
                .into(tableName)
                .then((result) => {
                    if (tableName === 'master') {
                        console.log(row);
                        const flyObj = {
                            tailNo: row.nNumber,
                            serial: row.serialNumber,
                            uniqueCode: row.uniqueId,
                            transCode: row.modeSCode,
                        };
                        console.log(flyObj);





                        // knex.select("tailNo")
                        //     .from(fly)
                        //     .where("tailNo", row.nNumber)
                        //     .andWhere("serial", row.serialNumber)
                        //     .then(flyList => {
                        //         if (flyList.length === 0) {
                        //             return knex('fly')
                        //                 .insert([{
                        //                     tailNo: row.nNumber,
                        //                     serial: row.serial,
                        //                     enjType: row.typeEngine,
                        //                     password: bcrypt.hashSync(req.body.password, 10)
                        //                 }])
                        //                 .then((newUserId) => {
                        //                     console.log('inserted user', newUserId);
                        //                 });
                        //         }
                        //         console.log('not inserting user');
                        //         return;
                        //     });







                        // populate new tables here while looping through master input
                    }
                    row = {}; // Resets row
                })
                .finally(() => {
                    setTimeout(() => {
                        console.log('Next!')
                        lr.resume(); // Resumes the input stream
                    }, 2000);


                });
        }
        if (recording) {
            // Checks for key/value pairs withing text "" and processes
            if ((line.match(/"/g) || []).length === 4) {
                let l = [];
                l[0] = line.indexOf('"') // Index location of first "
                l[1] = line.indexOf('"', l[0] + 1) // Index location of second "
                l[2] = line.indexOf('"', l[1] + 1) // Index location of third "
                l[3] = line.indexOf('"', l[2] + 1) // Index location of fourth "
                // Inserts key/value pairs in row object
                row[line.slice((l[0] + 1), l[1])] = line.slice((l[2] + 1), l[3]);
            }
        }
    });

    // Closes knex connection on exit
    lr.on('end', function () {
        knex.destroy();
        console.log(`${tableName} complete!`)
        _callback();
    });
}

loopImport();

// recursively call itself until files list is consumed
function loopImport() {
    if (importList.length > 0) {
        let pFile = importList[0][0];
        let pTable = importList[0][1];
        importList.shift();
        loadData(pFile, pTable, loopImport)
    }
}