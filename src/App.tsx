import { useEffect, useState } from 'react'
import './App.css'
import BookContainer from './components/Book/BookContainer'
import { BookType } from './Store/BookSlice'
import { useAppSelector } from './Store/Store'

function App() {
  // Use email: admin123@gmail.com  password: pass123 to login as Admin
  const books = useAppSelector(state => state.Book.books)
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([])
  const category = [{ name: "All" }, ...useAppSelector(state => state.Category.category)]
  useEffect(() => {
    setFilteredBooks(books)
  }, [books])
  const [activeCategory, setActiveCategory] = useState(0)
  return (
    <div>
      <nav className='navbar navbar-expand-md bg-secondary'>
        <ul className="navbar-nav m-auto gap-4 text-white">
          {category.map((e, i) => {
            return <li key={i} className={activeCategory == i ? 'nav-item btn btn-outline-primary text-white active' : 'nav-item btn btn-outline-primary text-white'}
              onClick={() => {
                // Active Category
                setActiveCategory(i)

                // Filtering Books
                const newData = books
                if (e.name == "All") setFilteredBooks(newData)
                else {
                  const data = newData.filter(item => item.Category == e.name)
                  setFilteredBooks(data)
                }
              }}
            >{e.name}</li>
          })}
          <div className="ps-4">
            <div className="">
              <input type="text" className="form-control" placeholder="Search" onChange={(e) => {
                if(activeCategory == 0 ) {
                  const newBooks = books.filter(item => item.title.startsWith(e.target.value))
                  setFilteredBooks(newBooks)
                }else {
                  const newBooks = books.filter(item => {
                    if(item.title.startsWith(e.target.value) && item.Category == category[activeCategory].name)
                      return e
                  })
                  setFilteredBooks(newBooks)
                }
              }}/>
            </div>
          </div>
        </ul>
      </nav>
      <div className='mt-4'>
        <BookContainer books={filteredBooks} />
      </div>
    </div>
  )
}

export default App
