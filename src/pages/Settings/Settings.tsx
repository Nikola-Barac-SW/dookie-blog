import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "@context/AuthContext";

function Settings() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>
        <Link to="/">Back</Link>

        <h4>Personal info</h4>

        <label htmlFor="">First Name</label>
        <p>{user?.firstname}</p>

        <label htmlFor="">Last Name</label>
        <p>{user?.lastname}</p>

        <label htmlFor="">Email</label>
        <p>{user?.email}</p>

        <label htmlFor="">Phone</label>
        <p>{user?.phone}</p>

        <h4>Login info</h4>

        <label htmlFor="">Username</label>
        <p>{user?.login.username}</p>

        <label htmlFor="">Password</label>
        <p>{user?.login.password}</p>

        <h4>Company info</h4>

        <label htmlFor="">Name</label>
        <p>{user?.company.name}</p>

        <label htmlFor="">Catch Phrase</label>
        <p>{user?.company.catchPhrase}</p>
      </div>
    </>
  );
}

export default Settings;
