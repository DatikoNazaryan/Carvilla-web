import { Link } from 'react-router-dom';

import Menu from './Menu/Menu';

import styles from './ProfileHeader.module.scss';

function ProfileHeader() {
  return (
    <header className={styles.header}>
            <Link className={styles.logo} to="/feed">
             CARVILLA
          </Link> 
          <div>
            <Menu />
          </div>
    </header>
  );
}

export default ProfileHeader;