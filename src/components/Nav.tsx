import { Link } from "react-router-dom";
import Categories from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../Slices/cartSlice";
import { setUser } from "../Slices/userSlice";

// Define the prop types for the Nav component
interface NavProps {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function Nav({ setCurrentCategory }: NavProps) {
  const dispatch = useDispatch();

  // Log out function, empties the cart and sets user to null
  const logout = () => {
    dispatch(emptyCart());
    dispatch(setUser(null));
  }

  
  // Render the component
  return (
    <div className="nav-bar">
      {/* Link to the home page with onClick handler to set the category to "All" */}
      <Link
        to="/home"
        className="nav-bar__links"
        onClick={() => setCurrentCategory("All")}
        >
        Paul Shop
      </Link>
      {/* Categories component with prop to set the current category */}
      <Categories setCurrentCategory={setCurrentCategory} />
      {/* Link to the cart page visible on mobile */}
        <Link
          to="/cart"
          className="nav-bar__links nav-bar__mobile"
        >
          Cart
        </Link>
      {/* Logout button */}
      <button className="logout"onClick={logout}>Logout</button>
    </div>
  );
}
