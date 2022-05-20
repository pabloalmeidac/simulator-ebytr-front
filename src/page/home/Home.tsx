import { useCallback, useEffect, useState } from "react";
import { ApiException } from "../../shared/services/apiException";
import { ITask, TasksService } from "../../shared/services/taskService";

export const Home = () => {
  const [task, setTask] = useState<ITask[]>([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pendente');

  useEffect(() => {
    TasksService.getAll().then((result) => {
      if(result instanceof ApiException) {
        alert(result.message);
      } else {
        setTask(result);
      }
    })
}, [])

  const handleChange = (event: any) => {
    if(event.target.name === "name") return setName(event.target.value);
    setStatus(event.target.value);
  }

  const create  = useCallback(() => {
    if(task.some((taskItem) => taskItem.name === name)) return task;

    TasksService.create({ name, status })
    .then((result) => {
      if(result instanceof ApiException) {
        alert(result.message);
      } else {
        setTask((oldTask) => [...oldTask, result]);
      }
    })

  }, [task, name, status]);

  const handleRemove = useCallback((id: number) => {
    TasksService.deleteById(id)
    .then((result) => {
      if(result instanceof ApiException) {
        alert(result.message);
      } else {
        setTask(oldTask => {
          return oldTask.filter(oldTaskItem => oldTaskItem.id !== id);
          });
      };
    });
  }, []);

  return (
    <div className="container">
      <p>To-Do List</p>
      <div className="container-header">
        <label>
            Nome:
            <input name="name" defaultValue={name} onChange={handleChange} />
        </label>
        <label>
            Status:
            <select defaultValue={status} onChange={handleChange}>
            <option defaultValue="pendente">pendente</option>
                <option defaultValue="em andamento">em andamento</option>
                <option defaultValue="pronto">pronto</option>
            </select>
        </label>
        <button onClick={create}>Adicionar</button>
      </div>
      <div className="container-content">
      <ul>
      {task.map((taskItem) => {
        return <li key={taskItem.id}>
            {taskItem.name} 
              <select defaultValue={taskItem.status}>
                <option defaultValue="pendente" >pendente</option>
                <option defaultValue="andamento">em andamento</option>
                <option defaultValue="pronto">pronto</option>
              </select>
            <button>Atualizar</button>
            <button onClick={() => handleRemove(taskItem.id)}>Remover</button>
            </li>
        })}
      </ul>
      </div>
      
    </div>
  )
}

