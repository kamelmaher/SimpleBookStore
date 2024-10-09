/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./UserSlice";

export type review = {
  review: string;
  rate: number
  user: User;
};

export type BookType = {
  id: number;
  title: string;
  Category: string;
  price: number;
  description: string;
  reviews: review[];
};

type rateProps = {
  review: review;
  book: BookType;
};

const books:BookType[] = [
  {
    id: 0,
    title: "Book 1" ,
    Category: "Action",
    price: 50,
    description: "Test Test",
    reviews: []
  },
  {
    id: 1,
    title: "Book 2" ,
    Category: "Comedy",
    price: 60,
    description: "Test Test",
    reviews: []
  },
  {
    id: 2,
    title: "Book 3" ,
    Category: "Action",
    price: 20,
    description: "Test Test",
    reviews: []
  },
  {
    id: 3,
    title: "Book 4" ,
    Category: "Comedy",
    price: 50,
    description: "Test Test",
    reviews: []
  },
]

type BookState = {
  books: BookType[];
};
const initialState: BookState = {
  books: books,
};
const getData = () => {
  const data = localStorage.getItem("books");
  if (data) {
    const parsedData =JSON.parse(data); 
    return parsedData 
  }else {
    return books
  }
}

export const BookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookType>) => {
      state.books = getData()
      state.books.push(action.payload)
      localStorage.setItem("books" , JSON.stringify(state.books))
    },
    getBooks: (state) => {
      state.books = getData()
    },
    deleteBook: (state , action: PayloadAction<number>) => {
      state.books = getData()
      const newBooks = state.books.filter(e => e.id != action.payload)
      state.books = newBooks
      localStorage.setItem("books" , JSON.stringify(state.books))
    },
    editBook: (state , action: PayloadAction<BookType>) => {
      state.books = state.books.map(e => e.id == action.payload.id ? action.payload : e)
      localStorage.setItem("books" , JSON.stringify(state.books))
    },
    rateBook: (state , action: PayloadAction<rateProps>) => {
      state.books = getData()
      state.books.map(e => {
        if(e.id == action.payload.book.id) {
          e.reviews.push(action.payload.review)
        }
      })
      localStorage.setItem("books" , JSON.stringify(state.books))
    }
  },
});
export default BookSlice.reducer;
export const { addBook , getBooks , deleteBook , editBook , rateBook} = BookSlice.actions;
