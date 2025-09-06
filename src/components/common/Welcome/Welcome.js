import { Link } from 'react-router-dom';
import WelcomeContent from './WelcomeContent/WelcomeContent';

import styles from './Welcome.module.scss';

function WelcomeWorldWrestling () {
   return(
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <header className={styles.header}>
         <Link className={styles.logo} to="/">
             CARVILLA
          </Link> 
          <div>
            <Link 
              to="/login"
              className={styles.link}
            >
              Login
            </Link>
            <Link 
               className={styles.link}
               to="/signUp"
            >
              Sign Up
            </Link>
          </div>   
        </header>
          </div>      
     <WelcomeContent />
    </div>   
   );
}

export default WelcomeWorldWrestling;
