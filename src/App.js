import React, { useState, useRef } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import { useHistory } from 'react-router-dom';

import bg from "./assets/images/background.png"

function App() {
  const enteredName = useRef("");
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredPassword1, setEnteredPassword1] = useState('');
  const [password1IsValid, setPassword1IsValid] = useState(true);
  const [enteredPassword2, setEnteredPassword2] = useState('');
  const [password2IsValid, setPassword2IsValid] = useState(true);
  const [enteredNumber, setEnteredNumber] = useState('');
  const [numberIsValid, setNumberIsValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const password1ChangeHandler = (event) => {
    setEnteredPassword1(event.target.value);
  };
  const validatePassword1Handler = () => {
    if(enteredPassword1.trim().length > 6 && enteredPassword2.trim().length > 6){
      setPasswordMatch(enteredPassword1===enteredPassword2);
    }
    setPassword1IsValid(enteredPassword1.trim().length > 6);
  };

  const password2ChangeHandler = (event) => {
    setEnteredPassword2(event.target.value);
  };
  const validatePassword2Handler = () => {
    if(enteredPassword1.trim().length > 6 && enteredPassword2.trim().length > 6){
      setPasswordMatch(enteredPassword1===enteredPassword2);
    }
    setPassword2IsValid(enteredPassword2.trim().length > 6);
  };
  const numberChangeHandler = (event) => {
    setEnteredNumber(event.target.value);
  };
  const validateNumberHandler = () => {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    setNumberIsValid(regex.test(enteredNumber));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailIsValid(enteredEmail!=="");
    if(enteredPassword1===enteredPassword2 && emailIsValid && password1IsValid && password2IsValid && numberIsValid){
      console.log("sign up")
      history.push("/dashboard")
    }
    else{
      setPasswordMatch(false);
    }
  };

  console.log(enteredNumber, numberIsValid)

  return (
    <div className='container mt-6'>
      <div className='columns'>
        <div className='column px-0 is-flex'>
          <figure class="image column--height">
            <img src={bg} alt='error' style={{height:'100%'}}/>
            <div className='column__footer'>
              <h1 className='is-size-4 has-text-weight-bold'>Choose a date range</h1>
              <p>This is the image footer text</p>
              <p>i am only using the dummy text</p>
            </div>
          </figure>
        </div>
        <div className='column px-0 is-flex column--height' >
          <form class="box is-radiusless column--height" onSubmit={submitHandler}>
            <div class="field">
              <label class="label">Your email address</label>
              <div class="control">
                <input 
                  required
                  class="input" 
                  type="email" 
                  placeholder="e.g. alex@example.com" 
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  onBlur={validateEmailHandler}
                  />
              </div>
              <p class="help is-danger">{emailIsValid ? null : 'This email is invalid'}</p>
            </div>
            <div class="field">
              <label class="label">Your password</label>
              <div class="control">
                <input 
                  required
                  class="input" 
                  type="password"
                  autoComplete='true'
                  placeholder="********" 
                  value={enteredPassword1}
                  onChange={password1ChangeHandler}
                  onBlur={validatePassword1Handler}
                />
              </div>
              <p class="help is-danger">{password1IsValid ? null : 'Password must contain at least 6 character'}</p>
            </div>
            <div class="field">
              <label class="label">Confirm your password</label>
              <div class="control">
                <input 
                  required
                  class="input" 
                  type="password"
                  autoComplete='true' 
                  placeholder="********" 
                  value={enteredPassword2}
                  onChange={password2ChangeHandler}
                  onBlur={validatePassword2Handler}
                />
              </div>
              <p class="help is-danger">{password2IsValid ? (passwordMatch ? null: "Password not match") : 'Password must contain at least 6 character'}</p>
            </div>
            <div class="field">
              <label class="label">Your full name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Your full name" ref={enteredName} required/>
              </div>
            </div>
            <div class="field">
              <label class="label">Your phone number</label>
              <div class="control">
                <input 
                  required
                  class="input" 
                  type="phone" 
                  placeholder="Phone number" 
                  value={enteredNumber}
                  onChange={numberChangeHandler}
                  onBlur={validateNumberHandler}
                  />
              </div>
              <p class="help is-danger">{numberIsValid ? null : 'Mobile number is invalid'}</p>
            </div>
            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" /> I agree to the <a href="/">terms and conditions</a>
                </label>
              </div>
            </div>
            <button class="button is-primary">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
