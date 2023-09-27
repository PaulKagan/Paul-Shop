import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Slices/usersSlice";
import { validate } from "email-validator";
import { RootState } from "../store";
import { User } from "../Interfaces";

export default function Register() {
    // Component State
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password"); // Toggles password visibility
    const [confirmPasswordType, setConfirmPasswordType] = useState("password"); // Toggles confirm password visibility
    const [wrongInputText, setWrongInputText] = useState(" "); // Displays error messages
  
    // Select users from the Redux store
    const users: User[] = useSelector((state: RootState) => state.users.users);
  
    // Navigation hook for redirection
    const nav = useNavigate();
    // Obtain the Redux 'dispatch' function to send actions to the store
    const dispatch = useDispatch();
  

    // Input Change Handlers
  
    // Handles changes in the username input field
    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 10) {
        e.target.value = username;
        return;
      }
      setUserName(e.target.value);
    };
  
    // Handles changes in the email input field
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    // Handles changes in the password input field
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    // Handles changes in the confirm password input field
    const handleCinformPassword = (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
    };
  
    // Toggle password visibility
    const handleHideOrShowPassword = () => {
      if (passwordType === "text") {
        setPasswordType("password");
      } else {
        setPasswordType("text");
      }
    };
  
    // Toggle confirm password visibility
    const hideOrShowConfirmPassword = () => {
      if (confirmPasswordType === "text") {
        setConfirmPasswordType("password");
      } else {
        setConfirmPasswordType("text");
      }
    };
  

    // Register Function
  
    // Validates inputs, checks if email & username are available, and registers user.
    const register = () => {
      // Clear any previous error messages
      setWrongInputText(" ");
  
      // Input validation and error handling
  
      // Check if the username length is less than 4 characters
      if (username.length < 4) {
        setWrongInputText("Username must be at least 4 characters long!");
        setTimeout(() => {
          setWrongInputText(" ");
        }, 3000);
        return;
      }
  
      // Check if the entered email is valid using email-validator library
      else if (!validate(email)) {
        setWrongInputText("Please enter a correct email!");
        setTimeout(() => {
          setWrongInputText(" ");
        }, 3000);
        return;
      }
  
      // Check if the entered password matches the confirm password
      else if (password !== confirmPassword) {
        setWrongInputText("Passwords don't match");
        setTimeout(() => {
          setWrongInputText(" ");
        }, 3000);
        return;
      }
  
      // Check if the username or email is already taken
      const user = users.find(
        (user: User) => user.email === email || user.username === username
      );
      if (user) {
        setWrongInputText("Username or email already taken");
        setTimeout(() => {
          setWrongInputText(" ");
        }, 3000);
        return;
      }
  
      // Dispatch the addUser action to add the user to the Redux store
      dispatch(addUser({ username, email, password }));
  
      // Redirect to the home page after successful registration
      nav("/");
    };

  // Render the component
  return (
    <div id="register" className="register flex-col">
      <h1 className="store-header">Paul Store</h1>
      <input
        type="text"
        className="register__input"
        placeholder="Enter Username"
        onChange={handleUsername}
      />
      <input
        type="email"
        className="register__input"
        placeholder="Enter Email"
        onChange={handleEmail}
      />
      <div className="password-input">
        <input
          type={`${passwordType}`}
          className="password-input__input"
          placeholder="Enter Password"
          onChange={handlePassword}
        />
        <button
          className="password-input__toggle"
          onMouseDown={handleHideOrShowPassword}
          onMouseUp={handleHideOrShowPassword}
        >
          <img
            className="password-input__see-icon"
            src="https://cdn-icons-png.flaticon.com/512/2767/2767194.png"
            alt="see password"
          />
        </button>
      </div>
      <div className="password-input">
        <input
          type={`${confirmPasswordType}`}
          className="password-input__input"
          placeholder="Confirm Password"
          onChange={handleCinformPassword}
        />
        <button
          className="password-input__toggle"
          onMouseDown={hideOrShowConfirmPassword}
          onMouseUp={hideOrShowConfirmPassword}
        >
          <img
            className="password-input__see-icon"
            src="https://cdn-icons-png.flaticon.com/512/2767/2767194.png"
            alt="see password"
          />
        </button>
      </div>
      <div className="bad-input">{wrongInputText}</div>
      <button className="register__btn" onClick={register}>
        Register
      </button>
    </div>
  );
}
