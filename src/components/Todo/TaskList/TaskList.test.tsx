import React from 'react'
import { render, screen } from '@testing-library/react'
import { TaskList } from './TaskList'

test('check filter', () => {
  render(<TaskList />)
  const item = screen.getByTestId('filter')
  expect(item).toBeInTheDocument()
})
