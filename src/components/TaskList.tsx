import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import {PlusCircle } from 'phosphor-react';

import { Task } from './Task';

import styles from './TaskList.module.css';
import ClipboardSvg from '../assets/clipboard.svg';


interface Task {
  id: string;
  description: string;
  isFinished: boolean;
}

export function TaskList(){
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ newTaskDescription, setNewTaskDescription ] = useState('');

  console.log('renderizou');
  console.log(tasks);
  
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    
    setTasks(state => [
      ...state,
      {
        id: uuidv4(),
        description: newTaskDescription,
        isFinished: false
      }
    ])
    setNewTaskDescription('');
    
  }

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskDescription(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function finishedTask(idToFinished: string) {

    // let finishedTaskUpdate = tasks;
    // finishedTaskUpdate.filter(toUpdate => {
    //   if(toUpdate.id === idToFinished){
    //     toUpdate.isFinished = !toUpdate.isFinished;
    //   }
    // })

    const finishedTaskUpdate = tasks.map(task => task.id === idToFinished ? {
      ...task,
      isFinished: !task.isFinished
    }: task)

    setTasks(finishedTaskUpdate);
  }

  function deleteTask(idToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter(task => task.id !== idToDelete);

    setTasks(taskWithoutDeletedOne);
  }

  function countFinishedTask(): number{
    const count = tasks.filter(task => task.isFinished === true).length;
    return count;
  }

  return(
    <div className={styles.wrapper}>
      <section className={styles.newTask}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <input 
            type="text" 
            name="newTask" 
            placeholder='Adicione uma nova tarefa'
            value={newTaskDescription}
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
          <div>Concluídas <span>{countFinishedTask()} de {tasks.length}</span></div>
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
  )
}