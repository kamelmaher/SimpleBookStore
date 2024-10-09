import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../Store/Store"
import { deleteFromCart, getLoginedUser } from "../Store/UserSlice";

const Cart = () => {
    const myUser = useAppSelector(state => state.User.loginnedUser)
    let total = 0;
    myUser.cart.map(e => {
        total += e.price
    })
    const dispatch = useAppDispatch()
    return (
        <div>
            <h1 className="text-center">Cart</h1>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Delete</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myUser.cart.length > 0 &&
                        myUser.cart.map(e => {
                            return <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.title}</td>
                                <td>{e.Category}</td>
                                <td><button className="btn btn-outline-danger" onClick={() => {
                                    const newCart = myUser.cart.filter(item => item.id != e.id)
                                    dispatch(deleteFromCart(newCart))
                                    dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
                                    toast.success("Book Deleted From Cart ")
                                }}>Delete</button></td>
                                <td className="text-success fw-bold">{e.price}$</td>
                            </tr>
                        })}
                </tbody>
                <tfoot>
                    <tr className="fw-bold">
                        <td colSpan={4} className="text-center text-danger">Total</td>
                        <td className="text-success">{total}$</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Cart
