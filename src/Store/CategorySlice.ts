/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookType } from "./BookSlice";

export type Category = {
  id: number;
  name: string;
};

type CategoryState = {
  category: Category[];
};
const initialState: CategoryState = {
  category: [
    {
      id: 0,
      name: "Action",
    },
    {
      id: 1,
      name: "Comedy",
    },
  ],
};
export const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    AddNewCategory: (state, action: PayloadAction<Category>) => {
      const data = localStorage.getItem("category");
      if (data) {
        state.category = JSON.parse(data);
      }
      state.category.push(action.payload);
      localStorage.setItem("category", JSON.stringify(state.category));
    },
    getCategory: (state) => {
      const data = localStorage.getItem("category");
      if (data) {
        state.category = JSON.parse(data);
      }
    },
    deleteCategory: (state , action: PayloadAction<Category>) => {
        const data = localStorage.getItem("category");
        if (data) {
          state.category = JSON.parse(data);
        }
        const newCategory = state.category.filter((e) => e.id != action.payload.id);
        
        state.category = newCategory;
        localStorage.setItem("category", JSON.stringify(state.category));
        const bookData = localStorage.getItem("books");
        if(bookData) {
          const ParsedData = JSON.parse(bookData);
          const books:BookType[] = ParsedData
          const newBooks:BookType[] = books.filter(e => e.Category != action.payload.name)
          localStorage.setItem("books" , JSON.stringify(newBooks))
        }
      }
  },
});
export default CategorySlice.reducer;
export const { AddNewCategory, getCategory , deleteCategory } = CategorySlice.actions;
