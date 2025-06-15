import { render, screen } from '@testing-library/react';
import App from './App';

// İlk test: Uygulamanın ana başlığının doğru şekilde render edildiğini kontrol eder.
test('renders the main heading', () => {
  render(<App />);

  // Başlığı role'üne göre bulmaya çalışıyoruz.
  // Daha önce sadece metinle arama yapıyorduk, bu da bazen kırılgan olabiliyordu.
  // `level: 1` tipik olarak `<h1>` elementleri içindir.
  const headingElement = screen.getByRole('heading', { name: /Mustafa'nın Mağazası/i });
  expect(headingElement).toBeInTheDocument();
});

// İkinci test: App bileşeninin herhangi bir çökme olmadan render edildiğini kontrol eder.
test('App component renders without crashing', () => {
  render(<App />);

  // Uygulamanın başarıyla render edildiğini doğrulamak için 'Ürünlerimiz' başlığını arayın.
  // Bu da bir başlık olduğu için 'heading' role'ünü kullanabiliriz.
  const productHeading = screen.getByRole('heading', { name: /Ürünlerimiz/i });
  expect(productHeading).toBeInTheDocument();
});