let messages = [];

export const getMessages = () => {
  return fetch(`http://localhost:8088/messages`)
    .then((response) => response.json())
    .then((messageData) => {
      console.log("messageData", messageData);
      messages = messageData;
    });
};

export const useMessages = () => {
  return messages.slice();
};
