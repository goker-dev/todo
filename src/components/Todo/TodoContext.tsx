import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {TodoContextType, ITask} from 'types/Task';
import {v4 as uuidv4} from 'uuid';

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

const TodoProvider: FC<PropsWithChildren> = ({children}) => {
    const [init, setInit] = useState<boolean>(false)
    const [list, setList] = useState<ITask[]>([])

    useEffect(() => {
        if (init)
            localStorage.setItem('todo', JSON.stringify(list))
    }, [list])


    useEffect(() => {
        // console.log('useEffect');
        (async () => {
            let data = JSON.parse(localStorage.getItem('todo') || '[]') as ITask[]
            if (!data.length) {
                // console.info('API fetching...')
                data = await fetch('http://localhost:8000/api/todo', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                })
                    .then((data: any) => (data.json() || []) as ITask[])
                    .catch(e => {
                        console.error("API error!")
                        return [] as ITask[]
                    })
            }
            setList(data)
            setInit(true)
        })()
    }, [])

    const createTask = (task: ITask) => {
        // console.log('create task', task)
        setList([...list, {...task, id: uuidv4()}])
    }

    const readTask = (id: string) => {
        // console.log('read task', id)
        return list.find((i) => i.id === id) as ITask
    }

    const updateTask = (task: ITask) => {
        let index = list.findIndex(i => i.id === task.id)
        if (index) {
            list[index] = task
            setList([...list])
            return true
        } else return false
    }

    const deleteTask = (id: string) => {
        setList(list.filter((i: ITask) => i.id !== id))
        return true
    }

    return (
        <TodoContext.Provider value={{list, createTask, readTask, updateTask, deleteTask}}>
            {children}
        </TodoContext.Provider>
    );
};

export {TodoContext, TodoProvider}