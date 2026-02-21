import axios from "axios";
import "dotenv/config";
import { get } from "lodash";

const servers = {
  chatbot: {
    baseUrl: `${process.env.CHATBOT_SERVER_URL}/api/v1`,
    headers: {
      "Content-Type": "application/json",
    },
  },
};
const baseInstance = ({ server, ...rest }) => {
  const module = servers[server];
  return axios.create({
    baseURL: module.baseUrl,
    headers: {
      ...module.headers,
      ...rest.headers,
    },
  });
};

export async function makeRequest(iserver, url, method, data) {
  const instance = baseInstance(iserver);
  try {
    const res = await instance({ url, method, data });
    if (res.data.success) {
      const resultData = res.data?.data || res.data;
      return { success: true, status: res.status, data: resultData };
    }
    throw { message: res.data.message, status: 400 };
  } catch (err) {
    const error = err;
    let errorRes = {
      success: false,
      status: error.response?.status || 500,
      message: "",
    };
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const errorMsg =
        error.response.data?.error?.message ||
        error.response.data?.message ||
        "Failed to get response";
      errorRes = {
        ...errorRes,
        message: errorMsg,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (process.env.NODE_ENV !== "test") {
        errorRes.message = "No response received";
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      errorRes.message = get(
        error.message,
        "message",
        "Something happened in setting up the request",
      );
    }

    return errorRes;
  }
}
