import { useState } from 'react';
import cx from 'classnames';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './SignUpInput.module.scss';

function SignUpInput ({ type, placeholder, onChange, onBlur, error }) {
   const [showPassword, setShowPassword] = useState(false);
  
    const togglePassword = () => setShowPassword(prev => !prev);

    return (
        <div className={styles.inputBlock}>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputWrapper}>
            <input 
              type={placeholder === "Password" ? (showPassword ? 'text' : type) : type}
              placeholder={error ? "" : placeholder}
              className={cx(styles.input, {
                [styles.name]: placeholder === "Name",
                [styles.errorInput]: error,
              })}
              onChange={(e) => onChange(e)}
              onBlur={onBlur}
            /> 
            {placeholder === "Password" &&
              <span className={styles.toggleIcon} onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            }
          </div>
        </div>
    );
}

export default SignUpInput;