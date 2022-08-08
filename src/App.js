import React from "react";
import { useState } from "react";
import Router from "./components/Router";
import firebase from "./fbase";
import { authService } from "./fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  console.log(authService.currentUser);

  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
