import { render, screen } from '@testing-library/react';
// act fonksiyonunu react-dom/test-utils yerine 'react'tan import edin
import { act } from 'react'; // Yeni import

import App from './App';

// İlk test: Uygulamanın ana başlığının doğru şekilde render edildiğini kontrol eder.
test('renders the main heading', () => {
  // `act` uyarıları için render işlemini `act` içine alın.
  act(() => {
    render(<App />);
  });

  // Ekranda "Mustafa'nın Mağazası" metnini içeren elementi arıyoruz.
  // RegEx (/Mustafa'nın Mağazası/i) büyük/küçük harf duyarlılığı olmadan arama yapar.
  const headingElement = screen.getByText(/Mustafa'nın Mağazası/i);
  expect(headingElement).toBeInTheDocument();
});

// İkinci test: App bileşeninin herhangi bir çökme olmadan render edildiğini kontrol eder.
test('App component renders without crashing', () => {
  act(() => {
    render(<App />);
  });
  // Uygulamanın başarıyla render edildiğini doğrulamak için 'Ürünlerimiz' başlığını arayın.
  const productHeading = screen.getByText(/Ürünlerimiz/i);
  expect(productHeading).toBeInTheDocument();
});
