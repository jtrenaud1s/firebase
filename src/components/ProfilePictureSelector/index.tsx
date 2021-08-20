import React from "react";
import { Form } from "react-bootstrap";
import { Firestore, profilePicturesRef } from "../../config/firebase";
import { IUser } from "../../interfaces/IUser";

interface IProps {
  user: IUser;
}

const ProfilePictureSelector: React.FC<IProps> = (props) => {
  return (
    <Form.Control
      type="file"
      className="form-control"
      onChange={(e) => {
        console.log("Picture selected")
        const target = e.target as HTMLInputElement;
        if (target.files === null) {
          return;
        }

        const file = target.files[0];
        const tokens = file.name.split(".");
        const ext = tokens[tokens.length - 1];
        const filename = `${props.user.uid}.${ext}`;
        const ref = profilePicturesRef.child(filename);
        const uploadTask = ref.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            ref.getDownloadURL().then((url) => {
              Firestore.doc(`users/${props.user.uid}`).set(
                {
                  profilePicture: url,
                },
                { merge: true }
              );
            });
          }
        );
      }}
    />
  );
};

export default ProfilePictureSelector;
