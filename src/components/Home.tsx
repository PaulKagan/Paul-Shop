import { useState, useEffect, useRef, useCallback } from "react";
import axios, { Canceler } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import Nav from "./Nav";
import Cart from "./Cart";

export default function Home() {
  // State to manage products and product counter
  const [products, setProducts] = useState<Product[]>([]);
  const [productCounter, setProductCounter] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>("");

  // Navigation hook for routing
  const nav = useNavigate();

  // Select user from the Redux store
  const { user } = useSelector((state: RootState) => state.user);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!user?.username) {
      nav("/");
    }
  }, [user, nav]);

  // Intersection observer for lazy loading products.
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (element: HTMLDivElement) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setProductCounter((prevProductCounter) => prevProductCounter + 1);
        }
      });

      if (element) observer.current.observe(element);
    },
    [products]
  );

  // Fetching (more) products from the fake store API, or by category.
  useEffect(() => {
    let cancel: Canceler | undefined;
    let url: string;
    if (currentCategory === 'All') {
      url = `https://fakestoreapi.com/products?limit=${5 + 2 * productCounter}`; // All products
    } else {
      url = `https://fakestoreapi.com/products/category/${currentCategory}`; // By category
    }

    axios({
      method: "GET",
      url: url,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (products.length === res.data.length) {
          return;
        }
        setProducts(res.data);
        setLoading(false); // Set loading to false when data is fetched successfully
      })
      .catch((error) => {
          // Request was canceled, no need to handle it.
        if (axios.isCancel(error)) return;

        // Handle other errors here
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching data.");
        setLoading(false); // Set loading to false in case of an error
      });

    return () => {
      if (cancel) {
        cancel();
      }
    };
  }, [productCounter, currentCategory]);

  // Filter products based on filter text
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filterText.toLowerCase())
  );

  // Render the component
  return (
    <div className="home">
      {/* Navigation component */}
      <Nav setCurrentCategory={setCurrentCategory} />
      <div className="home__jumbotron">
        {/* Shopping cart component */}
        <div className="home__jumbotron-cart">
          <Cart />
        </div>
        {/* Filter input */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by title"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="products-container">
          {loading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <h1>{errorMessage}</h1>
          ) : filteredProducts.map((product, index) => {
            // Check if it's the last product and assigns the ref for lazy loading
            if (filteredProducts.length === index + 1) {
              return (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  image={product.image}
                  rating={product.rating}
                  ref={lastProductElementRef}
                />
              );
            }
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
                rating={product.rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
