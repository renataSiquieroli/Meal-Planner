import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-wrap">
          <ul className="icons">
            <li>
              <Link to={"https://www.whatsapp.com/"}>
                <i className="fa-brands fa-whatsapp"></i>
              </Link>
            </li>
            <li>
              <Link to={"https://www.linkedin.com/"}>
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </li>
            <li>
              <Link to={"https://www.facebook.com/"}>
                <i className="fa-brands fa-facebook "></i>
              </Link>
            </li>
            <li>
              <Link to={"https://www.instagram.com/"}>
                <i className="fa-brands fa-instagram   "></i>
              </Link>
            </li>
          </ul>
          <ul className="menu">
            <li>
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/">About Us</Link>
            </li>
            <li>
              {" "}
              <Link to="/all-recipes">Meals</Link>
            </li>
            <li>
              {" "}
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-copyright">
          <p>Copyright @ 2023 All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
