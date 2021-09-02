// libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

import ReactStars from "react-stars";

import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

// components
import NetlifyIdentity from "../components/NetlifyIdentity";
import ReactCarousel from "../components/ReactCarousel";

// styles
import "./index.css";

export default function HomePage() {
  const [status, setStatus] = useState("loading...");
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    if (status !== "loading...") return;

    axios("/.netlify/functions/get-testimonials").then((result) => {
      if (result.status !== 200) {
        console.error(`Error loading testimonials`);
        console.error(result);
        return;
      }

      setTestimonials(result.data.messages);
      setStatus("Data is loaded!");
    });
  }, [status]);

  // get avatar
  const getAvatar = () => {
    const random = Math.floor(
      Math.random() * (testimonials.length - 0 + 1) + 0
    );
    const imgUrl = `https://avatars.dicebear.com/api/human/${random}.svg?mood[]=happy`;

    return imgUrl;
  };

  // netlify Identity
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  const name =
    (identity.user && identity.user.user_metadata.full_name) || "Untitled";

  const isLoggedIn = identity && identity.isLoggedIn;

  // create Testimonial
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(4);
  const [text, setText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const textChanged = (evt) => {
    const val = evt.target.value;
    setText(val);
  };

  const handleCreate = async (event) => {
    if (text === "") return;

    await axios.post("/.netlify/functions/create-testimonial", {
      text,
      rating,
    });

    const newList = testimonials.concat({
      text,
      rating,
    });

    setTestimonials(newList);
    setShow(false);
  };

  return (
    <>
      <NetlifyIdentity
        setDialog={setDialog}
        handleShow={handleShow}
        name={name}
        identity={identity}
        isLoggedIn={isLoggedIn}
      />

      <ReactCarousel testimonials={testimonials} getAvatar={getAvatar} />

      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        className="create-testimonial"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Testimonial</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="create-form">
            <textarea
              onChange={(evt) => textChanged(evt)}
              placeholder="Enter your message here"
            />

            <br />

            <span>Rating:</span>
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              color2={"ffd700"}
              half={false}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>

          <Button variant="primary" onClick={(evt) => handleCreate(evt)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
