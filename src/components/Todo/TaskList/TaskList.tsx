import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Title } from 'components/Title/Title'
import { Form, Input, Select } from 'components/Form'
import { Dialog } from 'components/Dialog/Dialog'
import { Confirmation } from 'components/Confirmation/Confirmation'
import { TaskEdit } from '../TaskEdit/TaskEdit'
import { Task } from '../Task/Task'
import { ITask } from 'types/Task'
import { TodoContext, priorities } from '../TodoContext'
import styles from './TaskList.module.scss'

const sorting = (list: ITask[], field = 'name') => {
  const orderLevel = { urgent: 0, regular: 1, trivial: 2 }
  if (field === 'priority') {
    list.sort((a, b) => orderLevel[a.priority] - orderLevel[b.priority])
  } else {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }
  return [...list]
}
export const TaskList = () => {
  const context = useContext(TodoContext)
  const [order, setOrder] = useState('priority')
  const [filter, setFilter] = useState({ name: '', priority: '' })
  const [list, setList] = useState<ITask[]>([])
  const [isDelete, setDelete] = useState<string>('')
  const [isEdit, setEdit] = useState<string>('')

  const handleAction: MouseEventHandler<HTMLButtonElement> = e =>
    e.currentTarget.dataset['action'] === 'delete'
      ? setDelete(e.currentTarget.dataset['id'] || '')
      : setEdit(e.currentTarget.dataset['id'] || '')

  const handleSort: MouseEventHandler<HTMLTableCaptionElement> = e =>
    setOrder(e.currentTarget.dataset['field'] || '')

  let handleFilter = async (data: any) => setFilter(data)

  useEffect(() => {
    if (context?.list?.length)
      setList(
        sorting(
          context.list.filter(
            i =>
              i.name.toLowerCase().includes(filter.name.toLowerCase()) &&
              i.priority.includes(filter.priority.toLowerCase())
          ),
          order
        )
      )
  }, [filter, order, context.list])

  return (
    <>
      <Title level="h3">Job List</Title>
      <div data-testid="filter" className={styles.TaskList}>
        <Form onChange={handleFilter}>
          <div className={styles.filter}>
            <div>
              <Input
                name="name"
                placeholder="Job Name"
                data-testid="filter.name"
              />
            </div>
            <div>
              <Select
                name="priority"
                options={[
                  { label: 'Priority (all)', value: '' },
                  ...priorities,
                ]}
                data-testid="filter.priority"
              />
            </div>
          </div>
        </Form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                data-testid="sort.name"
                data-field="name"
                onClick={handleSort}>
                Name
              </th>
              <th
                data-testid="sort.priority"
                data-field="priority"
                onClick={handleSort}>
                Priority
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(i => (
              <Task key={i.id} data={i} onAction={handleAction} />
            ))}
          </tbody>
        </table>
      </div>

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
    </>
  )
}
