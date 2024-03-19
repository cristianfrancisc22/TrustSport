import React, { useState } from 'react';
import { signupFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupState['password'] !== signupState['confirm-password']) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage(''); // Reset error message if passwords match
      createAccount();
    }
  }


//handle Signup API Integration here
const createAccount = () => {
  const endpoint = `http://localhost:8080/api/auth/signup`;
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupState)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.text(); // Return response as text
  })
  .then(data => {
    if (data.includes('error')) { // Check if error exists in response text
      setErrorMessage(data);
    } else {
      setErrorMessage('');
      navigate("/login")
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    setErrorMessage('An error occurred while signing up');
  });
}

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )
        }
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  )
}
