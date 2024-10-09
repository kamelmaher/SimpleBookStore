/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isShown: boolean;
  text: string;
  color: string;
//   handleClick: (e: React.MouseEvent) => void;
};

const initialState: ModalState = {
  isShown: false,
  text: "",
  color: "",
//   handleClick: () => {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      localStorage.setItem("showModal", "true");
      state.text = action.payload.text;
      state.isShown = action.payload.isShown;
      state.color = action.payload.color;
    //   state.handleClick = action.payload.handleClick;
    },
    isShown: (state) => {
        state.isShown = JSON.parse(localStorage.getItem("showModal")!);
    }
  },
});

export default modalSlice.reducer;
export const { showModal , isShown} = modalSlice.actions;
