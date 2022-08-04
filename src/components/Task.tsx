import styles from './Task.module.css';
import { Trash } from 'phosphor-react';

export function Task() {
  return (
    <div className={styles.taskBox}>
      {/* <div className={styles.taskContent}>
        <input type="checkbox" />
        <span>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</span>
      </div> */}
      <div className={styles.taskContent}>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
        <span className={styles.descriptionTask}>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</span>
      </div>
      <button title="Deletar tarefa">
        <Trash size={14} />
      </button>
    </div>
  )
}