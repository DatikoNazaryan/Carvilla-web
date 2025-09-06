import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

function Header ({value, to}) {
   return(
    <header className={styles.header}>
          <Link className={styles.logo} to="/">
            CARVILLA
          </Link> 
            <Link 
               className={styles.link}
               to={to}
            >
              {value}
            </Link>        
    </header>
   );
}

export default Header;