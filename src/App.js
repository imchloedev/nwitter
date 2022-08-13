import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Router from "./components/Router";
import { authService } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // console.log(authService.currentUser);

  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  // 첫 출력값 null
  // 2sec loading -> currentUser 출력값 생성

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing...."}

      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
