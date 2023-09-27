import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "./CartItem";
import { Product } from "../Interfaces";
import { emptyCart } from "../Slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  // State to keep track of the total price of items in the cart.
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();

  // Get the cart items from the Redux store.
  const cart: Product[] = useSelector((state: RootState) => state.cart.cart);

    // Navigation hook for routing
    const nav = useNavigate();

    // Select user from the Redux store
    const { user } = useSelector((state: RootState) => state.user);
  
    // Redirect to login page if user is not logged in
    useEffect(() => {
      if (!user?.username) {
        nav("/");
      }
    }, [user, nav])

  const trashIconURL =
    "https://cdn-icons-png.flaticon.com/512/3405/3405244.png";

  // Calculate the total price whenever the cart items change.
  useEffect(() => {
    setTotal(
      cart.reduce((accumulator: number, item) => {
        return accumulator + item.price;
      }, 0)
    );
  }, [cart]);

  // Prevent wheel events from propagating to parent elements.
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Function to remove all products.
  const dropCart = () => {
    dispatch(emptyCart());
  };

  // Render the component
  return (
    <div className="cart-container">
      <div className="nav-bar__mobile nav-bar" id="cart-back">
        <Link to={'/home'} className="nav-bar__links">{"<- Paul Store"}</Link>
      </div>
      {/* Cart header */}
      <div className="cart-container__head">
        <button
          className="cart-item__remove-btn"
          style={{ backgroundImage: `url(${trashIconURL})` }}
          id="trash"
          onClick={dropCart}
        ></button>
        <div className="cart-container__head-text">Cart</div>
      </div>

      {/* Container for displaying cart items */}
      <div className="cart-items-container" onWheel={handleWheel}>
        {cart.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              count={item.count}
            />
          );
        })}
      </div>

      {/* Display total price and checkout button */}
      <div className="cart__total-container">
        <div>Total: ${parseFloat(total.toFixed(2))}</div>
        <button onClick={() => alert("Dummy btn")}>Checkout</button>
      </div>
    </div>
  );
}
