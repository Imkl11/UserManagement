import React, { useState,useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import clasess from "./AddUser.module.css";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
 const nameUserInputRef= useRef();
 const ageUserInputRef=useRef();
const [error, setError] = useState();
 
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUserName=nameUserInputRef.current.value;
    const enteredUserAge=ageUserInputRef.current.value;
    if (enteredUserName.trim().length === 0 && enteredUserAge.trim().length === 0) {
      setError({
        titel: "Invalid input",
        message: "Please enter some value",
      });
      return;
    }
    if (+enteredUserAge < 0) {
      setError({
        titel: "Invalid Age",
        message: "Please enter age (>0)",
      });
      return;
    }
    props.onAddUser(enteredUserName, enteredUserAge);
    nameUserInputRef.current.value="";
    ageUserInputRef.current.value="";
   
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
    {    error && (
        <ErrorModel
          titel={error.titel}
          message={error.message}
          onConfirm={errorHandler}
        />)}
    <Card className={clasess.input}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">User Name</label>
        <input
          id="name"
          type="text"
          ref={nameUserInputRef}
        />
        <label htmlFor="age">User Age(in Years)</label>
        <input
          id="age"
          type="text"
          ref={ageUserInputRef}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </React.Fragment>
  );
};
export default AddUser;
