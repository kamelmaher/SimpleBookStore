import { useState } from "react"
import { AddNewCategory, Category } from "../../Store/CategorySlice";
import { useAppDispatch } from "../../Store/Store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate()
    const [name , setName] = useState("");
    const dispatch = useAppDispatch()
    return (
        <div>
            <form className="form">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e => {
                        setName(e.target.value)
                    })} />
                    <label>Name</label>
                </div>
                <button className="btn btn-primary" onClick={(e)=> {
                    e.preventDefault()
                    const newCategory:Category = {id: Math.floor(Math.random()*100) +1 , name: name}
                    dispatch(AddNewCategory(newCategory))
                    setName("")
                    navigate("/dashboard/showData")
                    toast.success("Category Added Succefully!")
                }}>Submit</button>
            </form>
        </div>
    )
}

export default AddCategory
