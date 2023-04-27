import axios from "axios";
import { getBearerToken, logOut } from "./auth.js";

export var apiServer = "http://localhost:5000";
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  apiServer = "";
}
const baseEndpoint = `${apiServer}/`;
const instance = axios.create({
  baseURL: baseEndpoint,
});

//Add bearer token to each request if available
instance.interceptors.request.use(
  function (config) {
    const token = getBearerToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

//redirect to login of 401
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      logOut();
    } else {
      return Promise.reject(error);
    }
  }
);

function handleError(error, onError) {
  const statusCode = (error.response && error.response.status) || 500;

  let errorTitle = "Task failed, please retry.";
  if (error.response.data && error.response.data.ExceptionMessage)
    errorTitle = `Failed. ${error.response.data.ExceptionMessage}`;

  if (statusCode === 404) {
    errorTitle = "Content or Resource not found";
  }

  if (statusCode === 400) {
    errorTitle = "Invalid request";
  }

  if (statusCode === 401) {
    errorTitle = "Unauthorized, please login again.";
  }

  window.alert(errorTitle);
  if (onError) onError();
}

export async function get(url, body) {
  return instance.get(url, body).catch((error) => {
    handleError(error);
    throw error;
  });
}

export async function post(url, body, headers, onError) {
  try {
    const res = await instance.post(url, body, headers);

    return res && res;
  } catch (error) {
    handleError(error, onError);
  }
}
export async function put(url, body, headers, onError) {
  try {
    const res = await instance.put(url, body, headers);

    return res && res;
  } catch (error) {
    handleError(error, onError);
  }
}

export async function del(url) {
  try {
    return await instance.delete(url);
  } catch (error) {
    console.log(error);
    //showErrorMessage("Could not delete this item");
  }
}
