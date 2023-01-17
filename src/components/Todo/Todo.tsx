import React, {
  MouseEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { TodoContext, TodoProvider } from './TodoContext'
import { TaskCreate } from './TaskCreate/TaskCreate'
import { TaskList } from './TaskList/TaskList'
import { Confirmation } from '../Confirmation/Confirmation'
import { Dialog } from '../Dialog/Dialog'
import { TaskEdit } from './TaskEdit/TaskEdit'

const App = () => {
  const context = useContext(TodoContext)
  const [isDelete, setDelete] = useState<string>('')
  const [isEdit, setEdit] = useState<string>('')

  const handleAction: MouseEventHandler<HTMLButtonElement> = useCallback(
    e =>
      e.currentTarget.dataset['action'] === 'delete'
        ? setDelete(e.currentTarget.dataset['id'] || '')
        : setEdit(e.currentTarget.dataset['id'] || ''),
    []
  )

  const taskList = useMemo(
    () => <TaskList list={context.list} handleAction={handleAction} />,
    // eslint-disable-next-line
    [context.list]
  )

  console.log('context.list', context.list)

  return (
    <div data-testid="todo">
      <TaskCreate />
      {taskList}
      {isDelete && (
        <Confirmation
          onConfirm={() => context.deleteTask(isDelete) && setDelete('')}
          onCancel={() => setDelete('')}
          title="Are you sure you want to delete it?"
          confirmText="Approve"
          cancelText="Cancel"
        />
      )}
      {isEdit && (
        <Dialog>
          <TaskEdit id={isEdit} onClose={() => setEdit('')} />
        </Dialog>
      )}
    </div>
  )
}

export const Todo = () => (
  <TodoProvider>
    <App />
  </TodoProvider>
)
