import { MouseEventHandler, useEffect, useState } from 'react'
import { Title } from 'components/Title/Title'
import { TaskFilter } from '../TaskFilter/TaskFilter'
import { Task } from '../Task/Task'
import { ITask } from 'types/Task'
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

type Props = {
  list: ITask[]
  handleAction: MouseEventHandler
}
export const TaskList = ({ list: _list = [], handleAction }: Props) => {
  const [list, setList] = useState<ITask[]>(_list)
  const [order, setOrder] = useState('priority')
  const [filter, setFilter] = useState({ name: '', priority: '' })

  const handleSort: MouseEventHandler<HTMLTableCaptionElement> = e =>
    setOrder(e.currentTarget.dataset['field'] || '')

  let handleFilter = async (data: any) => setFilter(data)

  useEffect(() => {
    if (_list.length)
      setList(
        sorting(
          _list.filter(
            i =>
              i.name.toLowerCase().includes(filter.name.toLowerCase()) &&
              i.priority.includes(filter.priority.toLowerCase())
          ),
          order
        )
      )
  }, [filter, order, _list])

  return (
    <>
      <Title level="h3">Job List</Title>
      <div className={styles.TaskList}>
        <TaskFilter handleFilter={handleFilter} />
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
    </>
  )
}
