import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Store/Store";
import { useEffect } from "react";
import { getBooks } from "./Store/BookSlice";
import { getCategory } from "./Store/CategorySlice";
import logoImg from "../img/logo_green.png"
import { getLoginedUser, isLogin } from "./Store/UserSlice";
import { Slide, ToastContainer } from "react-toastify";
const Layout = () => {
    const dispatch = useAppDispatch()
    const checkLogin = useAppSelector(state => state.User.isLogin);
    const location = useLocation();
    useEffect(() => {
        dispatch(getBooks())
        dispatch(getCategory())
    }, [])
    useEffect(() => {
        dispatch(isLogin())
        dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
    }, [location])
    const loginnedUser = useAppSelector(state => state.User.loginnedUser)
    return (
        <>
            <ToastContainer transition={Slide} position={"bottom-right"} autoClose={1500} hideProgressBar={true} />
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold text-primary fs-3" to={"/"}>
                        <img src={logoImg} className="img-fluid" />
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            {checkLogin ?
                                <>
                                    {loginnedUser.type == "Admin" &&
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={"/dashboard"}>
                                                Dashboard
                                            </NavLink>
                                        </li>
                                    }
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/cart">
                                            Cart
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/account"}>
                                            Account
                                        </NavLink>
                                    </li>
                                </> :
                                <div className="gap-3 d-flex ">
                                    <NavLink to={"/login"}>
                                        <button className="btn btn-outline-primary">Login</button>
                                    </NavLink>
                                    <NavLink to={"/signUp"}>
                                        <button className="btn btn-outline-primary">SignUp</button>
                                    </NavLink>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="mt-2 p-3">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
