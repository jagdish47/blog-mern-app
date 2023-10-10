import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * It will take two callback functions
 * one for Success
 * two for Failure
 */

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    //got response you can stop loader here
    return processResponse(response);
  },

  function (error) {
    //got error we have to stop error here as well
    return Promise.reject(processError(error));
  }
);

/**
 * If Success -> return {isSuccess : true, data : Object}
 * if Fail -> return {isFailure:true, status:string, msg:string, code:int}
 */

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

/**
 *
 * Three Types of Error are there
 * 1->error.response
 * 2->error.request
 * 3->error When you got nothing inside error
 *
 */

const processError = (error) => {
  if (error.response) {
    //Request made and server responded with a status other
    console.log("ERROR IN RESPONSE : ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    //Request made but no response was received
    console.log("ERROR IN REQUEST : ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    //Something happend in setting up request that triggers an error
    console.log("ERROR IN NETWORK : ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadPregress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,

      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadPregress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          showDownloadPregress(percentageCompleted);
        }
      },
    });
}

export { API };
