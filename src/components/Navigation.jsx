import React, { useContext } from "react";
import { AppContext } from "../context/Context";

const Navigation = () => {
  const { isAuth, signInWithGoogle, signOut } = useContext(AppContext);

  return (
    <nav
      className=""
      style={{
        padding: "0 1rem",
        boxShadow: "0 2px 7px rgba(0, 0, 0, 0.2)", // Add drop shadow
        zIndex: 1, // Ensure it's above other content
      }}
    >
      <ul>
        <li>
          <strong>React-Firebase-Blog</strong>
        </li>
      </ul>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        {isAuth ? (
          <li>
            <a href="/post">Create Post</a>
          </li>
        ) : (
          ""
        )}

        {isAuth ? (
          <li>
            <button onClick={signOut}>Sign Out</button>
          </li>
        ) : (
          <li>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
