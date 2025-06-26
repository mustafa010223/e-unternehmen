import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main brand link', () => {
  render(<App />);
  const brandLinkElement = screen.getByRole('link', { name: /Cloud DevOps Lösungen/i });
  expect(brandLinkElement).toBeInTheDocument();
});

test('App component renders without crashing and displays Home page content', () => {
  render(<App />);
  const homeHeading = screen.getByRole('heading', { name: /Ihre Zukunft in der Cloud beginnt hier/i });
  expect(homeHeading).toBeInTheDocument();
});