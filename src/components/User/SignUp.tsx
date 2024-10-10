import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { signUp, User } from "../../Store/UserSlice"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const SignUp = () => {
    const dispatch = useAppDispatch()
    const [newUser, setNewUser] = useState<User>({ id: 0, name: "", email: "", password: '', type: "Guest", Liked: [] , cart: []})
    const [passCheck, setPassCheck] = useState(true)
    const [retypePass, setRetypePass] = useState("")
    const [detailsCheck, setDetailsCheck] = useState(true)
    const [userFound, setUserFound] = useState(false)
    const users = useAppSelector(state => state.User.users)
    const navigate = useNavigate()
    return (
        <div>
            <h1>
                Sign Up
            </h1>
            <form className="form row mt-3">
                <div className="form-floating mb-3 col-md-6">
                    <input type="text" className="form-control" placeholder="Test" value={newUser.name} onChange={e => {
                        setNewUser({ ...newUser, name: e.target.value })
                    }} />
                    <label>Name</label>
                </div>
                <div className="form-floating mb-3 col-md-6">
                    <input type="text" className="form-control" placeholder="Test" value={newUser.email} onChange={e => {
                        setNewUser({ ...newUser, email: e.target.value })
                    }} />
                    <label>Email</label>
                </div>
                <div className="form-floating mb-3 col-md-6">
                    <input type="text" className="form-control" placeholder="Test" value={newUser.password} onChange={e => {
                        setNewUser({ ...newUser, password: e.target.value })
                        console.log("Password: ", newUser.password)
                    }} />
                    <label>Password</label>
                </div>
                <div className="form-floating mb-3 col-md-6">
                    <input type="text" className="form-control" placeholder="Test" value={retypePass} onChange={(e) => {
                        setRetypePass(e.target.value)
                        console.log("RetypePassword: ", e.target.value)
                    }} />

                    <label>Retype Password</label>
                </div>
                {!detailsCheck && <h3 className="text-danger">Check All Details!</h3>}
                {!passCheck && <h3 className="text-danger">Passwords Are Not Same!</h3>}
                {userFound && <h3 className="text-danger">This Is Email Is already Used!</h3>}
                <div>
                    <button className="btn btn-outline-primary" onClick={(e) => {
                        e.preventDefault()
                        const regExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
                        const nameCheck = newUser.name.length > 5
                        const emailCheck = newUser.email != "" && regExp.test(newUser.email)
                        const passCheck = newUser.password.length > 6
                        if (nameCheck && emailCheck && passCheck && retypePass != "") {

                            // Check All Details 
                            setDetailsCheck(true)

                            // Check Passwords
                            if (newUser.password != retypePass)
                                setPassCheck(false)
                            else {
                                // Check Email
                                const myUser = users.filter(e => e.email == newUser.email)
                                if (myUser.length == 0) {
                                    // All Conditions are True 
                                    dispatch(signUp({ ...newUser, id: Math.floor(Math.random() * 200) + 1  }))
                                    setNewUser({ ...newUser, name: "", email: "", password: "" })
                                    setPassCheck(true)
                                    setRetypePass("")
                                    setUserFound(false)
                                    console.log("Not Found")
                                    navigate("/login")
                                    toast.success("User Added Succefully!");
                                } else {
                                    setUserFound(true)
                                }
                            }
                        } else {
                            setDetailsCheck(false)
                        }
                    }}>Sign Up</button>
                </div>
            </form>
            <p>Already have an Account ? <NavLink to={"/login"}>LogIn Now</NavLink></p>
        </div>
    )
}

export default SignUp
