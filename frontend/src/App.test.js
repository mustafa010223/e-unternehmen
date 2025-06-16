import { render, screen } from '@testing-library/react'; // 'act' importu kaldırıldı
import App from './App';

// İlk test: Uygulamanın ana başlığının doğru şekilde render edildiğini kontrol eder.
test('renders the main heading', () => {
  // render metodu artık içsel olarak act'ı yönettiği için manuel sarmalamaya gerek yok
  render(<App />);

  // Başlığı role'üne göre bulmaya çalışıyoruz.
  const headingElement = screen.getByRole('heading', { name: /Mustafa'nın Mağazası/i });
  expect(headingElement).toBeInTheDocument();
});

// İkinci test: App bileşeninin herhangi bir çökme olmadan render edildiğini kontrol eder.
test('App component renders without crashing', () => {
  // render metodu artık içsel olarak act'ı yönettiği için manuel sarmalamaya gerek yok
  render(<App />);

  // Uygulamanın başarıyla render edildiğini doğrulamak için 'Ürünlerimiz' başlığını arayın.
  const productHeading = screen.getByRole('heading', { name: /Ürünlerimiz/i });
  expect(productHeading).toBeInTheDocument();
});