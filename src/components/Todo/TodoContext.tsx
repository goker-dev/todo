import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { ITask, TodoContextType } from 'types/Task'
import { v4 as uuidv4 } from 'uuid'

const TodoContext = createContext<TodoContextType>({} as TodoContextType)

const TodoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [init, setInit] = useState<boolean>(false)
  const [list, setList] = useState<ITask[]>([])

  useEffect(() => {
    if (init) localStorage.setItem('todo', JSON.stringify(list))
    // eslint-disable-next-line
  }, [list])

  useEffect(() => {
    ;(async () => {
      let data = JSON.parse(localStorage.getItem('todo') || '[]') as ITask[]
      if (!data.length) {
        data = await fetch('/api/todo', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })
          .then((data: any) => (data.json() || []) as ITask[])
          .catch(() => {
            console.error('API error!')
            return [] as ITask[]
          })
      }
      setList(data)
      setInit(true)
    })()
  }, [])

  const createTask = (task: ITask) => {
    setList([...list, { ...task, id: uuidv4() }])
    return true
  }

  const readTask = (id: string) => {
    return list.find(i => i.id === id) as ITask
  }

  const updateTask = (task: ITask) => {
    let index = list.findIndex(i => String(i.id) === String(task.id))
    if (index >= 0) {
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
    <TodoContext.Provider
      value={{ list, createTask, readTask, updateTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  )
}

export { TodoContext, TodoProvider }

export const priorities = [
  {
    label: 'Urgent',
    value: 'urgent',
  },
  {
    label: 'Regular',
    value: 'regular',
  },
  {
    label: 'Trivial',
    value: 'trivial',
  },
]
