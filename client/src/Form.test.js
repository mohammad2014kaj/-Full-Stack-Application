import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form component tests', () => {
  test('renders form fields correctly', () => {
    render(<Form />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    // ... other fields ...
  });

  test('submits the form with valid data', () => {
    render(<Form />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    // ... other field changes ...

    fireEvent.click(screen.getByText('Submit'));

  });
});