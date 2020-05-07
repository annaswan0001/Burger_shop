import {
  CHILD_NAME,
  CHILD_SURNAME,
  CHILD_DOCUMENT_TYPE,
  CHILD_GENDER,
} from "./actionType";

export const childAction = (nameField, value) => {
  switch (nameField) {
    case "name":
      return {
        type: CHILD_NAME,
        payload: value,
      };
    case "surname":
      return {
        type: CHILD_SURNAME,
        payload: value,
      };

    case "documenttype":
      return {
        type: CHILD_DOCUMENT_TYPE,
        payload: value,
      };
    case "gender":
      return {
        type: CHILD_GENDER,
        payload: value,
      };
  }
};
