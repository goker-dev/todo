import { useContext } from 'react'
import * as Yup from 'yup'
import { Title } from 'components/Title/Title'
import { Button, Form, Input, Select, Submit } from 'components/Form'
import { TodoContext, priorities } from '../TodoContext'
import styles from './TaskEdit.module.scss'

type Props = {
  id: string
  onClose?: () => void
}
export const TaskEdit = ({ id, onClose = () => null }: Props) => {
  const context = useContext(TodoContext)
  const schema = Yup.object().shape({
    // name: Yup.string().trim().matches(/^[A-z0-9\s]*$/).max(255),
    priority: Yup.string().oneOf(priorities.map(i => i.value)),
  })
  let handleSubmit = async (data: any) => {
    context.updateTask(data)
    await onClose()
  }

  return (
    <div className={styles.TaskEdit}>
      <Title level="h3">Job Edit</Title>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={context.readTask(id)}>
        <div>
          <Input
            name="name"
            label="Job Name"
            placeholder="Write an alphanumeric task description in here ..."
            disabled
          />
        </div>
        <div>
          <Select
            name="priority"
            label="Job Priority"
            options={[{ label: 'Choose', value: '' }, ...priorities]}
          />
        </div>
        <div className={styles.actions}>
          <Button onClick={onClose}>Cancel</Button>
          <Submit template="save">Save</Submit>
        </div>
      </Form>
    </div>
  )
}
