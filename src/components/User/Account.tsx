import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { disLikeApp } from "../../Store/UserSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { getLoginedUser } from "../../Store/UserSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Account = () => {
    const dispatch = useAppDispatch()
    const myUser = useAppSelector(state => state.User.loginnedUser)
    useEffect(() => {
        dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
    }, [])
    const navigate = useNavigate()
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h3>name: {myUser.name}</h3>
                    <h3>Email: {myUser.email}</h3>
                    <h3>Password: {myUser.password}</h3>
                    <h3>Liked Books: </h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>DisLike</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myUser.Liked.map(e => {
                                    return <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.title}</td>
                                        <td>{e.Category}</td>
                                        <td className="ps-4 like" onClick={() => {
                                            console.log("Dislike")
                                            dispatch(disLikeApp(e.id))
                                            dispatch(getLoginedUser(myUser.id))
                                            toast.success("Book Deleted Succefully!")
                                        }}><FontAwesomeIcon icon={faXmark} /></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <button className="btn btn-outline-danger" onClick={() => {
                        localStorage.setItem("isLogin", "false")
                        navigate("/")
                        toast.success("Log-Out Succefully")
                    }}>Log-Out</button>
                </div>
            </div>
        </div>
    )

}

export default Account
