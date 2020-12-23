import axios from "axios";

// create an axios instance that uses port 3000, to hit the server.
export default axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3000`,
  responseType: "json"
});