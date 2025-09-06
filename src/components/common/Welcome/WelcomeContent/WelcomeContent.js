import styles from './WelcomeContent.module.scss';

function WelcomeContent () {
     return(
        <section className={styles.homeBannerArea}>
           <div className={styles.bannerInner}>
                <div className={styles.container}>
                  <div className={styles.bannerContent}>
                   <div className={styles.col}>
                     <h1>
                        CAR COLLECTION
                     </h1>
                      <p className={styles.sub}>
                      Get your desired car in resonable Price
                      </p>
                   </div>
                  </div>
                </div>
           </div>
        </section>
     );
}

export default WelcomeContent;