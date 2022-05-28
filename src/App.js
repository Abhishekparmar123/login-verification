import React, { useState, useRef } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

import { validPassword } from './regx-validator/Regx';

import bg from "./assets/images/background.png"
const mustContain = "Password must contain at least 6 character, including UPPER/lower case, number and special character"
const checkMobile = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

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
    console.log("email validity")
    setEmailIsValid(validator.isEmail(enteredEmail));
  };

  const password1ChangeHandler = (event) => {
    setEnteredPassword1(event.target.value);
  };
  const validatePassword1Handler = () => {
    if(password1IsValid && password2IsValid){
      setPasswordMatch(enteredPassword1===enteredPassword2);
    }
    setPassword1IsValid(validPassword.test(enteredPassword1.trim()));
  };

  const password2ChangeHandler = (event) => {
    setEnteredPassword2(event.target.value);
  };
  const validatePassword2Handler = () => {
    if(enteredPassword1.trim().length > 5 && enteredPassword2.trim().length > 5){
      setPasswordMatch(enteredPassword1===enteredPassword2);
    }
    setPassword2IsValid(enteredPassword2.trim().length > 5);
  };
  const numberChangeHandler = (event) => {
    setEnteredNumber(event.target.value);
  };
  const validateNumberHandler = () => {          
    if (!checkMobile.test(enteredNumber)) {
      setNumberIsValid(false)
    }else if(enteredNumber.length !== 10){
      setNumberIsValid(false)
    }
    else{
      setNumberIsValid(true)
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = validator.isEmail(enteredEmail);
    const password1 = validPassword.test(enteredPassword1.trim());
    const password2 = validPassword.test(enteredPassword2.trim());
    const number = numberIsValid
    
    console.log(emailIsValid, password1IsValid, password2IsValid)
    if( (password1===password2) && email && password1 && password2 && number){
      console.log("sign up")
      history.push("/dashboard")
    }
    else{
      validateNumberHandler()
      validatePassword1Handler()
      validatePassword2Handler()
      validateEmailHandler()
      console.log("please fill form first")
    }
  };

  console.log(enteredNumber, numberIsValid)

  return (
    <div className='m-6'>
      <div className='columns'>
        <div className='column p-0 mx-1 bg--blur'>
          <div className='has-text-centered'>
            <img src={bg} alt='error' className='img--fluid'/>
            <div className='column__footer'>
              <h1 className='is-size-5 has-text-weight-bold mb-3'>Choose a date range</h1>
              <p className='is-size-6'>This is the image footer text</p>
              <p className='is-size-6'>i am only using the dummy text</p>
            </div>
          </div>
        </div>
        <div className='column p-0 is-flex column--height' >
          <form class="box is-radiusless column--height px-6 pt-6" onSubmit={submitHandler}>
            <h1 className='form--heading'>Create an account</h1>
            <div class="field">
              <label class="label">Your email address</label>
              <div class="control">
                <input 
                  class={`input input--width ${ !emailIsValid && "is-danger"}`} 
                  type="email" 
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
                  class={`input input--width ${ ! password1IsValid && "is-danger"}`}
                  type="password"
                  autoComplete='true'
                  value={enteredPassword1}
                  onChange={password1ChangeHandler}
                  onBlur={validatePassword1Handler}
                />
              </div>
              <p class="help is-danger">{password1IsValid ? null : mustContain}</p>
            </div>
            <div class="field">
              <label class="label">Confirm your password</label>
              <div class="control">
                <input 
                  class={`input input--width ${ ! password2IsValid && "is-danger"}`}
                  type="password"
                  autoComplete='true' 
                  value={enteredPassword2}
                  onChange={password2ChangeHandler}
                  onBlur={validatePassword2Handler}
                />
              </div>
              <p class="help is-danger">{password2IsValid ? (passwordMatch ? null: "Password not match") : mustContain}</p>
            </div>
            <div class="field">
              <label class="label">Your full name</label>
              <div class="control">
                <input class="input input--width" type="text" ref={enteredName} />
              </div>
            </div>
            <div class="field mt-3">
              <label class="label">Your phone number</label>
              <div class="control">
                <input 
                  class="input input--phone" 
                  type="phone" 
                  value={enteredNumber}
                  onChange={numberChangeHandler}
                  onBlur={validateNumberHandler}
                  />
              </div>
              <p class="help is-danger">{ !numberIsValid && 'Mobile number is invalid'}</p>
            </div>
            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <div className='is-flex'>
                    <input type="checkbox" className="is-checkbox"/>
                    <span className='form--policy'>I read and agree to the Terms and Conditions</span>
                  </div>
                </label>
              </div>
            </div>
            <button class="button is-submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
