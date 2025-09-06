import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

import Header from 'components/layouts/Header/Header';
import Content from 'components/layouts/Content/Content';
import WelcomeText from 'components/common/WelcomeText/WelcomeText';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { setUser } from 'store/slices/userSlice';

import styles from './Login.module.scss';

function Login () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsersModel = useSelector(store => store.users.allUsersModel);
  const error = useSelector(store => store.users.error);
  const [ values, setValues ] = useState({
    email: "",
    password: ""
  });
  const [ isChecked, setIsChecked ] = useState(false);
  const [ err, setErr ] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLoginSubmit = (e) => {
      e.preventDefault();
      setErr(false);

      const result = allUsersModel.filter((curr) => (
        curr.email === values.email &&
        curr.password === values.password
      ));

      if(error || !result.length) {
        setErr(true);
        return
      }
      
      if (isChecked) {
        localStorage.setItem("user", JSON.stringify({
          ...result[0]
        }));
      }     
      
      dispatch(setUser(result[0]));
      navigate("/feed");
  };


    return (
        <div className={styles.container}>
          <div className={styles.login}>
          <Header
          value="Sign Up"
          to="/signup"
        />
        <Content>
             <div className={styles.content}>
                <WelcomeText />
              <form className={styles.formLogin} onSubmit={(e) => handleLoginSubmit(e)}>
                  <h2 className={styles.loginTitle}>Log in</h2>
                  {err && 
                    <p className={styles.error}>
                      Your email or password is not correct
                    </p>
                  }
                  <input 
                    type='email' 
                    placeholder='Email' 
                    required 
                    className={styles.input} 
                    onChange={(e) => setValues((state) =>({
                        ...state,
                        email: e.target.value,
                    }))}
                  />
                  <div className={styles.passwordInput}>
                    <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password' 
                    required 
                    className={styles.input} 
                    onChange={(e) => setValues((state) =>({
                      ...state,
                      password: e.target.value,
                  }))}
                  />
                    <span className={styles.toggleIcon} onClick={togglePassword}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  <div className={styles.forgotPassword}>
                    <Link to="/forgotPassword" className={styles.forgotPasswordLink}>Forgot password?</Link>
                  </div>
                  <div className={styles.checkbox}>
                    <input 
                      id='remember' 
                      type='checkbox' 
                      className={styles.checkboxInput} 
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor='remember'>Remember Me</label>
                  </div>               
                  <button 
                  className={styles.btn}
                  disabled={values.email && values.password ? false : true}
                  >
                    Login
                  </button>
              </form>
             </div>
        </Content>
          </div>
        </div>       
    );
}

export default Login;