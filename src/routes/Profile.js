import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";

export default function Profile({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const navigate = useNavigate();
  const onLogOut = () => {
    signOut(authService);
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={
            newDisplayName === null
              ? userObj.email.split("@")[0]
              : newDisplayName
          }
        />
        <input type="submit" value="Update Profile" />
      </form>
      <span>Profile</span>
      <button onClick={onLogOut}>Log Out</button>
    </>
  );
}
