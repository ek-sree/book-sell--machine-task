import { Route, Routes } from "react-router-dom"
import BooksListPage from "../pages/BooksListPage"
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage"
import OtpPage from "../pages/OtpPage"

const BookRouter = () => {
  return (
    <Routes>
    <Route path="/" element={<BooksListPage/>} />
    <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/otp" element={<OtpPage/>}/>
  </Routes>
  )
}

export default BookRouter