import { forwardRef, Ref, useState } from "react";
import { Product } from "../Interfaces";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/cartSlice";

// Define a ProductItem component using forwardRef to allow passing a ref to the parent component.
const ProductItem = forwardRef((props: Product, ref: Ref<HTMLDivElement>) => {
  // State to control the visibility of the product description.
  const [showDescription, setShowDescription] = useState(false);

  // Redux dispatch function to add an item to the cart.
  const dispatch = useDispatch();

  // Function to add the current product to the cart.
  const addItemToCart = () => {
    dispatch(addToCart({ ...props }));
  };

  // Function to toggle the visibility of the product description.
  const handleDescriptionVisibility = () => {
    setShowDescription(!showDescription);
  };

  // Render the component
  return (
    <div className="product" ref={ref}>
      {/* Display the title of the product */}
      <div className="product__title">{props.title}</div>
      {/* Display the price of the product */}
      <div className="product__price">{props.price}$</div>
      {/* Display the rating of the product */}
      <div className="product__rating">{props.rating?.rate}/5</div>
      {/* Display the image of the product */}
      <img src={props.image} alt={props.title} className="product__img" />
      {/* Toggle button to show/hide the product description */}
      {showDescription ? (
        <div className="product__description-container">
          {/* Display the product description */}
          <div className="product__description">{props.description}</div>
          {/* Button to hide the product description */}
          <button
            className="product__description-btn"
            onClick={handleDescriptionVisibility}
          >
            Hide
          </button>
        </div>
      ) : (
        // Button to show the product description
        <button
          className="product__description-btn"
          onClick={handleDescriptionVisibility}
        >
          Show description
        </button>
      )}
      {/* Button to add the product to the cart */}
      <button className="product__add-btn" onClick={addItemToCart}>
        Add to cart
      </button>
    </div>
  );
});

export default ProductItem;
