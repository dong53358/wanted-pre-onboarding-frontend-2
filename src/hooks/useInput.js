import React, { useState } from "react";

const useInput = (initialValues) => {
  const [inputValue, setInputValues] = useState(initialValues);
  const handleChange = (e) => {
    setInputValues({ ...inputValue, [e.target.name]: e.currentTarget.value });
  };

  return [inputValue, handleChange];
};

export default useInput;
