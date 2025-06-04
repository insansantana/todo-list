import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const header = screen.getByText(/TO DO LIST APP/i);
  expect(header).toBeInTheDocument();
});
