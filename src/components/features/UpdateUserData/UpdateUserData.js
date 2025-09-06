import { useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import ProfileHeader from 'components/layouts/AuthLayout/ProfileHeader/ProfileHeader';
import Popup from 'components/common/Popup/Popup';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { errorCases } from 'constants/errorCases';

import { deleteUsersData, setUser, updateUsersList } from 'store/slices/userSlice';
import { carAutherDelete } from 'store/slices/carSlice';

import styles from './UpdateUserData.module.scss';

const AskForDeleteData = lazy(() => import('components/features/UpdateUserData/AskForDeleteData/AskForDeleteData'));

function UpdateUserData () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.user);
    const [ updateValues, setUpdateValues ] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [ error, setError ] = useState('');
    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleNewPassword = () => setShowNewPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    useEffect(() => {
       if(!user) {
        navigate('/login');
       }
    }, [user, navigate]);

    const toggleDeletePopupVisibility = (ev) => {
        if(ev) {
          ev.preventDefault();
        }
    
        setIsPopupVisible(prevState => !prevState);
      };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if(updateValues.oldPassword !== user?.password){
            setError('Your old password is not correct');
            return;
        } else if (updateValues.newPassword !== updateValues.confirmPassword){
          setError('Your new and confirmation passwords are different');
          return;
        } else if(updateValues.newPassword.length < 4) {
          setError(errorCases.minValue);
          return;
          } else if(updateValues.newPassword.length > 40) {
          setError(errorCases.maxValue);
          return;
          }
          setError("");
        dispatch(updateUsersList({id: user.id, password: updateValues.confirmPassword}));
        dispatch(setUser({...user, password: updateValues.confirmPassword}));
        localStorage.setItem('user', JSON.stringify({...user, password: updateValues.confirmPassword}));
        navigate('/feed');
    };

    const deleteUserData = (id) => {
        dispatch(deleteUsersData(id));
        dispatch(carAutherDelete(id));
        localStorage.removeItem("user");
        dispatch(setUser(null));
        setIsPopupVisible(prevState => !prevState);
    };

   return(
    <div className={styles.updateUserData}>
        <ProfileHeader />
             <form className={styles.formUpdate} onSubmit={(e) => handleUpdateSubmit(e)}>
                <h4 className={styles.title}>Change password</h4>
                {error && <p className={styles.error}>{error}</p>}
                <input 
                   type='text' 
                   placeholder='Name'
                   value={user?.email}
                   required 
                   className={styles.input}
                   disabled
                />
                <div className={styles.passwordInput}>
                    <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Old Password'
                    value={updateValues.oldPassword} 
                    required 
                    className={styles.input} 
                    onChange={(e) => setUpdateValues((state) =>({
                    ...state,
                    oldPassword: e.target.value,
                }))}
                  />
                    <span className={styles.toggleIcon} onClick={togglePassword}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>  
                <div className={styles.passwordInput}>
                    <input 
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='New Password'
                    value={updateValues.newPassword} 
                    required 
                    className={styles.input} 
                    onChange={(e) => setUpdateValues((state) =>({
                    ...state,
                    newPassword: e.target.value,
                }))}
                  />
                    <span className={styles.toggleIcon} onClick={toggleNewPassword}>
                      {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                <div className={styles.passwordInput}>
                    <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    value={updateValues.confirmPassword} 
                    required 
                    className={styles.input} 
                    onChange={(e) => setUpdateValues((state) =>({
                    ...state,
                    confirmPassword: e.target.value,
                }))}
                  />
                    <span className={styles.toggleIcon} onClick={toggleConfirmPassword}>
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                <div className={styles.btnBlock}> 
                    <button 
                    className={styles.btn}
                    type='submit'
                    disabled={updateValues.newPassword && updateValues.oldPassword && updateValues.confirmPassword ? false : true}
                    >
                    Save
                    </button>
                    <button 
                      className={styles.btn}
                      type='button'
                      onClick={toggleDeletePopupVisibility}
                    >
                        Delete
                    </button>
                </div>  
                <Link to="/feed" className={styles.backLink}><FaArrowLeft size='20px' /> Go to back</Link>                        
             </form>
             {
                  isPopupVisible && (
                  <Popup className={styles.deletePopup} onClose={toggleDeletePopupVisibility}>
                    <Suspense fallback={<p>Content is loading...</p>}>
                      <AskForDeleteData 
                         askStr='Do you really want to delete your personal data?'
                         handleClickBtn={deleteUserData} 
                         id={user?.id}
                         cancel={toggleDeletePopupVisibility} /> 
                    </Suspense>
                  </Popup>
                    )
            }  
    </div>
   );
}

export default UpdateUserData;