import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import cx from 'classnames';

import styles from './UsersName.module.scss';

function UsersName () {
  const allUsersModel = useSelector(store => store.users.allUsersModel);
  const user = useSelector(store => store.users.user);
  const { userId } = useParams();
  const [ users, setUsers ] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
      const usersListWithoutCurrent = allUsersModel.filter((curr) => curr.id !== user.id);
      setUsers(usersListWithoutCurrent);
  }, [allUsersModel, userId, user.id]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
   <>
  <input
    type="checkbox"
    id="menuToggle"
    className={styles.menuToggle}
    checked={menuOpen}
    onChange={() => setMenuOpen(!menuOpen)}
  />
  <label htmlFor="menuToggle" className={styles.burgerLabel}>☰ Users</label>

  {menuOpen && (
    <div className={styles.backdrop} onClick={() => setMenuOpen(false)}>
        <div className={styles.usersNameBlockMenu} onClick={e => e.stopPropagation()}>
        {!users.length ? (
            <p className={styles.userNameError}>There are no other users in the system yet</p>
        ) : (
            users.map(curr => (
            <Link
                key={curr.id}
                to={`/profile/${curr.id}`}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
            >
                <div className={cx(styles.user, { [styles.activ]: +userId === curr.id })}>
                <p className={styles.userName}>{curr.name}</p>
                </div>
            </Link>
            ))
        )}
        </div>
    </div>
    )}
  <div className={cx(styles.usersNameBlock, { [styles.open]: menuOpen })}>
    <Link
          to={'/feed'}
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          <div className={cx(styles.user, { [styles.activ]: !+userId})}>
            <p className={styles.userName}>All</p>
          </div>
        </Link>
    {!users.length ? (
      <p className={styles.userNameError}>There are no other users in the system yet</p>
    ) : (
      users.map(curr => (
        <Link
          key={curr.id}
          to={`/profile/${curr.id}`}
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          <div className={cx(styles.user, { [styles.activ]: +userId === curr.id })}>
            <p className={styles.userName}>{curr.name}</p>
          </div>
        </Link>
      ))
    )}
  </div>
</>

  );
}

export default UsersName;