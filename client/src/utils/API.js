import axios from "axios";

export default {
  // Gets all books
  getLogEntries: function(id) {
    return axios.get(`/api/logbook/${id}/tail`);
  }
};
