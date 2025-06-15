import React, { useState, createContext, useContext, useEffect } from 'react';

// Context API for managing cart and user state
const AppContext = createContext();

// --- Main App Component ---
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // { email: string, token: string }
  const [currentPage, setCurrentPage] = useState('home'); // Simple routing
  const [message, setMessage] = useState(''); // Global message for user feedback

  // Mock product data (replace with API call in a real app)
  useEffect(() => {
    // Simulate fetching products from a backend
    const fetchProducts = async () => {
      // In a real app, you would fetch from your backend API
      const mockProducts = [
        { id: 'p1', name: 'Kablosuz Kulaklık', price: 1299.99, image: 'https://placehold.co/400x300/a3e635/16a34a?text=Kulakl%C4%B1k' },
        { id: 'p2', name: 'Akıllı Saat', price: 1899.99, image: 'https://placehold.co/400x300/fde047/a16207?text=Ak%C4%B1ll%C4%B1%20Saat' },
        { id: 'p3', name: 'Mekanik Klavye', price: 799.99, image: 'https://placehold.co/400x300/fbcfe8/be185d?text=Klavye' },
        { id: 'p4', name: 'Dizüstü Bilgisayar', price: 15499.99, image: 'https://placehold.co/400x300/bfdbfe/1d4ed8?text=Diz%C3%BCst%C3%BC%20Bilgisayar' },
        { id: 'p5', name: 'Web Kamerası', price: 499.99, image: 'https://placehold.co/400x300/d8b4fe/7e22ce?text=Web%20Kameras%C4%B1' },
      ];
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setMessage(`${product.name} sepete eklendi!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setMessage('Ürün sepetten çıkarıldı.');
    setTimeout(() => setMessage(''), 2000);
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRegister = (email, password) => {
    // Simulate API call for registration
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { email, token: 'mock_token_123' }; // Mock token
        setUser(newUser);
        setMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
        setTimeout(() => setMessage(''), 3000);
        setCurrentPage('home');
        resolve({ success: true, user: newUser });
      }, 1000);
    });
  };

  const handleLogin = (email, password) => {
    // Simulate API call for login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.email === email) { // Simple mock login check
          setMessage('Giriş başarılı!');
          setTimeout(() => setMessage(''), 3000);
          setCurrentPage('home');
          resolve({ success: true, user });
        } else {
          setMessage('Geçersiz e-posta veya şifre.');
          setTimeout(() => setMessage(''), 3000);
          reject({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setMessage('Çıkış yapıldı.');
    setTimeout(() => setMessage(''), 2000);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <ProductList products={products} addToCart={addToCart} />;
      case 'cart':
        return <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />;
      case 'register':
        return <Registration handleRegister={handleRegister} />;
      case 'login':
        return <Login handleLogin={handleLogin} />;
      default:
        return <ProductList products={products} addToCart={addToCart} />;
    }
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, user, handleLogin, handleRegister, handleLogout, setCurrentPage }}>
      <div className="min-h-screen bg-gray-900 text-white font-inter">
        <header className="bg-gray-800 shadow-lg py-4 px-6 flex justify-between items-center rounded-b-xl">
          <h1 className="text-3xl font-bold text-green-400 cursor-pointer" onClick={() => setCurrentPage('home')}>
            Mustafa'nın Mağazası
          </h1>
          <nav className="flex space-x-6">
            <NavItem onClick={() => setCurrentPage('home')}>Ürünler</NavItem>
            <NavItem onClick={() => setCurrentPage('cart')}>
              Sepet ({cart.reduce((total, item) => total + item.quantity, 0)})
            </NavItem>
            {user ? (
              <NavItem onClick={handleLogout}>Çıkış Yap ({user.email})</NavItem>
            ) : (
              <>
                <NavItem onClick={() => setCurrentPage('login')}>Giriş Yap</NavItem>
                <NavItem onClick={() => setCurrentPage('register')}>Kayıt Ol</NavItem>
              </>
            )}
          </nav>
        </header>

        {message && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce">
            {message}
          </div>
        )}

        <main className="container mx-auto p-6">
          {renderPage()}
        </main>

        <footer className="bg-gray-800 py-4 px-6 text-center text-gray-400 mt-8 rounded-t-xl">
          &copy; 2025 Mustafa'nın Mağazası. Tüm hakları saklıdır.
        </footer>
      </div>
    </AppContext.Provider>
  );
};

// --- NavItem Component ---
const NavItem = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-lg font-medium text-gray-300 hover:text-green-300 transition duration-300 ease-in-out px-4 py-2 rounded-lg hover:bg-gray-700"
  >
    {children}
  </button>
);

// --- ProductList Component ---
const ProductList = ({ products, addToCart }) => (
  <section className="py-8">
    <h2 className="text-4xl font-extrabold text-center text-green-300 mb-10">Ürünlerimiz</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  </section>
);

// --- ProductCard Component ---
const ProductCard = ({ product, addToCart }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out p-6 flex flex-col items-center">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover mb-4 rounded-lg border border-gray-700"
      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/4b5563/ffffff?text=${encodeURIComponent(product.name)}`; }}
    />
    <h3 className="text-2xl font-semibold text-green-200 mb-2 text-center">{product.name}</h3>
    <p className="text-xl font-bold text-yellow-300 mb-4">{product.price.toFixed(2)} TL</p>
    <button
      onClick={() => addToCart(product)}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
    >
      Sepete Ekle
    </button>
  </div>
);

// --- Cart Component ---
const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="py-8">
      <h2 className="text-4xl font-extrabold text-center text-green-300 mb-10">Sepetiniz</h2>
      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-400">Sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-700 py-4 last:border-b-0">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-xl font-semibold text-green-200">{item.name}</h3>
                  <p className="text-lg text-gray-400">{item.price.toFixed(2)} TL</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20 p-2 text-center bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-3xl font-bold text-yellow-300 mt-8 pt-4 border-t border-gray-700">
            Toplam: {total.toFixed(2)} TL
          </div>
          <div className="text-right mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95">
              Ödeme Yap
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// --- Registration Component ---
const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleRegister, setCurrentPage } = useContext(AppContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    try {
      await handleRegister(email, password);
      // Success message handled by App component
    } catch (err) {
      setError('Kayıt başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <section className="py-8 max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-center text-green-300 mb-8">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-lg font-bold mb-2" htmlFor="email">
            E-posta
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700"
            placeholder="eposta@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-lg font-bold mb-2" htmlFor="password">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-200 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700"
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm italic">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
          >
            Kayıt Ol
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="inline-block align-baseline font-bold text-lg text-green-400 hover:text-green-300"
          >
            Hesabınız var mı? Giriş yapın
          </button>
        </div>
      </form>
    </section>
  );
};

// --- Login Component ---
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, setCurrentPage } = useContext(AppContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    try {
      await handleLogin(email, password);
      // Success message handled by App component
    } catch (err) {
      setError('Giriş başarısız oldu. Geçersiz e-posta veya şifre.');
    }
  };

  return (
    <section className="py-8 max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-center text-green-300 mb-8">Giriş Yap</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-lg font-bold mb-2" htmlFor="login-email">
            E-posta
          </label>
          <input
            type="email"
            id="login-email"
            className="shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700"
            placeholder="eposta@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-lg font-bold mb-2" htmlFor="login-password">
            Şifre
          </label>
          <input
            type="password"
            id="login-password"
            className="shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-200 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700"
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm italic">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95"
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('register')}
            className="inline-block align-baseline font-bold text-lg text-green-400 hover:text-green-300"
          >
            Hesabınız yok mu? Kayıt olun
          </button>
        </div>
      </form>
    </section>
  );
};

export default App;
