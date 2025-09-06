import styles from './WelcomeText.module.scss';

function WelcomeText () {
     return (
        <section className={styles.welcomeText}>
                 <h1 className={styles.welcomeTextTitle}>
                   Find Your Perfect Ride
                 </h1>
                 <p className={styles.welcomeTextDesc}>Explore a curated collection of high-performance and luxury vehicles from certified dealers. Enjoy a personalized, white-glove experience from search to delivery.</p>
        </section>
     )
}

export default WelcomeText;