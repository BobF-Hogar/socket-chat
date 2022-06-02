import { configureStore, createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    username: "",
    messages: [],
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    addMessage: (state, action) => {
      if (action.payload) {
        state.messages = [...state.messages, action.payload];
      }
    },
  },
});

export const { setUsername, addMessage } = chatSlice.actions;

const usernameSelector = (state) => state.chat.username;
const messagesSelector = (state) => state.chat.messages;
const chatSelector = (state) => state.chat;

export { usernameSelector, messagesSelector, chatSelector };

export default configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});
