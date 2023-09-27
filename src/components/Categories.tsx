import axios from 'axios';
import { useEffect, useState } from 'react';

// Define the prop types for the Categories component
interface CategoriesProps {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function Categories({ setCurrentCategory }: CategoriesProps) {
  // Component states
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Fetch categories from the API on component
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/categories`)
    .then(res => {
      setCategories(res.data);
    })
    .catch(error => {
      // In case of error show dummy btn indicating there is an error
        setCategories(["Error."])
      })
  }, [])

  // Display the categories on hover(mouse enter)
  const displayCategories = () => {
    setShowCategories(true);
  }

  // Hide categories on hover(mouse leave)
  const hideCategories = () => {
    setShowCategories(false);
  }
  // Toggle categories on hover(on click)
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  }

  // Set the current category when a category is clicked, displays in Home.tsx
  const setCategory = (category: string) => {
    setCurrentCategory(category);
  }

  // Render the component
  return (
    <div className='category-container' onMouseEnter={displayCategories} onMouseLeave={hideCategories}>
      <button className='category__btn' onClick={toggleCategories}>
        Categories
      </button>
      <div className={`category-dropdown ${showCategories ? ' visible' : ''}`}>
        {categories.map((category) => {
          if (category === "Error.") {
            // In case of error show dummy btn indicating there is an error.
            return (<button
              key={category}
              className='category__dropdown-btn category__btn'
              >
              {category}
            </button>)
          }
          return (
            <button
              key={category}
              className='category__dropdown-btn category__btn'
              onClick={() => setCategory(category)}
              >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
