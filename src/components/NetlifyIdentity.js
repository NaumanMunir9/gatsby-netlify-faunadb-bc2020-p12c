// libraries
import React from "react";
import { Button } from "react-bootstrap";

// styles
import "./NetlifyIdentity.css";

export default function NetlifyIdentity({
  setDialog,
  handleShow,
  name,
  identity,
  isLoggedIn,
}) {
  return (
    <>
      {identity && identity.isLoggedIn ? (
        <div className="auth-btn-grp">
          <Button variant="outline-primary" onClick={handleShow}>
            Create Testimonial
          </Button>

          <Button
            variant="outline-primary"
            className="login-btn"
            onClick={() => setDialog(true)}
          >
            {isLoggedIn ? `Hello ${name}, Log out here!` : "Log In"}
          </Button>
        </div>
      ) : (
        <div className="auth-btn-grp">
          <Button
            variant="outline-primary"
            className="login-btn"
            onClick={() => setDialog(true)}
          >
            {isLoggedIn ? `Hello ${name}, Log out here!` : "Log In"}
          </Button>
        </div>
      )}
    </>
  );
}
