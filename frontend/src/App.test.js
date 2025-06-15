import { render, screen } from '@testing-library/react';
// Daha önce `act` uyarıları için eklemiştik, ancak Testing Library'nin `render` fonksiyonu zaten dahili olarak `act` kullanır.
// Bu nedenle, gereksiz `act` importunu ve kullanımlarını kaldırabiliriz.
// import { act } from 'react'; // Bu satırı kaldırıyoruz

import App from './App';

// İlk test: Uygulamanın ana başlığının doğru şekilde render edildiğini kontrol eder.
test('renders the main heading', () => {
  // `act` uyarıları için render işlemini `act` içine almıştık,
  // ancak Testing Library'nin `render` fonksiyonu zaten gerekli `act` sarmalamasını yapar.
  // Bu nedenle, gereksiz `act` sarmalayıcısını kaldırıyoruz.
  render(<App />); // `act` sarmalayıcısını kaldırdık

  // Ekranda "Mustafa'nın Mağazası" metnini içeren elementi arıyoruz.
  // RegEx (/Mustafa'nın Mağazası/i) büyük/küçük harf duyarlılığı olmadan arama yapar.
  const headingElement = screen.getByText(/Mustafa'nın Mağazası/i);
  expect(headingElement).toBeInTheDocument();
});

// İkinci test: App bileşeninin herhangi bir çökme olmadan render edildiğini kontrol eder.
test('App component renders without crashing', () => {
  // Burada da gereksiz `act` sarmalayıcısını kaldırıyoruz.
  render(<App />); // `act` sarmalayıcısını kaldırdık

  // Uygulamanın başarıyla render edildiğini doğrulamak için 'Ürünlerimiz' başlığını arayın.
  const productHeading = screen.getByText(/Ürünlerimiz/i);
  expect(productHeading).toBeInTheDocument();
});
