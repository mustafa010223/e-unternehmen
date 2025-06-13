import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  // Ekranda "Merhaba K3s CI/CD!" metnini içeren elementi arıyoruz.
  const headingElement = screen.getByText(/Merhaba K3s CI\/CD/i);
  expect(headingElement).toBeInTheDocument();
});

test('App component renders without crashing', () => {
  render(<App />);
  expect(screen).toBeDefined();
});