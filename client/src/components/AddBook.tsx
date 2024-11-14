import { FC, useState } from "react";
import { IBook } from "../interface/IBook";
import { bookAxios } from "../constraints/axios/bookAxios";
import { bookEndpoints } from "../constraints/endpoints/booksEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;  
  onSuccess: (Product: IBook) => void;
}

const AddBook: FC<AddBookModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const userId = useSelector((state:RootState)=>state.User.authdata?._id)

  const validateForm = () => {
    let isValid = true;

    if (!title.trim() || title.length<=3) {
      setTitleError("Title must be 4 character long.");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (!author.trim() || author.length <=2) {
      setAuthorError("Author name must be 3 character long..");
      isValid = false;
    } else {
      setAuthorError(null);
    }

    if (!description.trim() || description.length <= 7) {
      setDescriptionError("Description must be 8 character long.");
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    return isValid;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
        const isValid = validateForm();
    
    if (isValid) {
      const newBook = { title, author, description };
      const response = await bookAxios.post(`${bookEndpoints.addBook}?userId=${userId}`,newBook)
      console.log("add data",response);
      
      if(response.status==201){
          onSuccess(response.data.data);
          onClose();
        }
    }
    } catch (error) {
        console.log("Error while sending data",error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[30rem] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {authorError && <p className="text-red-500 text-sm">{authorError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
