import { FaArrowUp } from 'react-icons/fa'

import styles from './ScrollTo.module.scss';

function ScrollTo({showButton,scrollToTop}) {

    return(
        showButton &&
            <button className={styles.btn} onClick={scrollToTop}>
                <FaArrowUp size={20} />
            </button>
    );
}

export default ScrollTo;