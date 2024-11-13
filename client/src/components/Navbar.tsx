import logo from "../../public/logo/book-logo.png";

const Navbar = () => {
  return (
    <div className="bg-slate-800 text-white w-full py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-16" />
        </div>

        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 rounded-full bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18l6-6m0 0a8 8 0 1 0-6 6 8 8 0 0 0 6-6z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
