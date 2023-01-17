import { useContext } from 'react'
import * as Yup from 'yup'
import { Title } from 'components/Title/Title'
import { Form, Input, Select, Submit } from 'components/Form'
import { TodoContext, priorities } from '../TodoContext'
import styles from './TaskCreate.module.scss'

export const TaskCreate = () => {
  const context = useContext(TodoContext)
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[A-z0-9\s]*$/)
      .max(255),
    priority: Yup.string().oneOf(priorities.map(i => i.value)),
  })
  const handleSubmit = async (data: any) => {
    // await new Promise(res => setTimeout(res, 2000))
    return context.createTask(data)
  }

  return (
    <div className={styles.TaskCreate}>
      <Title level="h3">Create New Job</Title>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={{ name: '', priority: '' }}>
        <div className={styles.formInline}>
          <div>
            <Input
              name="name"
              label="Job Name"
              placeholder="Write an alphanumeric task description in here ..."
              data-testid="create.name"
            />
          </div>
          <div>
            <Select
              name="priority"
              label="Job Priority"
              options={[{ label: 'Choose', value: '' }, ...priorities]}
              data-testid="create.priority"
            />
          </div>
          <div>
            <label>&nbsp;</label>
            <Submit data-testid="create.submit"> + Create</Submit>
          </div>
        </div>
      </Form>
    </div>
  )
}
