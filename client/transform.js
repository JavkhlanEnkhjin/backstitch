import axios from "axios";

const axiosInstance = axios.create({
  baseURL: CONFIG_BASE_URL,

  transformResponse: [
    (data) => {
      let resp;

      try {
        resp = JSON.parse(data);
      } catch (error) {
        throw Error(
          `[requestClient] Error parsing response JSON data - ${JSON.stringify(
            error
          )}`
        );
      }

      if (resp.status === "success") {
        return resp.data;
      } else {
        throw Error(`[requestClient] Request failed with reason -  ${data}`);
      }
    },
  ],
});

export default axiosInstance;
