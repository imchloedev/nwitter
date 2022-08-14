import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";

export default function Profile() {
  const navigate = useNavigate();
  const onLogOut = () => {
    signOut(authService);
    navigate("/");
  };

  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOut}>Log Out</button>
    </>
  );
}
