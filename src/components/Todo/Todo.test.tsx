import React from 'react';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import {Todo} from './Todo';
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;
import userEvent from "@testing-library/user-event";

test('check create form', () => {
  render(<Todo />);
  const linkElement = screen.getByText(/Create New Job/i);
  expect(linkElement).toBeInTheDocument();
});

test('check job list', () => {
  render(<Todo />);
  const linkElement = screen.getByText(/Job List/i);
  expect(linkElement).toBeInTheDocument();
});

test('create, sort, filter and delete task', async () => {
  render(<div id="root"><Todo /></div>);
  const data = {
    name: '0 unique task',
    priority: 'regular',
  }

  // create
  const name = screen.getByTestId('create.name')
  const priority = screen.getByTestId('create.priority')
  fireEvent.change(name, {target:{value:data.name}});
  fireEvent.change(priority, {target:{value:data.priority}});
  fireEvent.click(screen.getByTestId('create.submit'));
  await screen.findByText(data.name)
  const task = screen.getByText(data.name);
  expect(task).toBeInTheDocument();

  // filter
  fireEvent.change(screen.getByTestId('filter.name'),
      {target:{value:data.name}});
  expect(screen.getAllByText(data.name).length).toBe(1);

  fireEvent.change(screen.getByTestId('filter.name'),
      {target:{value:''}});
  fireEvent.change(screen.getByTestId('filter.priority'),
      {target:{value:data.priority}});
  expect(screen.getAllByText(data.name).length).toBe(1);

  // sort
  fireEvent.click(screen.getByTestId('sort.name'));
  await waitFor(() => expect(screen.getAllByTestId('task.name')[0].innerHTML).toBe(data.name));

  // delete
  console.log('delete',screen.getByTitle(/delete/i))
  userEvent.click(screen.getByTitle(/delete/i));
  await screen.findByTestId('confirmation')
  fireEvent.click(screen.getAllByText(/delete/i)[0]);
  await waitFor(() => expect(screen.getAllByTestId('task.name')[0].innerHTML).not.toBe(data.name));

});

