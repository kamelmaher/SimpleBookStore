import Book from "./Book"
import { BookType } from "../../Store/BookSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/Store";
import { getLoginedUser } from "../../Store/UserSlice";
type BookContainer = {
    books: BookType[]
}
const BookContainer = ({books}: BookContainer) => {
    const myUser = useAppSelector(state => state.User.loginnedUser)
    const dispatch = useAppDispatch()
    const isLoginned = JSON.parse(localStorage.getItem("isLogin")!) == true
    useEffect(()=> {
        dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
    } , [])
    return (
        <div className="row">
            {
                books.length <= 0 ? <h1> No Books Available</h1>
                :books.map(e => {
                    return <div key={e.id} className="col-md-6">
                        <Book isLogin= {isLoginned} id={e.id} title={e.title} price={e.price} category={e.Category} desc={e.description} reviews={e.reviews} liked={myUser.Liked}/>
                    </div>
                })
            }
        </div>
    )
}

export default BookContainer
