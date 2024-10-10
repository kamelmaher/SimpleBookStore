import { useNavigate } from "react-router-dom"
import { deleteBook, getBooks } from "../../Store/BookSlice"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { deleteCategory } from "../../Store/CategorySlice"
import { toast } from "react-toastify"
import { useEffect } from "react"

const ShowData = () => {

    const dispatch = useAppDispatch()
    const books = useAppSelector(data => data.Book.books)
    const category = useAppSelector(data => data.Category.category)
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getBooks())
    } , [category])
    return (
        <div>
            <h1 className="text-center">Books</h1>
            <table className="table mb-3">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((e, i) => {
                        return <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.title}</td>
                            <td>{e.price}$</td>
                            <td>{e.Category}</td>
                            <td><button className="btn btn-outline-success" onClick={() => {
                                navigate(`/dashboard/editBook/${e.id}`)
                            }}>Edit</button></td>
                            <td><button className="btn btn-outline-danger" onClick={() => {
                                dispatch(deleteBook(e.id))
                                toast.success("Book Deleted Succefully!")
                            }}>Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <h1 className="text-center mt-3">Categories</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Category Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((e, i) => {
                        return <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td><button className="btn btn-outline-danger" onClick={() =>{
                                dispatch(deleteCategory(e))
                                toast.success("Category Deleted Succefully!")
                            }}>Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShowData
