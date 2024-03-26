import { Form, redirect, Link } from "react-router-dom";
import { Auth } from "../auth";
import localforage from "localforage";

export async function action({ request }) {
  const requestData = await request.formData();

  const loginCredentials = {
    username: requestData.get("username"),
    password: requestData.get("password"),
  };

  try {
    await Auth.login(loginCredentials);
    alert("Succesfull login, redirecting to mainpage");
    localforage.setItem("username", loginCredentials.username);
    return redirect("/");
  } catch (error) {
    if (error.code === "ERR_NETWORK")
      alert("Server is down. Please try again later!");
    else alert("User was not found!");
    return error;
  }
}

export default function Login() {
  return (
    <div className="wrapper">
      <Form method="post">
        <div className="main">
          <h1>Login</h1>
          <div className="row">
            <label for="text">Username</label>
            <input type="text" name="username" />
          </div>
          <div className="row">
            <label for="text">Password</label>
            <input type="password" name="password" />
          </div>
          <button> Login </button>
          <Link to="/register"> Create new user</Link>
        </div>
      </Form>
    </div>
  );
}
