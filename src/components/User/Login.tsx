import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { getUsers, login } from "../../Store/UserSlice"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.User.users)
    const [email , setEmail] = useState("")
    const [Password , setPass] = useState("")
    const [checkLogin , setCheckLogin] = useState(true)
    const [checkUser , setCheckUser] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    return (
        <div>
            <h1>Login</h1>
            <form className="form mt-4 row">
                <div className="form-floating mb-3 col-md-6">
                    <input type="text" className="form-control" placeholder="Test" value={email} onChange={e => {
                        setEmail(e.target.value)
                    }} />
                    <label>Email</label>
                </div>
                <div className="form-floating mb-3 col-md-6">
                    <input type="password" className="form-control" placeholder="Test" value={Password} onChange={e => {
                        setPass(e.target.value)
                    }} />
                    <label>Password</label>
                </div>
                {!checkUser && <h3 className="text-danger">Email or Password are Wrong!</h3>}
                {!checkLogin && <h3 className="text-danger">Check All Details!</h3>}
                <div className="mt-3">
                    <button className="btn btn-outline-primary" onClick={e => {
                        setCheckUser(false)
                        e.preventDefault()
                        if(email != "" && Password != "") {
                            users.map(e => {
                                if(e.email == email && e.password == Password) {
                                    dispatch(login(e.id))
                                    setEmail("")
                                    setPass("")
                                    setCheckUser(true)
                                    navigate("/")
                                    toast.success(`Welcome ${e.name}`)
                                }
                            })
                            setCheckLogin(true)
                        }else {
                            setCheckLogin(false)
                        }
                    }}>Login</button>
                </div>
            </form>
            <p>Dont have an Account ? <NavLink to={"/signUp"}>Sign Up Now</NavLink></p>
        </div>
    )
}

export default Login
