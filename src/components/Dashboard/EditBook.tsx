import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { useEffect, useState } from "react"
import { BookType, editBook } from "../../Store/BookSlice"
import { toast } from "react-toastify"

const EditBook = () => {
    const { bookid } = useParams()
    const books = useAppSelector(state => state.Book.books)
    const [myBook, setMyBook] = useState<BookType>({ id: 0, title: "", price: 0, Category: "", description: "" , reviews: [] })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        books.map(e => {
            if (e.id == +(bookid!)) setMyBook(e)
        })
    }, [books])
    return (
        <div>
            <h1>Edit Book id : {bookid}</h1>
            <form className="row">
                <div className="form-floating col-md-6">
                    <input type="text" className="form-control" placeholder="Name" value={myBook.title} onChange={e => {
                        setMyBook({ ...myBook, title: e.target.value })
                    }} />
                    <label>Title</label>
                </div>
                <div className="form-floating col-md-6">
                    <input type="number" className="form-control" placeholder="Name" value={myBook.price} onChange={e => {
                        setMyBook({ ...myBook, price: +e.target.value })
                    }} />
                    <label>Title</label>
                </div>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={() => {
                        dispatch(editBook(myBook))
                        toast.success("Book Edited Succefully!")
                        navigate("/dashboard/showData")
                    }}>Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditBook
