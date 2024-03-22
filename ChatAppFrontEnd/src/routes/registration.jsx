import { Form, redirect } from "react-router-dom";
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
    alert("User is created, returning to mainpage");
    return redirect("/");
  } catch (error) {
    alert("Error: " + error.response.data);
    return { error: "something happened" };
  }
}

export default function Registration() {
  return (
    <div>
      <Form method="post">
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}
