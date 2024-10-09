import { createRoot } from 'react-dom/client'
import './App.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.tsx'
import App from './App.tsx'
import Cart from './components/Cart.tsx'
import BookDetails from './components/Book/BookDetails.tsx'
import AddBook from './components/Dashboard/AddBook.tsx'
import AddCategory from './components/Dashboard/AddCategory.tsx'
import EditBook from './components/Dashboard/EditBook.tsx'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import { Store } from './Store/Store.ts'
import Account from './components/User/Account.tsx'
import SignUp from './components/User/SignUp.tsx'
import Login from './components/User/Login.tsx'
import ShowData from './components/Dashboard/ShowData.tsx'
// import Protected from './Protected.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<App />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/account' element={<Account />}></Route>
      <Route path='/book/:bookid' element={<BookDetails />}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
        <Route index element={<Navigate to="/dashboard/showData" />} />
        <Route path='addBook' element={<AddBook />} />
        <Route path='showData' element={<ShowData />} />
        <Route path='addCategory' element={<AddCategory />} />
        <Route path='editBook/:bookid' element={<EditBook />} />
      </Route>
      <Route element={<Login></Login>} path='/login'></Route>
      <Route element={<SignUp></SignUp>} path='/signUp'></Route>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
