import type { LoginPayload } from "@utils/types";
import { useState } from "react";
import { withRedirectAuthenticated } from "@components/RedirectAuthenticated";
import { useAuthContext } from "@context/AuthContext";

function Login() {
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    username: "johndoe",
    password: "jsonplaceholder.org"
  });
  const { login } = useAuthContext();

  const handleInput = (key: keyof LoginPayload, value: string) => {
    setLoginPayload({ ...loginPayload, [key]: value });
  };

  return (
    <>
      <label>Username</label>
      <input
        defaultValue={loginPayload.username}
        type="text"
        onChange={(event) => {
          handleInput("username", event?.target.value);
        }}
      />

      <label>Password</label>
      <input
        defaultValue={loginPayload.password}
        type="password"
        onChange={(event) => {
          handleInput("password", event?.target.value);
        }}
      />

      <button
        onClick={() => {
          login(loginPayload);
        }}
      >
        Login
      </button>
    </>
  );
}

export default withRedirectAuthenticated(Login, { redirectUrl: "/" });
