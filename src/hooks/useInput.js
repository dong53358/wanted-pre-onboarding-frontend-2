import React, {useState } from 'react';

const useInput = (initialValues) => {
    const [inputValue, setInputValues] = useState(initialValues);
        const handleChange = (e) => {
            setInputValues({ ...inputValue, [e.target.name]: e.currentTarget.value });
        };
      
        const reset = () => {
            setInputValues(initialValues);
        };
      
        return [inputValue, handleChange, reset];
};

export default useInput;