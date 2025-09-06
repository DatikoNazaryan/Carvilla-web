import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { errorCases } from 'constants/errorCases';

import { forgotPassword } from 'store/slices/userSlice';

import styles from './ForgotPassword.module.scss';

export default function ForgotPassword() {
  const allUsersModel = useSelector(store => store.users.allUsersModel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ foundUser, setFoundUser ] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ error, setError ] = useState('');

   const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFoundUser(allUsersModel.find(user => user.email.toLowerCase() === email.toLowerCase()));
  };

  const createNewPassword = () => {
    if(password.length < 4) {
            setError(errorCases.minValue);
            return;
          } else if(password.length > 40) {
            setError(errorCases.maxValue);
            return;
          }
    setError("");
    dispatch(forgotPassword({email, password}));
    navigate('/login');
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p className={styles.description}>
          Enter your email address and write your new password.
        </p>
        {foundUser === undefined && 
          <p className={styles.error}>Your email is not correct</p>
        }
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          disabled={foundUser ? true : false}
        />
        {foundUser && 
          <>
          <p className={styles.passwordDescription}>Write your new password</p>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.passwordInput}>
                    <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password' 
                    required 
                    className={styles.input} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                    <span className={styles.toggleIcon} onClick={togglePassword}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
            </div>
            <button className={styles.button} onClick={createNewPassword}>
                Create
            </button>
            </>
        }
        <button type="submit" className={styles.button} disabled={foundUser}>
          Send Reset Link
        </button>
        <Link to="/login" className={styles.backLink}><FaArrowLeft size='20px' /> Back to Login</Link>
      </form>
    </div>
  );
}
