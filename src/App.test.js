import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the todo app and allows users to add tasks', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText(/add new todo/i);
  const submitButton = getByText(/submit/i);

  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(submitButton);

  const taskText = getByText('New Task');
  expect(taskText).toBeInTheDocument();
});

test('allows users to mark tasks as complete', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText(/add new todo/i);
  const submitButton = getByText(/submit/i);

  fireEvent.change(inputElement, { target: { value: 'Complete Task' } });
  fireEvent.click(submitButton);

  const completeButton = getByText(/✓/);
  fireEvent.click(completeButton);

  const todoItem = getByText('Complete Task').closest('.todo-item');
  expect(todoItem).toHaveClass('completed');
});

test('allows users to delete tasks', () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  const inputElement = getByPlaceholderText(/add new todo/i);
  const submitButton = getByText(/submit/i);

  fireEvent.change(inputElement, { target: { value: 'Task to be deleted' } });
  fireEvent.click(submitButton);

  const deleteButton = getByText(/✕/);
  fireEvent.click(deleteButton);

  const taskText = queryByText('Task to be deleted');
  expect(taskText).not.toBeInTheDocument();
});
