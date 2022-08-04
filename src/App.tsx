import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import {PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './components/Task';
import { Header } from './components/Header';

import './global.css';
import styles from './App.module.css';
import ClipboardSvg from './assets/clipboard.svg';

interface Task {
  id: string;
  description: string;
  isFinished: boolean;
}

function App() {
  // const [countTask, setCountTask] = useState(0);
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ newTaskText, setNewTaskText ] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    console.log('SUBMIT');
    
    const newTask = {
        id: uuidv4(),
        description: newTaskText,
        isFinished: false
      }
    
    setTasks([...tasks, newTask])
    setNewTaskText('');
    
  }

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function finishedTask(idToFinished: string) {
    const finishedTaskUpdate = tasks.map(task => {
      if(task.id === idToFinished){
        task.isFinished ? false : true;
      }
    })
    setTasks(finishedTaskUpdate);
  }

  function deleteTask(idToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter(task => {
      return task.id !== idToDelete;
    })

    setTasks(taskWithoutDeletedOne);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <section className={styles.newTask}>
          <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
            <input 
              type="text" 
              name="newTask" 
              placeholder='Adicione uma nova tarefa'
              value={newTaskText}
              onChange={handleChangeNewTask}
              onInvalid={handleNewTaskInvalid}
              required
            />
            <button type='submit' >
              <span>Criar</span>
              <PlusCircle size={16} />
            </button>
          </form>
        </section>
        
        <main className={styles.content}>
          <header>
            <div>Tarefas Criadas <span>{tasks.length}</span></div>
            <div>Concluídas <span>2 de {tasks.length}</span></div>
          </header>
          <article>
            {
              tasks.length === 0 && 
                <div className={styles.noTask}>
                  <img src={ClipboardSvg} />
                  <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            }
            
            {
              
              tasks.map(task => {
                return(
                  <Task 
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    isFinished={task.isFinished}
                    onFinishedTask={finishedTask}
                    onDeleteTask={deleteTask}
                  />
                )
              })
            }
            
          </article>
        </main>
      </div>
    </div>
  )
}

export default App
