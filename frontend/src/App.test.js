import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a placeholder text', () => {
  render(<App />);
  // Uygulamanızda bulunan bir metni arayın. Örn: "Learn React" veya bir başlık.
  // Biz şimdilik örnek bir metin ekleyelim. App.js'e bu metni eklediğinizden emin olun.
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});

test('App component renders without crashing', () => {
  render(<App />);
  // Sadece render olup olmadığına dair basit bir test bile çok değerlidir.
  expect(screen).toBeDefined();
});