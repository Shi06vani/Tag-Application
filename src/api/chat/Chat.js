import axios from 'axios';
import BASE_URL from "../../../config"

export const getChatBetweenUsers = async (userId, selectedUserId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/chat/${userId}/${selectedUserId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chat:', error);
    throw error;
  }
};



export const getUserChatList = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/chatlist/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat list:', error);
      throw error;
    }
  };

  
  // export const sendChatMessage = async (messageData) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/chat/send`, messageData, {
  //       headers: {
  //         'Content-Type': 'application/json',
          
  //       }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error sending chat message:', error);
  //     throw error;
  //   }
  // };
  
  export const sendChatMessage = async (messageData) => {

    console.log(messageData,"messageData----")
    try {
      const response = await axios.post(`${BASE_URL}/chat/send`, {
        senderId: messageData.senderId,
        receiverId: messageData.receiverId,
        text: messageData.text,
        type: messageData.type,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error.response?.data || error.message);
      throw error;
    }
  };