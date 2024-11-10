import { useEffect, useState } from "react";
import Book from "./Book"
import { useParams } from "react-router-dom";
import { getBooks, rateBook } from "../../Store/BookSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "../../Store/Store";
import { getLoginedUser } from "../../Store/UserSlice";

const BookDetails = () => {
    // Get Review Data
    const [hover, setHover] = useState(-1);
    const [rate, setRate] = useState(0)
    const [review, setReview] = useState("")

    // Get Local Books
    const books = useAppSelector(state => state.Book.books)

    // Get Loginned User
    const dispatch = useAppDispatch()
    const myUser = useAppSelector(state => state.User.loginnedUser)

    useEffect(() => {

        // Get Data From Local Storage
        dispatch(getBooks())

        // Get Loginned User
        const user = JSON.parse(localStorage.getItem("loginnedUser")!)
        dispatch(getLoginedUser(user))
    }, [])

    // Get The Selected Book
    const { bookid } = useParams()
    const myBook = books.filter(e => e.id == +(bookid!))


    // Check If The User Has Reviewed
    let hasReviewed = false
    if (myBook.length > 0) {
        myBook[0].reviews.map(e => {
            if (e.user.id == myUser.id) hasReviewed = true
        })
    }

    const isLogin = JSON.parse(localStorage.getItem("isLogin")!) == true
    return (
        <div className="row justify-content-center">
            {
                myBook.length > 0 &&
                <>
                    <div className="col-md-8">
                        <Book isLogin={isLogin} id={myBook[0].id} title={myBook[0].title} price={myBook[0].price} category={myBook[0].Category} desc={myBook[0].description} reviews={myBook[0].reviews} liked={myUser.Liked} />
                    </div>
                    <div className="row">
                        <div className="review col-md-6 d-flex flex-column justify-content-center">
                            <h3>Rating</h3>
                            {isLogin ?
                                <form className="form">
                                    <div className="d-flex gap-2 stars fs-5 mt-2">
                                        {
                                            Array.from({ length: 5 }).map((_, index) => {

                                                // This Is The Best Code That I have Wrote
                                                return <FontAwesomeIcon key={index} icon={rate == 0 ? index <= hover ? faStarSolid : faStarRegular : rate > index ? faStarSolid : faStarRegular} onMouseEnter={() => {
                                                    setHover(index)
                                                }}
                                                    onClick={() => {
                                                        setRate(index + 1)
                                                    }}
                                                />
                                            })
                                        }
                                    </div>
                                    <div className="form-floating mt-3 mb-3">
                                        <textarea className="form-control" placeholder="review" value={review} onChange={(e) => {
                                            setReview(e.target.value);
                                        }} />
                                        <label>Review</label>
                                    </div>
                                    <button className="btn btn-primary" disabled={hasReviewed} onClick={e => {
                                        e.preventDefault();

                                        // Books => State

                                        // Loginned User => Var

                                        // MyBook => MyBook[0]


                                        // Check If Details True  
                                        if (rate > 0 && review != "") {
                                            let userFound = false
                                            myBook[0].reviews.map(user => {
                                                if (user.user.id == myUser.id) userFound = true
                                            })
                                            if (!userFound) {
                                                dispatch(rateBook({ book: myBook[0], review: { review, user: myUser, rate } }))
                                                dispatch(getBooks())
                                            }
                                        }
                                    }
                                    }>Review</button>
                                </form>
                                : <h3>Please Login To Review This Book</h3>
                            }
                        </div>
                        <div className="col-md-6">
                            <h3 className="text-center">Reviews</h3>
                            {
                                myBook.length > 0 &&
                                    myBook[0].reviews.length > 0 ?
                                    myBook[0].reviews.map((e, index) => {
                                        return <div key={index} className="review mb-3 text-center">
                                            <p className="mb-0">{e.user.name}</p>
                                            <p className="mb-0">{e.review}</p>
                                            <div className="d-flex gap-2 stars fs-5 mt-2 justify-content-center">
                                                {
                                                    Array.from({ length: 5 }).map((_e, index) => {
                                                        return <FontAwesomeIcon key={index} icon={e.rate - 1 >= index ? faStar : faStarRegular} />
                                                    })
                                                }
                                            </div>
                                        </div>
                                    })
                                    :
                                    <h4 className="text-center fw-light">No Reviews</h4>
                            }

                        </div>
                    </div>
                </>

            }
        </div>
    )
}

export default BookDetails
