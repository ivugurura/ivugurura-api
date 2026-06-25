import { makeRequest } from "./proxy";

const chatbotHeaders = token => ({
  server: "chatbot",
  headers: {
    "X-Auth-Token": token,
  },
});

export const ingestTopics = async () => {
  return makeRequest(chatbotHeaders(), `/ingest`, "POST");
};
