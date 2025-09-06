import styles from './AskForDeleteData.module.scss';

function AskForDeleteData({ cancel, handleClickBtn, id, askStr }) {
    return (
      <div>
        <p className={styles.askQuestionForDalate}>
            {askStr}
        </p>
        <div className={styles.answer}>
            <button
             className={styles.answerBtn}
             onClick={() => handleClickBtn(id)}
             >
              Yes
            </button>
            <button
             className={styles.answerBtn}
             onClick={cancel}
             >
              No
            </button>
        </div>
      </div>
    );
}

export default AskForDeleteData;