import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { setUser } from 'store/slices/userSlice';

import styles from './Menu.module.scss';

function Menu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(store => store.users.user);
  const { userId } = useParams();

  const handleClick = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    setIsOpen(false);
    navigate("/login")
  };

  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <ul className={styles.menuList}>
            <Link 
              className={styles.link} 
              to="/updateProfile"
              onClick={() => setIsOpen(false)}
            >             
                <li>My Profile</li>
            </Link>
            <Link to={`/profile/${user.id}`} className={styles.link}>
            <li className={+userId === user?.id ? styles.activ : ""}>My Cars</li>
             </Link>
          <li>
            <button 
              className={styles.btn}
              onClick={handleClick}
              type='submit'
            >
              <FiLogOut style={{ marginRight: '8px' }} />
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Menu;
