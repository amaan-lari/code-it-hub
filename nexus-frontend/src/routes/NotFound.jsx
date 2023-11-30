import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white">
      <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">Oops! The page you are looking for might be in another galaxy.</p>
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-8" />
      <Link to="/" className="text-teal-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
