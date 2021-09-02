// libraries
import React from "react";
import { Button, Modal } from "react-bootstrap";
import ReactStars from "react-stars";

// styles
import "./ReactModal.css";

export default function ReactModal({
  handleClose,
  textChanged,
  ratingChanged,
  handleCreate,
  rating,
  show,
}) {
  return (
    <>
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
