import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllCardsModelAsync } from 'store/slices/carSlice';
import { getCarsDate } from 'helpers/createDate';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import addDataLocalStorage from 'helpers/addUserLocalStorage';

import styles from './CarData.module.scss';

function CarData ({ cancel }) {
    const allCarsModel = useSelector(store => store.cars.allCarsModel);
    const user = useSelector(store => store.users.user);
    const dispatch = useDispatch();
    const [ values, setValues ] = useState({
        model: "",
        price: "",
        description: "",
        phoneNumber: ""
    });
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((imageDataUrls) => {
      setImages(prev => ([...prev, ...imageDataUrls])); 
    });
  };

    const handleCarDataSubmit = (e) => {
        e.preventDefault();
        if (!values.phoneNumber) {
                   toast.error('Phone number is required');
                   return;
                   }
       
               if(!values.model){
                   toast.error('Car model is required');
                   return;
               } else if(!values.price){
                   toast.error('Car price is required');
                   return
               }else if(!values.description){
                   toast.error('Car description is required');
                   return
               }
       
               if(!images.length){
                   toast.error('Add image your car');
                   return
               }
        
        addDataLocalStorage("allCarsModel", {
            ...values,
            images: images,
            creationDate: getCarsDate(),
            sortData: Date(),
            authorId: user.id,
            id: allCarsModel.length ? allCarsModel[allCarsModel.length - 1].id + 1 : 1 ,
        });
         dispatch(fetchAllCardsModelAsync());
         cancel();
    };


    const handlePhoneChange = (value) => {
        setValues(prev => ({
        ...prev,
        phoneNumber: value,
        }));
     };
    

    return (
        <div className={styles.formBlock}>
            <form className={styles.form} onSubmit={(e) => handleCarDataSubmit(e)}>
            <div className={styles.inputBlock}>
            <label className={styles.label} htmlFor="model">Car Model</label>
            <input className={styles.input} id="model" type='text' value={values.model} onChange={(e) => setValues((state) =>({
                       ...state,
                       model: e.target.value,
                   }))} />
            </div>
            <div className={styles.inputBlock}>
                <label className={styles.label} htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '8px' }}>
                    Phone Number
                </label>
                <PhoneInput
                    className={styles.input}
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    defaultCountry="AM"
                    international={true}
                    value={values.phoneNumber}
                    onChange={handlePhoneChange}
                />
            </div>
           <div className={styles.inputBlock}>
                <label className={styles.label} htmlFor="price">Car Price</label>
                <input className={styles.input} id="price" type='text' value={values.price} onChange={(e) => setValues((state) =>({
                       ...state,
                       price: e.target.value.replace(/^0+|[^\d]/g, ""),
                   }))} />
           </div>
            <div className={styles.inputBlock}>
                <label className={styles.label} htmlFor="description">Car Description</label>
                <textarea id="description" onChange={(e) => setValues((state) =>({
                       ...state,
                       description: e.target.value,
                   }))}></textarea>
            </div>
           <div className={styles.uploader}>
                <h5 className={styles.uploaderTitle}>
                    <FaCamera style={{ marginRight: '8px' }} />
                      Upload Your Images
                </h5>
                <label className={styles.uploaderLabel}>
                    <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className={styles.uploaderInput}
                    />
                    <span className={styles.uploaderButton}>Click to Select Images</span>
                </label>

                {images.length > 0 && (
                    <div className={styles.uploaderPreview}>
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`preview-${index}`} className={styles.uploaderImage} />
                    ))}
                    </div>
                )}
            </div>
            <div className={styles.btnBlock}>
                <button className={styles.btn} onClick={cancel}>Cancel</button>
                <button 
                className={styles.btn}
                type="submit"
                >
                    Create
                </button>
            </div>
        </form>
        </div>
    );
}

export default CarData;
