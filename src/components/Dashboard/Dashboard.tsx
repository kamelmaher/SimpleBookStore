import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
const Dashboard = () => {
    const navigate = useNavigate()
    const [activeLink , setActiveLink] = useState(0)
    useEffect(()=> {
        navigate("/dashboard/showData")
    } , [])
    return (
        <div className="container">
            <nav className="navbar-expand-md">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item ms-3">
                            <NavLink to={"/dashboard/showData"}>
                                <button className={activeLink == 0 ?"btn btn-outline-primary active" : "btn btn-outline-primary"}  onClick={() => {
                                    setActiveLink(0)
                                }}>All</button>
                            </NavLink>
                        </li>
                        <li className="nav-item ms-3">
                            <NavLink to={"/dashboard/addBook"}>
                                <button className={activeLink == 1 ?"btn btn-outline-primary active" : "btn btn-outline-primary"}  onClick={() => {
                                    setActiveLink(1)
                                }}>Add Book</button>
                            </NavLink>
                        </li>
                        <li className="nav-item ms-3">
                            <NavLink to={"/dashboard/addCategory"}>
                                <button className={activeLink == 2 ?"btn btn-outline-primary active" : "btn btn-outline-primary"}  onClick={() => {
                                    setActiveLink(2)
                                }}>Add Category</button>
                                </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="mt-4">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Dashboard
