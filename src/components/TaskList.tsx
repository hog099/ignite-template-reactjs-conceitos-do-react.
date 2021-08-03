import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle == '') {
      alert("Tarefa não pode ser inserida sem nome.")
    }
    let newTask = {
      id: Math.round(Math.random() * 99999 / 5) * 5 + 5,
      title: newTaskTitle,
      isComplete: false,
    }
    let newsTasks = tasks;
    newsTasks.push(newTask);
    
    setTasks(newsTasks);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let restantes = tasks.filter(i => i.id != id);
    let selected = tasks.filter(i => i.id == id)[0];
    
    const updatedtask = {
      ...selected,
      isComplete: selected?.isComplete ? false : true
    }

    let allTasks = restantes.concat(updatedtask)
    setTasks(allTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let allTasks = tasks.filter(i => i.id != id);

    setTasks(allTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}