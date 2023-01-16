import React from 'react';
import { render, screen } from '@testing-library/react';
import {TaskList} from './TaskList';
import {ITask} from "../../../types/Task";
import {Task} from "../Task/Task";
import userEvent from "@testing-library/user-event";

test('check filter', () => {
  render(<TaskList />);
  const item = screen.getByTestId('filter');
  expect(item).toBeInTheDocument();
});

