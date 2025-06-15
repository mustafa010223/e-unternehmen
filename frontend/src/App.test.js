import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  // Ekranda "Mustafa'nın Mağazası" metnini içeren elementi arıyoruz.
  const headingElement = screen.getByText(/Merhaba K3s CI\/CD/i);
  expect(headingElement).toBeInTheDocument();
});

test('App component renders without crashing', () => {
  render(<App />);
  expect(screen).toBeDefined();
});
