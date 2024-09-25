import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notify(state, action) {
      const payload = action.payload;
      console.log(payload);
      return payload;
    },
  },
});

export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
