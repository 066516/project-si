import React, { useEffect, useState } from "react";
import img from "../assets/agg.png";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }
    setIsLoading(true);
    // API call to backend using Axios
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Handle successful login
      Cookies.set("authToken", response.data.token, { expires: 7, path: "" });

      // Store token or session data as needed
      // Redirect to dashboard or another page
      return navigate("/dashboard");
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        setErrorMessage(error.response.data.message || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setErrorMessage("something is wrong");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setErrorMessage("Error occurred during login request");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  var myCookieValue = null;
  useEffect(() => {
    myCookieValue = Cookies.get("authToken"); // 'myValue'
    if (myCookieValue) {
      return navigate("/dashboard");
    }
  });
  const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
  return (
    <>
      {!myCookieValue && (
        <div
          className="w-screen h-screen bg-no-repeat bg-custom-gradient bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center  ">
            <div className="bg-white/80 shadow-lg  p-5 rounded-xl  text-whit w-[90%] md:w-1/2 capitalize">
              <div className="font-semibold text-lg"> Login in </div>
              <div className="flex flex-col">
                <div className="flex flex-col mt-5">
                  <h1 className="font-medium mb-2">Email or Username</h1>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="border-blue2 focus:outline-none p-2 border rounded-lg"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <h1 className="font-medium">Password:</h1>
                  <div className="flex items-center border-blue2 border rounded-lg">
                    <input
                      type={isPasswordShown ? "text" : "password"}
                      value={password}
                      placeholder="Enter your password"
                      onChange={handlePasswordChange}
                      required
                      className="flex-1 focus:outline-none p-2"
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="text-lg text-gray-600 p-2"
                    >
                      {isPasswordShown ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
              <div className="my-2 text-blue2 cursor-pointer font-medium  hover:underline">
                {" "}
                forget password{" "}
              </div>
              <div className="w-full flex justify-center">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    className="bg-blue2 text-white py-3 px-2 my-6 text-center w-full rounded-xl font-semibold cursor-pointer hover:bg-blue2/80"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                )}
              </div>

              <div className="w-full flex items-center h-10 bg-blue-500  p-[1px] mb-8 mt-4">
                <h1 className="bg-white p-1 h-full flex items-center w-10 justify-center">
                  <FaGoogle fontSize="22px" color="blue" />
                </h1>
                <h1 className=" text-white w-full h-full flex text-center justify-center items-center ">
                  login with google
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
