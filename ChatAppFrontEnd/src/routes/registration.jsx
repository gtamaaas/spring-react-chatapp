import { Form, redirect, Link } from "react-router-dom";
import axios from "axios";

export async function action({ request }) {
  const requestData = await request.formData();

  const registrationCredentials = {
    username: requestData.get("username"),
    password: requestData.get("password"),
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/register",
      registrationCredentials
    );
    alert("User is created, returning to login page");
    return redirect("/login");
  } catch (error) {
    if (error.code === "ERR_NETWORK")
      alert("Server is down, please try again later!");
    else alert("Error: " + error.response.data);
    return error;
  }
}

export default function Registration() {
  return (
    <div className="wrapper">
      <Form method="post">
        <div className="main">
          <h1>Register</h1>
          <div className="row">
            <label for="text">Username</label>
            <input type="text" name="username" />
          </div>
          <div className="row">
            <label for="text">Password</label>
            <input type="password" name="password" />
          </div>
          <button> Register </button>
          <Link to="/login"> Already have an user?</Link>
        </div>
      </Form>
    </div>
  );
}
