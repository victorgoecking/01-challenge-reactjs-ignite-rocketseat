import styles from './Task.module.css';
import { Trash } from 'phosphor-react';

interface TaskProps {
  id: string;
  description: string;
  isFinished: boolean;
  onFinishedTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({ id, description, isFinished, onFinishedTask, onDeleteTask }: TaskProps) {

  function handleFinishedTask(){
    onFinishedTask(id)
  }

  function handleDeleteTask(){
    onDeleteTask(id)
  }

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskContent}>
        <label className={styles.checkboxContainer}>
          <input type="checkbox" checked={isFinished} onChange={handleFinishedTask}/>
          <span className={styles.checkmark}></span>
        </label>
        <span className={isFinished ? styles.descriptionTaskFinished : styles.descriptionTask}>
          {description}
        </span>
      </div>
      <button title="Deletar tarefa" onClick={handleDeleteTask}>
        <Trash size={14} />
      </button>
    </div>
  )
}