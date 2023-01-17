import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Todo } from './Todo'

beforeAll(() => {
  localStorage.setItem(
    'todo',
    JSON.stringify([
      {
        id: '1',
        name: 'task 1',
        priority: 'urgent',
      },
    ])
  )
})
test('check create form', () => {
  render(<Todo />)
  const linkElement = screen.getByText(/Create New Job/i)
  expect(linkElement).toBeInTheDocument()
})

test('check job list', () => {
  render(<Todo />)
  const linkElement = screen.getByText(/Job List/i)
  expect(linkElement).toBeInTheDocument()
})

test('create, sort, filter and delete task', async () => {
  render(
    <div id="root">
      <Todo />
    </div>
  )

  await waitFor(() =>
    expect(screen.getAllByTestId('task.name')[0].innerHTML).toBe('task 1')
  )

  const data = {
    name: '0 unique task',
    priority: 'regular',
  }

  // create
  const name = screen.getByTestId('create.name')
  const priority = screen.getByTestId('create.priority')
  fireEvent.change(name, { target: { value: data.name } })
  fireEvent.change(priority, { target: { value: data.priority } })
  fireEvent.click(screen.getByTestId('create.submit'))
  await screen.findByText(data.name)
  const task = screen.getByText(data.name)
  expect(task).toBeInTheDocument()

  fireEvent.change(name, { target: { value: data.name } })
  fireEvent.change(priority, { target: { value: data.priority } })
  fireEvent.click(screen.getByTestId('create.submit'))
  await screen.findByText(data.name)

  // filter
  fireEvent.change(screen.getByTestId('filter.name'), {
    target: { value: data.name },
  })
  expect(screen.getAllByText(data.name).length).toBe(1)

  fireEvent.change(screen.getByTestId('filter.name'), { target: { value: '' } })
  fireEvent.change(screen.getByTestId('filter.priority'), {
    target: { value: data.priority },
  })
  expect(screen.getAllByText(data.name).length).toBe(1)
  fireEvent.change(screen.getByTestId('filter.priority'), {
    target: { value: '' },
  })

  // sort
  fireEvent.click(screen.getByTestId('sort.name'))
  await waitFor(() =>
    expect(screen.getAllByTestId('task.name')[0].innerHTML).toBe(data.name)
  )

  // delete
  fireEvent.click(screen.getAllByTestId('task.delete')[0])
  await screen.findByTestId('confirmation')
  fireEvent.click(screen.getByTestId('confirmation.confirm'))
  await waitFor(() =>
    expect(screen.getAllByTestId('task.name')[0].innerHTML).not.toBe(data.name)
  )
})
