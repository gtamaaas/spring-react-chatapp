import { Form, redirect } from "react-router-dom";
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
    alert("Error: " + error.response.data);
    return { error: "something happened" };
  }
}

export default function Login() {
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
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
