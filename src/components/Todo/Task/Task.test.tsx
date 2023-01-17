import React from 'react'
import { render, screen } from '@testing-library/react'
import { Task } from './Task'
import { ITask } from 'types/Task'

test('task loads', () => {
  const data: ITask = { id: '123', name: 'task title', priority: 'urgent' }
  render(
    <table>
      <tbody>
        <Task data={data} onAction={() => null} />
      </tbody>
    </table>
  )
  const name = screen.getByText(data.name)
  expect(name).toBeInTheDocument()

  const badge = screen.getByText(data.priority)
  expect(badge).toBeInTheDocument()
})
