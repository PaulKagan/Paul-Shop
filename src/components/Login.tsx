import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Slices/userSlice";
import { RootState } from "../store";
import { User } from "../Interfaces";

export default function Login() {
  // Component State
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password"); // Toggles password visibility
  const [wrongInput, setWrongInput] = useState(false); // Indicates wrong login input

  // Navigation hook for redirection
  const nav = useNavigate();
  // Obtain the Redux 'dispatch' function to send actions to the store
  const dispatch = useDispatch();

  // Select users from the Redux store
  const users: User[] = useSelector((state: RootState) => state.users.users);


  // Input Change Handlers

  // Handles changes in the username input field
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  // Handles changes in the password input field
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Toggle password visibility
  const handleHideOrShowPassword = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };


  // Login Function

  // Attempts to log in the user
  const login = () => {
    // Find the user with the provided username and password
    const user: User | undefined = users.find(
      (user: User) => user.username === username && user.password === password
    );

    // If a matching user is found, set the user in Redux and navigate to the home page
    if (user) {
      dispatch(setUser(user));
      nav("/home");
    } else {
      // If no matching user is found, show a wrong input message
      setWrongInput(true);
      setTimeout(() => {
        setWrongInput(false);
      }, 3000);
    }
  };

  // Render the component
  return (
    <div id="login" className="login flex-col">
      <h1 className="store-header">Paul Store</h1>
      <input
        type="text"
        className="login__input"
        placeholder="Enter Username"
        onChange={handleUsername}
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
      <button className="login__btn" onClick={login}>
        Login
      </button>
      {wrongInput ? (
        <div className="bad-input">User doesn't exist.</div>
      ) : (
        <div className="bad-input or"> Or </div>
      )}
      <button className="login__register-btn" onClick={() => nav("/register")}>
        Create new account
      </button>
    </div>
  );
}
