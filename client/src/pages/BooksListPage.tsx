import { useState } from "react";
import BooksList from "../components/BooksList"
import Navbar from "../components/Navbar"

const BooksListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
        <Navbar onSearch={setSearchQuery}/>
        <BooksList searchQuery={searchQuery}/>
    </div>
  )
}

export default BooksListPage