import { Outlet, Link } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";

export default function Root() {
  let { username } = useRouteLoaderData("root");
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/register"> Register</Link>
          </li>
          <li>
            <Link to="/login"> Login</Link>
          </li>
          {username ? (
            <li>
              <Link to="/logout"> Logout</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      {username ? (
        <div> {username} is logged in</div>
      ) : (
        <div>You are not logged in</div>
      )}
      <div className="red">im a red</div>
      <Outlet />
      <div className="red">im a red</div>
    </>
  );
}
