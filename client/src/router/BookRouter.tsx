import { Route, Routes } from "react-router-dom"
import BooksListPage from "../pages/BooksListPage"
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage"

const BookRouter = () => {
  return (
    <Routes>
    <Route path="/" element={<BooksListPage/>} />
    <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
  </Routes>
  )
}

export default BookRouter