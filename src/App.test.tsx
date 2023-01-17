import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('Todo app on the screen', () => {
  render(<App />)
  const todo = screen.getByTestId('todo')
  expect(todo).toBeInTheDocument()
})
