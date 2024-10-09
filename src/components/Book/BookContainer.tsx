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
    useEffect(()=> {
        dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
    } , [])
    // https://www.googleapis.com/books/v1/volumes
    // https://freetestapi.com/api/v1/books
    // useEffect(() => {
    //     const data = localStorage.getItem("books")
    //     if(data) {
    //         const parsedData = JSON.parse(data)
    //         setBooks(parsedData)
    //     }
    // }, [])
    return (
        <div className="row">
            {
                books.length <= 0 ? <h1> No Books Available</h1>
                :books.map(e => {
                    return <div key={e.id} className="col-md-6">
                        <Book id={e.id} title={e.title} price={e.price} category={e.Category} desc={e.description} reviews={e.reviews} liked={myUser.Liked}/>
                    </div>
                })
            }
            {/* <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div>
            <div className="col-md-4 col-lg-3">
                <Book />
            </div> */}
        </div>
    )
}

export default BookContainer
