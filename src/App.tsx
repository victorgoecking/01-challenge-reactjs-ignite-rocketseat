import { useState } from 'react'
import { Header } from './components/Header';

import styles from './App.module.css';
import './global.css';
import {PlusCircle } from 'phosphor-react';
import ClipboardSvg from './assets/clipboard.svg';

import { Task } from './components/Task';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <section className={styles.newTask}>
          <input 
            type="text" 
            name="newTask" 
            placeholder='Adicione uma nova tarefa' 
          />
          <button>
            <span>Criar</span>
            <PlusCircle size={16} />
          </button>
        </section>
        
        <main className={styles.content}>
          <header>
            <div>Tarefas Criadas <span>5</span></div>
            <div>Concluídas <span>2 de 5</span></div>
          </header>
          <article>
            <img src={ClipboardSvg} />
            <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
            <p>Crie tarefas e organize seus itens a fazer</p>

            <Task />
          </article>
        </main>
      </div>

      {/* <div className={styles.content}>
        
      </div> */}
    </div>
  )
}

export default App
