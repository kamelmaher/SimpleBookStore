import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import BookSlice from "./BookSlice";
import UserSlice from "./UserSlice";
import CategorySlice from "./CategorySlice";

export const Store = configureStore({
    reducer: {
        Book: BookSlice,
        User: UserSlice,
        Category: CategorySlice,
    },
});
export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof Store.getState>
> = useSelector;
