import { render, screen, act } from '@testing-library/react'; // 'act' buraya eklendi
import App from './App';

// İlk test: Uygulamanın ana başlığının doğru şekilde render edildiğini kontrol eder.
test('renders the main heading', () => {
  // `act` ile sarmalayarak, React'in durum güncellemelerinin tamamlandığından emin oluruz.
  // Bu, özellikle asenkron işlemler veya zamanlayıcılar içeren testlerde önemlidir.
  act(() => {
    render(<App />);
  });

  // Başlığı role'üne göre bulmaya çalışıyoruz.
  // `level: 1` tipik olarak `<h1>` elementleri içindir.
  const headingElement = screen.getByRole('heading', { name: /Mustafa'nın Mağazası/i });
  expect(headingElement).toBeInTheDocument();
});

// İkinci test: App bileşeninin herhangi bir çökme olmadan render edildiğini kontrol eder.
test('App component renders without crashing', () => {
  // Yine `act` ile sarmalayarak render işleminin tamamen bitmesini bekliyoruz.
  act(() => {
    render(<App />);
  });

  // Uygulamanın başarıyla render edildiğini doğrulamak için 'Ürünlerimiz' başlığını arayın.
  // Bu da bir başlık olduğu için 'heading' role'ünü kullanabiliriz.
  const productHeading = screen.getByRole('heading', { name: /Ürünlerimiz/i });
  expect(productHeading).toBeInTheDocument();
});