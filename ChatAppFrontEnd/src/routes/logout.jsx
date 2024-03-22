import axios from "axios";
import localforage from "localforage";
import { redirect } from "react-router-dom";

export async function loader() {
  try {
    let username = await localforage.getItem("username");
    const response = await axios.post(
      "http://localhost:8080/logout",
      username,
      { withCredentials: true }
    );
    await localforage.setItem("username", "");
    return redirect("/");
  } catch (error) {
    throw error;
  }
}
