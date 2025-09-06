import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateCar } from 'store/slices/carSlice';
import { FaCamera, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import styles from './UpdateCar.module.scss';

function UpdateCar ({ car, cancel }) {
    const dispatch = useDispatch();
    const [ updateValues, setUpdateValues ] = useState(car);
    const [images, setImages] = useState(car.images);

    const handleUpdateDataSubmit = (e) => {
        e.preventDefault();
        const phoneRegex = /^\+[1-9]\d{1,14}$/;

        if (!updateValues.phoneNumber) {
            toast.error('Phone number is required');
            return;
            } else if (!phoneRegex.test(updateValues.phoneNumber)) {
            toast.error('Invalid phone number');
            return;
            }

        if(!updateValues.model){
            toast.error('Car model is required');
            return;
        } else if(!updateValues.price){
            toast.error('Car price is required');
            return
        }else if(!updateValues.description){
            toast.error('Car description is required');
            return
        }

        if(!images.length){
            toast.error('Add image your car');
            return
        }

        dispatch(updateCar({updateValues, images, id: car.id }));
        toast.success('success!!!!')
        cancel();
    };

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

  const handlePhoneChange = (value) => {
    setUpdateValues(prev => ({
      ...prev,
      phoneNumber: value,
    }));
  };

    return (
        <div className={styles.formBlock}>
            <form className={styles.form} onSubmit={(e) => handleUpdateDataSubmit(e)}>
           <div className={styles.inputBlock}>
            <label className={styles.label} htmlFor="model">Car Model</label>
           <input id="model" className={styles.input} type="text" value={updateValues.model} onChange={(e) => setUpdateValues((state) =>({
                       ...state,
                       model: e.target.value,
                   }))} /> 
           </div>
           <div className={styles.inputBlock}>
            <label htmlFor="phoneNumber" style={{ display: 'block' }}>
                    Phone Number
                </label>
                <PhoneInput
                    className={styles.input}
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    defaultCountry="AM"
                    international={true}
                    value={updateValues.phoneNumber}
                    onChange={handlePhoneChange}
                />
           </div>
           <div className={styles.inputBlock}>
            <label className={styles.label} htmlFor="price">Car Price</label>
            <input id="price" className={styles.input} type="text" value={updateValues.price} onChange={(e) => setUpdateValues((state) =>({
                       ...state,
                       price: e.target.value.replace(/^0+|[^\d]/g, ""),
                   }))} /> 
           </div>
           <div className={styles.inputBlock}>
            <label className={styles.label} htmlFor="description">Car Description</label>
            <textarea id="description" className={styles.updateDesq}
            value={updateValues.description}
            onChange={(e) => setUpdateValues((state) =>({
                ...state,
                description: e.target.value,
            }))}
            ></textarea>
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

                <div className={styles.uploaderPreview}>
                    {images.map((src, index) => (
                        <div key={index} className={styles.uploaderImageWrapper}>
                        <img
                            src={src}
                            alt={`preview-${index}`}
                            className={styles.uploaderImage}
                        />
                        <div className={styles.overlay}>
                            <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={() =>
                                setImages((prev) => prev.filter((p) => p !== src))
                            }
                            >
                            <FaTrash size={16} />
                            </button>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
           <div className={styles.btnBlock}>
              <button
                className={styles.btn}
                type='button'
                onClick={cancel}
                >
                    Cancel
                </button>
              <button 
              className={styles.btn}
              type='submit'
              >
                Save  
             </button>
           </div>
        </form>
        </div>
    );
}

export default UpdateCar;