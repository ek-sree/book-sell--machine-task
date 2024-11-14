import React, { useEffect, useState } from "react";
import AddBook from "./AddBook";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { logout } from "../redux/slice/userSlice"; 
import { IBook } from "../interface/IBook";
import { bookAxios } from "../constraints/axios/bookAxios";
import { bookEndpoints } from "../constraints/endpoints/booksEndpoints";
import { Trash2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import CustomButton from "./CustomButton";

const BooksList = ({ searchQuery }: { searchQuery: string }) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state: RootState) => state.User?.isAuthenticated);
  const userId = useSelector((store: RootState) => store.User.authdata?._id);
  const userName = useSelector((store: RootState)=>store.User.authdata?.name)

  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMoreBooks(true);
  }, [searchQuery]);

  useEffect(() => {
    getBooks();
  }, [page, searchQuery]);

  async function getBooks() {
    try {
      setLoading(true);
      const response = await bookAxios.get(bookEndpoints.getBooks, {
        params: {
          page: page,
          searchQuery: searchQuery,
        },
      });

      if (response.status === 200) {
        if (response.data.data.length === 0) {
          setHasMoreBooks(false);
        } else {
          setBooks((prevBooks) => [...prevBooks, ...response.data.data]);
        }
      }
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      setLoading(false);
    }
  }

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSuccess = (newBook: IBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await bookAxios.delete(`${bookEndpoints.deleteBook}?id=${id}`);
      if (response.status === 200) {
        setBooks((prevBook) => prevBook.filter((book) => book._id !== id));
      }
    } catch (error) {
      console.log("Error while deleting book", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 50 && hasMoreBooks && !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMoreBooks, loading]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="flex justify-between mb-6">
        {isAuthenticated ? (
          <>
            <CustomButton onClick={handleModal}>Add Book</CustomButton>
            <CustomButton onClick={handleLogout} variant="red">Logout</CustomButton>
          </>
        ) : (
          <Link to="/login">
            <CustomButton>Login</CustomButton>
          </Link>
        )}
      </div>

      {!isAuthenticated ? (
        <div className="flex justify-center items-center py-5 underline">
          <h1 className="text-xl font-semibold">Login to Add Books</h1>
        </div>
      ) : (
        <div className="flex justify-center items-center py-5">
          <h1 className="text-xl font-semibold">Hey {userName}!</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && page === 1 ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full" />
          ))
        ) : books.length === 0 ? (
          <div className="font-semibold text-2xl">No books found.</div>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold text-gray-800 truncate">
                  {book.title}
                </h2>
                {isAuthenticated && userId === book.userId && (
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    onClick={() => handleDelete(book._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <p className="text-gray-600 mt-2">by {book.author}</p>
              <p className="text-gray-700 mt-4">{book.description}</p>
            </div>
          ))
        )}
      </div>

      {isModalOpen && <AddBook isOpen={isModalOpen} onClose={closeModal} onSuccess={handleSuccess} />}
    </div>
  );
};

export default BooksList;