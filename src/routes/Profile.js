import { signOut } from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import { dbService } from "../fbase";

export default function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOut = () => {
    signOut(authService);
    navigate("/");
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOut}>Log Out</button>
    </>
  );
}
