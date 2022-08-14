import { Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

export default function Router({ isLoggedIn, userObj }) {
  return (
    <>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <Route>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
}
