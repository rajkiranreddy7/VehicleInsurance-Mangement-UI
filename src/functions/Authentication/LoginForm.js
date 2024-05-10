import React, { useState } from "react";

import { useNavigate } from "react-router";
import UserAction from "../../redux/action/UserAction";
import './Login.css';

const LoginForm = () => {
    const[user, setUser] = useState({userName : '', password : ''});
    const[error, setError] = useState({showSubmitError : false, errorMsg : '',fieldEmptyError:false});
    const[type,setType] = useState('password');
    const userAction = UserAction();
    const navigate = useNavigate();

    const onChangeUserId = event => {
        setUser({...user,userName : event.target.value});
    }

    const onChangePassword = event => {
        setUser({...user,password : event.target.value});
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const {userName, password} = user;
        console.log(user);
        if(userName === '' || password === '') {
          setError({...error, fieldEmptyError:true});
        }
        else {
          const response = await userAction.login(user);
          console.log("response :"+response);
          if(response.status === 200) {
            navigate('/');
          }
          else {
            setError({errorMsg:response.data, showSubmitError:true, fieldEmptyError:false});
          }
        }
    }

    const showPassword = (event) => {
        if(event.target.checked) {
            setType('text');
        }
        else {
            setType('password');
        }
    }

    const renderPasswordField = () => {
        const {password} = user;
    
        return (
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type={type}
              id="password"
              className="password-input-field"
              value={password}
              onChange={onChangePassword}
              placeholder="Password"
            />
          </>
        )
      }
    
      const renderUserIdField = () => {
        const {userName} = user;
    
        return (
          <>
            <label className="input-label" htmlFor="userName">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="username-input-field"
              value={userName}
              onChange={onChangeUserId}
              placeholder="Username"
            />
          </>
        )
      }

      const {showSubmitError, errorMsg, fieldEmptyError} = error;

    return (
    <div className="login-form-container">
    <form className="form-container" onSubmit={submitForm}>
      <div className="input-container">{renderUserIdField()}</div>
      <div className="input-container">{renderPasswordField()}</div>
      <div className="checkbox-container">
        <input type='checkbox' htmlFor='showPasswordLabel' onChange={showPassword}/>&nbsp;&nbsp;
        <label className="input-label" id='showPasswordLabel'>Show Password</label>
      </div>
      <button type="submit" className="login-button">
        Login
      </button>
      {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      {fieldEmptyError && <p className="error-message">*Fields shouldn't empty</p>}
    </form>
  </div>);
}

export default LoginForm;