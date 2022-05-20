import { useEffect, useState } from "react";
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

  return (
    <div className="container">
      <p>To-Do List</p>
      <div className="container-header">
        <label>
            Nome:
            <input name="name" value={name} onChange={handleChange} />
        </label>
        <label>
            Status:
            <select value={status} onChange={handleChange}>
            <option value="pendente">pendente</option>
                <option value="em andamento">em andamento</option>
                <option value="pronto">pronto</option>
            </select>
        </label>
        <button>Adicionar</button>
      </div>
      <div className="container-content">
      <ul>
      {task.map((taskItem) => {
        return <li key={taskItem.id}>
            {taskItem.name} 
              <select value={taskItem.status}>
                <option value="pendente" >pendente</option>
                <option value="andamento">em andamento</option>
                <option value="pronto">pronto</option>
              </select>
            <button>Atualizar</button>
            <button>Remover</button>
            </li>
        })}
      </ul>
      </div>
      
    </div>
  )
}