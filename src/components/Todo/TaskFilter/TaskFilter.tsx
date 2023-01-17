import { FormEventHandler } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Form, Input, Select } from 'components/Form'
import { priorities } from '../TodoContext'
import styles from './TaskFilter.module.scss'

export const TaskFilter = ({
  handleFilter,
}: {
  handleFilter: FormEventHandler<HTMLFormElement> & SubmitHandler<any>
}) => (
  <Form
    onChange={handleFilter}
    data-testid="filter"
    className={styles.TaskFilter}>
    <div className={styles.formInline}>
      <div>
        <Input name="name" placeholder="Job Name" data-testid="filter.name" />
      </div>
      <div>
        <Select
          name="priority"
          options={[{ label: 'Priority (all)', value: '' }, ...priorities]}
          data-testid="filter.priority"
        />
      </div>
    </div>
  </Form>
)
