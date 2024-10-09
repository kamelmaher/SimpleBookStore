/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookType } from "./BookSlice";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  Liked: BookType[];
  type: "Admin" | "Guest";
  cart: BookType[];
};

type UserState = {
  users: User[];
  isLogin: boolean;
  loginnedUser: User;
};

const initialUsers: User[] = [
  {
    id: 0,
    name: "Admin User",
    email: "admin123@gmail.com",
    password: "admin123",
    Liked: [],
    type: "Admin",
    cart: [],
  },
];
const initialState: UserState = {
  users: initialUsers,
  isLogin: false,
  loginnedUser: {
    id: 0,
    name: "Kamel Maher",
    email: "kamelmahersh@gmail.com",
    password: "kamelmaher",
    Liked: [],
    type: "Guest",
    cart: [],
  },
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<User>) => {
      const data = localStorage.getItem("users");
      if (data) {
        const parsedData = JSON.parse(data);
        state.users = parsedData;
      }
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    login: (_state, action: PayloadAction<number>) => {
      localStorage.setItem("loginnedUser", JSON.stringify(action.payload));
      localStorage.setItem("isLogin", JSON.stringify(true));
    },
    likeBook: (state, action: PayloadAction<BookType>) => {
      const data = localStorage.getItem("users");
      if (data) {
        const parsedData = JSON.parse(data);
        state.users = parsedData;
      }
      const id = JSON.parse(localStorage.getItem("loginnedUser")!);
      state.users.map((e) => {
        if (e.id == id) {
          const isIncluded = e.Liked.some((b) => b.id == action.payload.id);
          if (!isIncluded) {
            e.Liked.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
          }
        }
      });
    },
    disLikeApp: (state, action: PayloadAction<number>) => {
      const data = localStorage.getItem("users");
      if (data) {
        const parsedData = JSON.parse(data);
        state.users = parsedData;
      }
      const id = JSON.parse(localStorage.getItem("loginnedUser")!);
      state.users.map((e) => {
        if (e.id == id) {
          e.Liked = e.Liked.filter((e) => e.id != action.payload);
        }
      });
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    getUsers: (state) => {
      const data = localStorage.getItem("users");
      if (data) {
        const parsedData = JSON.parse(data);
        state.users = parsedData;
      }
    },
    isLogin: (state) => {
      state.isLogin = JSON.parse(localStorage.getItem("isLogin")!);
    },
    getLoginedUser: (state, action: PayloadAction<number>) => {
      const data = localStorage.getItem("users");
      if (data) {
        const parsedData = JSON.parse(data);
        state.users = parsedData;
      }
      state.users.map((e) => {
        if (e.id == action.payload) state.loginnedUser = e;
      });
    },
    addToCart: (_state, action: PayloadAction<BookType>) => {
      const users: User[] = JSON.parse(localStorage.getItem("users")!);
      const myUserId = JSON.parse(localStorage.getItem("loginnedUser")!);
      users.map((e) => {
        if (e.id == myUserId) {
          let found = false;
          e.cart.map((e) => {
            if (e.id == action.payload.id) {
              found = true;
            }
          });
          if (!found) e.cart.push(action.payload);
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
    },
    deleteFromCart: (_state, action: PayloadAction<BookType[]>) => {
      const users: User[] = JSON.parse(localStorage.getItem("users")!);
      const myUserId = JSON.parse(localStorage.getItem("loginnedUser")!);
      users.map(e => {
        if(e.id == myUserId) {
          const newCart = action.payload
          e.cart = newCart
        }
      })
      localStorage.setItem("users" , JSON.stringify(users))
    }
  },
});

export default UserSlice.reducer;
export const {
  likeBook,
  getUsers,
  disLikeApp,
  signUp,
  login,
  isLogin,
  getLoginedUser,
  addToCart,
  deleteFromCart,
} = UserSlice.actions;
