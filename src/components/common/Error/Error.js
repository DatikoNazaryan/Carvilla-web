import styles from './Error.module.scss';

function Error () {
    return(
        <div className={styles.container}>
            <p className={styles.error}>
              Your email or password is not correct
            </p>
        </div>
    )
}

export default Error;