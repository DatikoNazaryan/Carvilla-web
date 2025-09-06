import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from 'components/layouts/Header/Header';
import Content from 'components/layouts/Content/Content';
import WelcomeText from 'components/common/WelcomeText/WelcomeText';
import SignUpInput from './SignUpInput/SignUpInput';

import { fetchAllUsersModelAsync } from 'store/slices/userSlice';
import addDataLocalStorage from 'helpers/addUserLocalStorage';
import { errorCases } from 'constants/errorCases';

import styles from './SignUp.module.scss';

function SignUp () {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const allUsersModel = useSelector(store => store.users.allUsersModel);
     const [ values, setValues ] = useState({
      name: "",
      email: "",
      password: "",
     });
     const [ error, setError ] = useState({
      nameErr: "",
      emailErr: "",
      passwordErr: "",
     });

     const isButtonDisabled = useMemo(() => values.name && values.email && values.password.length >= 4 && !error.nameErr && !error.emailErr && !error.passwordErr, [values, error]);

     const handleSubmit = (e) => {
      e.preventDefault(); 
       const checkEmail = allUsersModel.find(user => user.email === values.email);

       if(checkEmail){
          setError((prev) => ({...prev, emailErr: 'This email already exist'}));
       } else {
          addDataLocalStorage("allUsersModel", {
          ...values,
          id: allUsersModel.length ? allUsersModel[allUsersModel.length - 1].id + 1 : 1,
          favoriteIds: []
          });
        dispatch(fetchAllUsersModelAsync());
        navigate("/login");
        }
     };

     const setFieldErrors = (errorName, value) => {
      setError((state) => ({
        ...state,
        [errorName]: value
      }));
     };

     const handleOnBlurName = () => {
      if(!values.name.trim()) {
        setFieldErrors("nameErr", errorCases.required);
        return;
      }
      setFieldErrors("nameErr", "");
     };

     const handleOnBlurEmail = () => {
      if (!values.email.trim().match(/^[a-zA-Z0-9]+-?[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)) {
        setFieldErrors("emailErr", errorCases.emailNotCorrect);
        return;
      }
      setFieldErrors("emailErr", "");
     };

     const handleOnBlurPassword = () => {
      if(values.password.length < 4) {
        setFieldErrors("passwordErr", errorCases.minValue);
        return;
      } else if(values.password.length > 40) {
        setFieldErrors("passwordErr", errorCases.maxValue);
        return;
      }
      setFieldErrors("passwordErr", "");
     };

     const setFieldValues = (fieldName, value) => {
      setValues((state) => ({
        ...state,
        [fieldName]: value,
      }))
     };

   return(
      <div className={styles.container}>
        <div className={styles.signUp}>
        <Header
          value="Login"
          to="/login"
      />
      <Content>
          <div className={styles.content}>
            <WelcomeText />
            <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
                <h2 className={styles.loginTitle}>Sign Up</h2>
                <SignUpInput
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setFieldValues('name', e.target.value)}
                  onBlur={handleOnBlurName}
                  error={error.nameErr}
                />
                <SignUpInput
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setFieldValues('email', e.target.value)}
                  onBlur={handleOnBlurEmail}
                  error={error.emailErr}
                />
                <SignUpInput
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setFieldValues('password', e.target.value)}
                  onBlur={handleOnBlurPassword}
                  error={error.passwordErr}
                />                             
                <button 
                type="submit"
                className={styles.btn}
                disabled={!isButtonDisabled}
                >
                  Sign Up
                </button>
             </form>
          </div>
      </Content>
        </div>     
      </div>
   );
}

export default SignUp;