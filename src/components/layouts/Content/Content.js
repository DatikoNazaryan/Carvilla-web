import styles from './Content.module.scss';

function Content({ children }) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

export default Content;
