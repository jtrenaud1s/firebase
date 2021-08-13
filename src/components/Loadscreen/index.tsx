import React from 'react'
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components'

const Overlay = styled.div.attrs({ className: "overlay" })`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  overflow-x: hidden;
  transition: 0.5s;

  .overlay-enter {
    opacity: 0;
  }
  .overlay-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .overlay-exit {
    opacity: 1;
  }
  .overlay-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }

  /* Position the content inside the overlay */
  .overlay-content {
    position: relative;
    top: 25%; /* 25% from the top */
    width: 100%; /* 100% width */
    text-align: center; /* Centered text/links */
    margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
  }
`;

const Loadscreen = () => {
  console.log("Loadscreen rendered")
  return (
    <Overlay>
      <div className="overlay-content">
        <Spinner animation="border" variant="light" />
      </div>
    </Overlay>
  );
}

export default Loadscreen
