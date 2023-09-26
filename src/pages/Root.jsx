import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      {" "}
      <Navigation />
      <div className="container">
        <article>
          <Outlet />
        </article>
      </div>
      <Footer />
    </>
  );
};

export default Root;
