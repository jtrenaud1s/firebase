import React from "react";
import { Card } from "react-bootstrap";

interface IProps {
  title?: String;
}

const Box: React.FC<IProps> = (props) => {
  return (
      <Card className="align-items-center p-4 w-100">
        {props.title && (
          <>
            <h2 className="text-center">{props.title}</h2>
            <hr className="w-25" />
          </>
        )}
        {props.children}
      </Card>
  );
};

export default Box;
