import React from 'react'
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components'

interface IProps {
  text?: string
}

const Overlay = styled.div.attrs({ className: "overlay" })`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  overflow-x: hidden;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
    top: 50%; /* 25% from the top */
    width: 100%; /* 100% width */
    text-align: center; /* Centered text/links */
  }
`;

const Loadscreen = (props: IProps) => {
  return (
    <Overlay>
      <div className="overlay-content ">
        <Spinner animation="border" variant="light" />
        {props.text && <div className="display-6 text-light">{props.text}</div>}
      </div>
    </Overlay>
  );
}

export default Loadscreen
