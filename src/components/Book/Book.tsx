import img from "../../../img/img1.jpg"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartReagular } from "@fortawesome/free-regular-svg-icons"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { getLoginedUser, getUsers, likeBook } from "../../Store/UserSlice"
import { BookType, review } from "../../Store/BookSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { addToCart } from "../../Store/UserSlice"
type BookProps = {
    id: number,
    title: string,
    price: number,
    category: string,
    desc: string;
    reviews: review[]
    liked: BookType[]
    isLogin: boolean
}
const Book = ({ title, id, price, category, desc, reviews, liked , isLogin }: BookProps) => {
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
    }, [])
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const myuser = useAppSelector(state => state.User.loginnedUser)
    const [foundBook, setFoundBook] = useState(false)
    let likedBook = false
    liked.map(e => {
        if (e.id == id) {
            likedBook = true
        }
    })
    return (
        <div className="card mb-5 flex-row book" >
            <div className="card-img-top bg-danger w-50">
                <img src={img} className="img-fluid rounded" />
            </div>
            <div className="card-body">
                <div className="heading ">
                    <h4 className="mb-2"
                        onClick={() => {
                            navigate(`${"/book/" + id}`)
                        }}>{title}</h4>
                    <h5 className="text-success">{price}$</h5>
                    <h5 className="text-danger">{category}</h5>
                </div>
                <div className="text">
                    <p>{desc}</p>
                </div>
                {
                    isLogin &&
                    <div className="like fs-3 text-danger">
                        <FontAwesomeIcon icon={likedBook ? faHeart : faHeartReagular} onClick={() => {
                            const likedBook: BookType = { title: title, id: id, price: price, Category: category, description: desc, reviews: [] }
                            myuser.Liked.map(e => { if (e.id == likedBook.id) setFoundBook(true) })
                            if (!foundBook) {
                                dispatch(likeBook(likedBook))
                                dispatch(getLoginedUser(JSON.parse(localStorage.getItem("loginnedUser")!)))
                                toast.success("Book Liked!")
                            }
                        }} />
                    </div>
                }
                {
                    reviews.length > 0 && 
                    <div className="d-flex gap-2 stars fs-5 mt-2">
                        {
                            Array.from({ length: 5 }).map((e, index) => {
                                return <FontAwesomeIcon key={index} icon={reviews[0].rate <= index ? faStarRegular : faStar} />
                            })
                        }
                    </div>
                }
                <div className="mt-3">
                    <button className="btn btn-success" onClick={() => {
                        const book: BookType = { title: title, id, price, Category: category, description: desc, reviews: [] }
                        dispatch(addToCart(book))
                        toast.success("Added To Cart")
                    }}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Book
