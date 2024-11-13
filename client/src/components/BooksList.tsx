import { useState } from "react";
import AddBook from "./AddBook";

const BooksList = () => {
  // Sample data for books
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel set in the Roaring Twenties, chronicling Jay Gatsby's love for Daisy Buchanan."
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel set in a totalitarian society controlled by Big Brother."
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A story about racial injustice in the Deep South, seen through the eyes of Scout Finch."
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess=()=>{
    
  }

  return (
    <div className="bg-gray-100 min-h-screen py-4 px-6">
      {/* Add Book Button */}
      <div className="flex justify-start mb-4">
        <button
          onClick={handleModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
            <p className="text-gray-600 mt-2">by {book.author}</p>
            <p className="text-gray-700 mt-4">{book.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && <AddBook isOpen={isModalOpen} onClose={closeModal} onSuccess={handleSuccess} />}
    </div>
  );
};

export default BooksList;
