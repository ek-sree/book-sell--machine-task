const CustomButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'blue' | 'red' | 'gray';
   }> = ({ onClick, children, variant = 'blue' }) => {
    const buttonStyles = {
      blue: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
      red: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
      gray: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
    };
   
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 ${buttonStyles[variant]}`}
      >
        {children}
      </button>
    );
   };
   
   export default CustomButton;