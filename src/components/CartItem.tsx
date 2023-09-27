import { Product } from "../Interfaces";
import { addToCart, removeCopy, removeFromCart } from "../Slices/cartSlice";
import { useDispatch } from "react-redux";

export default function CartItem(props: Product) {
  const dispatch = useDispatch();

  // Function to remove the item from the cart.
  const remove = () => {
    dispatch(removeFromCart({ ...props }));
  };

  // Function to reduce the number of copies of the item in the cart.
  const reduceCopies = () => {
    // If count drops to 0 - remove item from cart.
    if (props.count === 1) {
      remove();
    } else {
      dispatch(removeCopy({ ...props }));
    }
  };

  // Function to increment the number of copies of the item in the cart.
  const incrementCopies = () => {
    dispatch(addToCart({ ...props }));
  };
  

  // Render the component
  return (
    <div className="cart-item">
      {/* Button to remove the item */}
      <button
        className="cart-item__remove-btn"
        style={{ backgroundImage: `url(${props.image})` }}
        onClick={remove}
      >
        X
      </button>
      {/* Display the title of the item */}
      <div className="cart-item__title">{props.title}</div>
      {/* Container for displaying price and count */}
      <div className="cart-item__price-and-count-container">
        {/* Display the price of the item */}
        <div className="cart-item__price">
          {parseFloat(props.price.toFixed(2))}$
        </div>
        {/* Container for increasing/decreasing the count of the item */}
        <div className="cart-item__count-container">
          {/* Button to reduce the count */}
          <button className="cart-item__count-btn" onClick={reduceCopies}>-</button>
          {/* Display the count of the item */}
          <div className="cart-item__count">{props.count}</div>
          {/* Button to increment the count */}
          <button className="cart-item__count-btn" onClick={incrementCopies}>+</button>
        </div>
      </div>
    </div>
  );
}
