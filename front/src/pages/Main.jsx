import Cookies from "js-cookie";
import React, { useEffect } from "react";

function Main() {
  var myCookieValue = null;
  useEffect(() => {
    myCookieValue = Cookies.get("authToken"); // 'myValue'
    if (myCookieValue) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  });
  return <div className="w-full text-center">wait few minutes</div>;
}

export default Main;
