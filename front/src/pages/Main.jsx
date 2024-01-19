import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  var myCookieValue = null;
  const navigate = useNavigate();

  useEffect(() => {
    myCookieValue = Cookies.get("authToken"); // 'myValue'
    if (myCookieValue) {
      return navigate("/dashboard");
    } else {
      return navigate("/login");
    }
  });
  return <div className="w-full text-center">wait few minutes</div>;
}

export default Main;
