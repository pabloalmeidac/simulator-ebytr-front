import { useCallback, useEffect, useState } from "react";
import { ApiException } from "../../shared/services/apiException";
import { ITask, TasksService } from "../../shared/services/taskService";

export const Home = () => {
  const [task, setTask] = useState<ITask[]>([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pendente');
  const [selectValue, setSelectValue] = useState({name: "", status: "", id: ""});


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

  const handleEdit = useCallback((name: string) => {
    if(name === selectValue.name) {
      const { id, status } = selectValue;

      TasksService.updateById(parseInt(id), status).then((result) => {
        if(result instanceof ApiException) {
          alert(result.message);
        } else {
          console.log('not implemented')
        };
      });
    }

    
  }, [selectValue]);

  const handleEditSelect = (event: any) => {
    const { name, value, id } = event.target;
    setSelectValue({name, status: value, id})
  }

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
              <select name={taskItem.name} id={taskItem.id.toString()} defaultValue={taskItem.status} onChange= {handleEditSelect}>
                <option defaultValue="pendente" >pendente</option>
                <option defaultValue="andamento">em andamento</option>
                <option defaultValue="pronto">pronto</option>
              </select>
            <button onClick={() => handleEdit(taskItem.name)}>Atualizar</button>
            <button onClick={() => handleRemove(taskItem.id)}>Remover</button>
            </li>
        })}
      </ul>
      </div>
    </div>
  )
}

