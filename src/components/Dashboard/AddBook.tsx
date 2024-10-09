import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/Store";
import { addBook, BookType } from "../../Store/BookSlice";
import { Category } from "../../Store/CategorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    // const [newBook, setNewbook] = useState<string[]>([]) 
    // const inputs = ["Title" , "Price" , "Category" , "Description"]
    // const [books , setBooks] = useState<BookType[]>([])
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [desc, setDesc] = useState("")
    const dispatch = useAppDispatch()
    const categoryOptions: Category[] = useAppSelector(state => state.Category.category)
    const [auth, setAuth] = useState<boolean>(true)
    const navigate = useNavigate()
    return (
        <div>
            <form className="form">
                <div className="row">
                    {/* {
                        inputs.map((inputItem, i) => {
                            if (inputItem == "Description") return <div key={inputItem} className="form-floating mb-4 col-md-6">
                                <textarea className="form-control" placeholder="Place Holder" onChange={e => {
                                    setNewbook([...newBook, newBook[2] = e.target.value])
                                }}/>
                                <label>Description</label>
                            </div> 
                            else
                            return <div key ={inputItem} className="form-floating mb-4 col-md-4 col-lg-4">
                                <input type="text" className="form-control" placeholder="Test" onChange={(event)=> {
                                    
                                    console.log(newBook)
                                    }}/>
                                <label>{inputItem}</label>
                            </div>
                        })
                    } */}
                    <div className="form-floating mb-4 col-md-4 col-lg-4">
                        <input value={title} type="text" className="form-control" placeholder="Test" onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                        <label>Title</label>
                    </div>
                    <div className="form-floating mb-4 col-md-4 col-lg-4">
                        <input value={price} type="number" className="form-control" placeholder="Test" onChange={(e) => {
                            setPrice(+e.target.value)
                        }} />
                        <label>Price</label>
                    </div>
                    <div className="form-floating mb-4 col-md-4 col-lg-4">
                        <select className="form-select" aria-label="Default select example" value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option value="" disabled>
                                Choose Category
                            </option>
                            {
                                categoryOptions.map((e, i) => {
                                    return <option value={e.name} key={i}>{e.name}</option>
                                })
                            }
                            
                        </select>
                        <label>Category</label>
                    </div>
                    <div className="form-floating mb-4 col-md-6">
                        <textarea value={desc} className="form-control" placeholder="Place Holder" onChange={(e) => {
                            setDesc(e.target.value)
                        }} />
                        <label>Description</label>
                    </div>
                </div>
                {!auth && <h4 className="text-danger">Check All Details !</h4>}
                <div className="text-center text-md-start">
                    <button className="btn btn-outline-primary" onClick={(e) => {
                        e.preventDefault();
                        if (title != "" && price != 0 && category != "" && desc != "") {
                            const newBook: BookType = { id: Math.floor((Math.random() * 200) + 1), title: title, price: +price, Category: category, description: desc , reviews: []}
                            dispatch(addBook(newBook))
                            setTitle("")
                            setPrice(0)
                            setTitle("")
                            setDesc("")
                            setCategory("")
                            setAuth(true)
                            navigate("/dashboard/showData")
                            toast.success("Book Added Succefully!")
                        } else {
                            setAuth(false)
                        }
                    }} >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook
