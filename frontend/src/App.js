import React, { useState, createContext, useContext, useEffect } from 'react';

// Tailwind CSS'i kullanabilmek için bu script'i head etiketine eklemeniz gerekir:
// <script src="https://cdn.tailwindcss.com"></script>
// Ayrıca, Inter fontunu kullanmak için CSS dosyanıza ekleyebilirsiniz:
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
// body { font-family: 'Inter', sans-serif; }

// Context API for managing cart and user state
const AppContext = createContext();

// --- Main App Component ---
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // { email: string, token: string }
  const [currentPage, setCurrentPage] = useState('home'); // Simple routing
  const [message, setMessage] = useState(''); // Global message for user feedback
  const [showMessage, setShowMessage] = useState(false); // State to control message visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
  const [showQuickViewModal, setShowQuickViewModal] = useState(false); // State for Quick View Modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store product for Quick View Modal
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected main category
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // State for selected sub-category

  // Mock product data (replace with API call in a real app)
  useEffect(() => {
    // Simulate fetching products from a backend
    const fetchProducts = async () => {
      const mockProducts = [
        { id: 'p1', name: 'Kablosuz Kulaklık', price: 1299.99, image: 'https://placehold.co/400x300/a3e635/16a34a?text=Kulakl%C4%B1k', isNew: true, category: 'Elektronik', subCategory: 'Kulaklıklar', description: 'Yüksek ses kalitesi ve konforlu kullanım sunan kablosuz kulaklık.' },
        { id: 'p2', name: 'Akıllı Saat', price: 1899.99, image: 'https://placehold.co/400x300/fde047/a16207?text=Ak%C4%B1ll%C4%B1%20Saat', isNew: false, category: 'Elektronik', subCategory: 'Giyilebilir Teknoloji', description: 'Adım sayar, kalp atış hızı takibi ve bildirim özellikleri ile hayatınızı kolaylaştırın.' },
        { id: 'p3', name: 'Mekanik Klavye', price: 799.99, image: 'https://placehold.co/400x300/fbcfe8/be185d?text=Klavye', isNew: true, category: 'Elektronik', subCategory: 'Bilgisayar Bileşenleri', description: 'Oyun ve yazım için ideal, dayanıklı mekanik klavye.' },
        { id: 'p4', name: 'Dizüstü Bilgisayar', price: 15499.99, image: 'https://placehold.co/400x300/bfdbfe/1d4ed8?text=Diz%C3%BCst%C3%BC%20Bilgisayar', isNew: false, category: 'Elektronik', subCategory: 'Bilgisayarlar', description: 'Yüksek performanslı işlemci ve geniş depolama alanı ile her işinize yetişir.' },
        { id: 'p5', name: 'Web Kamerası', price: 499.99, image: 'https://placehold.co/400x300/d8b4fe/7e22ce?text=Web%20Kameras%C4%B1', isNew: false, category: 'Elektronik', subCategory: 'Bilgisayar Bileşenleri', description: 'Full HD görüntü kalitesi ile online toplantılarınızı ve yayınlarınızı iyileştirin.' },
        { id: 'p6', name: 'Buzdolabı', price: 12000.00, image: 'https://placehold.co/400x300/add8e6/00008b?text=Buzdolab%C4%B1', isNew: true, category: 'Beyaz Eşya', subCategory: 'Buzdolapları', description: 'Geniş iç hacim ve enerji verimliliği ile yiyeceklerinizi taze tutun.' },
        { id: 'p7', name: 'Çamaşır Makinesi', price: 8500.00, image: 'https://placehold.co/400x300/ffb6c1/800000?text=%C3%87ama%C5%9F%C4%B1r%20Makinesi', isNew: false, category: 'Beyaz Eşya', subCategory: 'Çamaşır Makineleri', description: 'Farklı yıkama programları ve hızlı yıkama özelliği ile kıyafetleriniz tertemiz.' },
        { id: 'p8', name: 'Kahve Makinesi', price: 950.00, image: 'https://placehold.co/400x300/ffe4b5/a0522d?text=Kahve%20Makinesi', isNew: true, category: 'Ev ve Yaşam', subCategory: 'Küçük Ev Aletleri', description: 'Günün her saati taze ve lezzetli kahve keyfi.' },
        { id: 'p9', name: 'Robot Süpürge', price: 4200.00, image: 'https://placehold.co/400x300/c2c2c2/36454f?text=Robot%20S%C3%BCp%C3%BCrge', isNew: false, category: 'Ev ve Yaşam', subCategory: 'Temizlik Aletleri', description: 'Akıllı navigasyon ve güçlü çekim ile evinizi kolayca temizleyin.' },
        { id: 'p10', name: 'Ultra HD Televizyon', price: 18000.00, image: 'https://placehold.co/400x300/87ceeb/000080?text=TV', isNew: true, category: 'Elektronik', subCategory: 'Televizyonlar', description: 'Canlı renkler ve keskin detaylarla sinema keyfini evinize taşıyın.' },
      ];
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  // Define categories and subcategories
  const categories = {
    'Elektronik': ['Bilgisayarlar', 'Kulaklıklar', 'Giyilebilir Teknoloji', 'Bilgisayar Bileşenleri', 'Televizyonlar'],
    'Beyaz Eşya': ['Buzdolapları', 'Çamaşır Makineleri', 'Bulaşık Makineleri'],
    'Ev ve Yaşam': ['Küçük Ev Aletleri', 'Mutfak Ürünleri', 'Temizlik Aletleri']
  };

  // Mock campaign data
  const mockCampaigns = [
    {
      id: 'c1',
      title: 'Yaz Fırsatları Başladı!',
      description: 'Elektronik ürünlerde %20\'ye varan indirimler sizleri bekliyor. Bu yaz teknolojiyi yakalayın!',
      image: 'https://placehold.co/600x400/ffe0b2/e65100?text=Yaz+F%C4%B1rsatlar%C4%B1',
      link: '#'
    },
    {
      id: 'c2',
      title: 'Beyaz Eşya Günleri',
      description: 'Tüm beyaz eşyalarda ücretsiz kurulum ve ek garanti fırsatları ile evinizi yenileyin.',
      image: 'https://placehold.co/600x400/bbdefb/1565c0?text=Beyaz+E%C5%9Fya',
      link: '#'
    },
    {
      id: 'c3',
      title: 'Okula Dönüş Kampanyası',
      description: 'Öğrencilere özel laptop ve tabletlerde %15 indirim! Okul ihtiyaçlarınız için hemen göz atın.',
      image: 'https://placehold.co/600x400/dcedc8/33691e?text=Okul+Kampanyas%C4%B1',
      link: '#'
    }
  ];


  // Filtered products based on search term, category and subcategory
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? product.subCategory === selectedSubCategory : true;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  // Function to show messages with a timeout
  const showTimedMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage(''); // Clear message after fading out
    }, 2800); // Increased timeout for better visibility and animation
  };

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
    showTimedMessage(`${product.name} sepete eklendi!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showTimedMessage('Ürün sepetten çıkarıldı.');
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
        showTimedMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
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
          showTimedMessage('Giriş başarılı!');
          setCurrentPage('home');
          resolve({ success: true, user });
        } else {
          showTimedMessage('Geçersiz e-posta veya şifre.');
          reject({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    showTimedMessage('Çıkış yapıldı.');
    setCurrentPage('home');
  };

  // Functions for Quick View Modal
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickViewModal(true);
  };

  const closeQuickView = () => {
    setShowQuickViewModal(false);
    setSelectedProduct(null);
  };

  // Payment process simulation
  const processPayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        showTimedMessage('Ödeme başarıyla tamamlandı!');
        setCart([]); // Clear cart after successful payment
        setCurrentPage('orderConfirmation');
        resolve({ success: true });
      }, 2000);
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <ProductList products={filteredProducts} addToCart={addToCart} openQuickView={openQuickView} />;
      case 'cart':
        return <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} setCurrentPage={setCurrentPage} />;
      case 'payment':
        return <PaymentPage processPayment={processPayment} setCurrentPage={setCurrentPage} cartTotal={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} />;
      case 'orderConfirmation':
        return <OrderConfirmationPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Registration handleRegister={handleRegister} />;
      case 'login':
        return <Login handleLogin={handleLogin} />;
      case 'campaigns':
        return <CampaignsPage campaigns={mockCampaigns} />;
      default:
        return <ProductList products={filteredProducts} addToCart={addToCart} openQuickView={openQuickView} />;
    }
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, user, handleLogin, handleRegister, handleLogout, setCurrentPage }}>
      <div className="min-h-screen bg-gray-900 text-white font-inter flex flex-col">
        <header className="bg-gray-800 shadow-2xl py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-b-3xl border-b-2 border-green-700 z-10 sticky top-0 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-400 cursor-pointer mb-4 md:mb-0 transform hover:scale-105 transition duration-300 drop-shadow-lg" onClick={() => { setCurrentPage('home'); setSelectedCategory(null); setSelectedSubCategory(null); }}>
            Mustafa'nın Mağazası
          </h1>
          <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Ürün Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center space-x-2 md:space-x-6">
            <NavItem onClick={() => { setCurrentPage('home'); setSelectedCategory(null); setSelectedSubCategory(null); }}>Ürünler</NavItem>
            <NavItem onClick={() => setCurrentPage('campaigns')}>Kampanyalar</NavItem> {/* New Nav Item */}
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

        {/* Global Message Display */}
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-2xl z-50 transition-all duration-700 ease-in-out transform 
                         ${showMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-20 scale-90'}
                         ${message.includes('başarılı') || message.includes('eklendi') ? 'bg-gradient-to-r from-green-600 to-green-800' : 'bg-gradient-to-r from-red-600 to-red-800'}
                         border border-gray-700`}>
          <p className="text-white text-lg font-semibold text-center">{message}</p>
        </div>

        <main className="container mx-auto p-6 flex-grow flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Category Navigation Sidebar */}
          {currentPage === 'home' && ( // Only show categories on home page
            <CategoryNavigation
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          )}
          
          <div className="flex-grow">
            {renderPage()}
          </div>
        </main>

        <footer className="bg-gray-800 py-6 px-6 text-center text-gray-400 mt-12 rounded-t-3xl shadow-2xl border-t-2 border-green-700">
          <p className="text-sm md:text-base">&copy; 2025 Mustafa'nın Mağazası. Tüm hakları saklıdır.</p>
          <p className="text-xs md:text-sm mt-1">Geliştirici: Mustafa (DevOps Mühendisi)</p>
        </footer>

        {showQuickViewModal && selectedProduct && (
          <QuickViewModal product={selectedProduct} onClose={closeQuickView} addToCart={addToCart} />
        )}
      </div>
    </AppContext.Provider>
  );
};

// --- NavItem Component ---
const NavItem = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="relative text-base md:text-lg font-medium text-gray-300 py-2 px-3 md:px-4 rounded-xl transition-all duration-300 ease-in-out
               hover:text-green-300 hover:bg-gray-700 active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800
               transform hover:scale-105 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-green-400 before:rounded-full before:transition-all before:duration-300 hover:before:w-2/3"
  >
    {children}
  </button>
);

// --- CategoryNavigation Component ---
const CategoryNavigation = ({ categories, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory }) => {
  return (
    <aside className="w-full lg:w-64 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex-shrink-0">
      <h3 className="text-2xl font-bold text-green-300 mb-6 pb-2 border-b border-gray-700">Kategoriler</h3>
      <ul className="space-y-4">
        <li className="mb-2">
          <button
            onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}
            className={`block w-full text-left text-lg font-semibold rounded-lg py-2 px-3 transition duration-200
                       ${!selectedCategory ? 'bg-green-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-green-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            Tüm Ürünler
          </button>
        </li>
        {Object.entries(categories).map(([categoryName, subCategories]) => (
          <li key={categoryName} className="mb-4">
            <button
              onClick={() => { setSelectedCategory(categoryName); setSelectedSubCategory(null); }}
              className={`block w-full text-left text-xl font-bold rounded-lg py-2 px-3 transition duration-200
                         ${selectedCategory === categoryName ? 'bg-green-600 text-white shadow-md' : 'text-green-300 hover:bg-gray-700 hover:text-green-200'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              {categoryName}
            </button>
            {selectedCategory === categoryName && (
              <ul className="ml-4 mt-2 space-y-2 border-l border-gray-600 pl-4">
                {subCategories.map((subCategoryName) => (
                  <li key={subCategoryName}>
                    <button
                      onClick={() => setSelectedSubCategory(subCategoryName)}
                      className={`block w-full text-left text-md rounded-lg py-2 px-3 transition duration-200
                                 ${selectedSubCategory === subCategoryName ? 'bg-gray-700 text-green-400 shadow-sm' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                      {subCategoryName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};


// --- ProductList Component ---
const ProductList = ({ products, addToCart, openQuickView }) => (
  <section className="py-8">
    <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-300 mb-10 tracking-wide drop-shadow-md">Ürünlerimiz</h2>
    {products.length === 0 ? (
        <p className="text-center text-xl text-gray-400">Aradığınız kriterlere uygun ürün bulunamadı.</p>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} openQuickView={openQuickView} />
            ))}
        </div>
    )}
  </section>
);

// --- ProductCard Component ---
const ProductCard = ({ product, addToCart, openQuickView }) => (
  <div className="group bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out p-6 flex flex-col items-center border border-gray-700 hover:border-green-500 relative">
    {product.isNew && (
      <span className="absolute top-4 left-4 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 animate-bounce-slow">
        YENİ ÜRÜN
      </span>
    )}
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover mb-4 rounded-xl border border-gray-700 shadow-md group-hover:brightness-90 transition-all duration-300"
      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/4b5563/ffffff?text=${encodeURIComponent(product.name)}`; }}
    />
    <h3 className="text-xl md:text-2xl font-semibold text-green-200 mb-2 text-center leading-tight">{product.name}</h3>
    <div className="flex items-center text-yellow-400 mb-2">
      {/* Star rating placeholder */}
      {'★'.repeat(Math.floor(Math.random() * 3) + 3)}{'☆'.repeat(5 - (Math.floor(Math.random() * 3) + 3))}
      <span className="text-sm text-gray-400 ml-2">(123 yorum)</span>
    </div>
    <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-4 drop-shadow-md">{product.price.toFixed(2)} TL</p>
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      Sepete Ekle
    </button>
    {/* Quick View overlay on hover */}
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
        <button
            onClick={(e) => { e.stopPropagation(); openQuickView(product); }} // Prevent add to cart when clicking quick view
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Hızlı Bakış
        </button>
    </div>
  </div>
);

// --- Cart Component ---
const Cart = ({ cart, removeFromCart, updateQuantity, setCurrentPage }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="py-8">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-300 mb-10 tracking-wide drop-shadow-md">Sepetiniz</h2>
      {cart.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
          <p className="text-xl md:text-2xl text-gray-400">Sepetinizde henüz ürün bulunmamaktadır.</p>
          <p className="text-md md:text-lg text-gray-500 mt-2">Hemen harika ürünlerimizi keşfedin!</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Alışverişe Başla
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 py-4 md:py-6 last:border-b-0">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-md border border-gray-600" />
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-green-200">{item.name}</h3>
                  <p className="text-lg md:text-xl text-gray-400">{item.price.toFixed(2)} TL</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="bg-gray-700 text-white font-bold py-2 px-3 rounded-md shadow-sm hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-2 text-center bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-700 text-white font-bold py-2 px-3 rounded-md shadow-sm hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 ml-4"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mt-8 pt-4 border-t border-gray-700 drop-shadow-md">
            Toplam: {total.toFixed(2)} TL
          </div>
          <div className="text-right mt-6">
            <button
              onClick={() => setCurrentPage('payment')}
              disabled={cart.length === 0}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ödeme Yap
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// --- PaymentPage Component ---
const PaymentPage = ({ processPayment, setCurrentPage, cartTotal }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: ''
  });

  const handleCardDetailChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async () => {
    setPaymentError('');
    if (!selectedPaymentMethod) {
      setPaymentError('Lütfen bir ödeme yöntemi seçin.');
      return;
    }

    if (selectedPaymentMethod === 'credit-card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        setPaymentError('Lütfen kart bilgilerinizi eksiksiz girin.');
        return;
      }
      // Basic mock validation for card details
      if (cardDetails.cardNumber.length < 16 || cardDetails.expiryDate.length < 5 || cardDetails.cvv.length < 3) {
        setPaymentError('Geçersiz kart bilgileri.');
        return;
      }
    }

    if (!billingAddress.firstName || !billingAddress.lastName || !billingAddress.address1 || !billingAddress.city || !billingAddress.postalCode) {
      setPaymentError('Lütfen fatura adresinizi eksiksiz doldurun.');
      return;
    }

    setIsProcessing(true);
    try {
      await processPayment();
    } catch (error) {
      setPaymentError('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-8 max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-300 mb-8 drop-shadow-md">Ödeme Sayfası</h2>
      
      <div className="mb-6 text-center">
        <p className="text-xl text-gray-300 font-semibold mb-4">Toplam Tutar: <span className="text-yellow-300 text-3xl">{cartTotal.toFixed(2)} TL</span></p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4 mb-8">
        <h3 className="text-2xl font-semibold text-gray-200 border-b border-gray-700 pb-2 mb-4">Ödeme Yöntemi Seçin</h3>
        {[
          { id: 'credit-card', name: 'Kredi / Banka Kartı', icon: '💳' },
          { id: 'paypal', name: 'PayPal', icon: '🅿️' },
          { id: 'eft', name: 'EFT / Havale', icon: '🏦' },
        ].map((method) => (
          <div key={method.id} className={`flex items-center p-4 rounded-lg shadow-sm cursor-pointer transition-colors duration-200
            ${selectedPaymentMethod === method.id ? 'bg-green-700 border-green-500' : 'bg-gray-700 hover:bg-gray-600 border-gray-600'} border-2`}>
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              checked={selectedPaymentMethod === method.id}
              onChange={() => setSelectedPaymentMethod(method.id)}
              className="form-radio h-5 w-5 text-green-500 border-gray-500 focus:ring-green-500 transition-colors duration-200"
            />
            <label htmlFor={method.id} className="ml-4 text-xl font-medium text-gray-100 cursor-pointer flex items-center">
              <span className="mr-2">{method.icon}</span> {method.name}
            </label>
          </div>
        ))}
      </div>

      {/* Credit Card Details (Conditional) */}
      {selectedPaymentMethod === 'credit-card' && (
        <div className="space-y-6 mb-8 bg-gray-700 p-6 rounded-lg shadow-inner border border-gray-600">
          <h3 className="text-2xl font-semibold text-gray-200 border-b border-gray-600 pb-2 mb-4">Kart Bilgileri</h3>
          <InputField
            label="Kart Numarası"
            id="cardNumber"
            name="cardNumber"
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailChange}
            required
            error={paymentError.includes('kart bilgileri') ? paymentError : ''}
          />
          <div className="flex space-x-4">
            <div className="w-1/2">
              <InputField
                label="Son Kullanma Tarihi (AA/YY)"
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="AA/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailChange}
                required
                error={paymentError.includes('kart bilgileri') ? paymentError : ''}
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="CVV"
                id="cvv"
                name="cvv"
                type="text"
                placeholder="XXX"
                value={cardDetails.cvv}
                onChange={handleCardDetailChange}
                required
                error={paymentError.includes('kart bilgileri') ? paymentError : ''}
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="space-y-6 mb-8 bg-gray-700 p-6 rounded-lg shadow-inner border border-gray-600">
        <h3 className="text-2xl font-semibold text-gray-200 border-b border-gray-600 pb-2 mb-4">Fatura Adresi</h3>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <InputField
              label="Ad"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Adınız"
              value={billingAddress.firstName}
              onChange={handleBillingAddressChange}
              required
              error={paymentError.includes('fatura adresinizi') ? paymentError : ''}
            />
          </div>
          <div className="w-1/2">
            <InputField
              label="Soyad"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Soyadınız"
              value={billingAddress.lastName}
              onChange={handleBillingAddressChange}
              required
              error={paymentError.includes('fatura adresinizi') ? paymentError : ''}
            />
          </div>
        </div>
        <InputField
          label="Adres 1"
          id="address1"
          name="address1"
          type="text"
          placeholder="Cadde, Sokak No"
          value={billingAddress.address1}
          onChange={handleBillingAddressChange}
          required
          error={paymentError.includes('fatura adresinizi') ? paymentError : ''}
        />
        <InputField
          label="Adres 2 (Opsiyonel)"
          id="address2"
          name="address2"
          type="text"
          placeholder="Bina, Apartman No, Daire"
          value={billingAddress.address2}
          onChange={handleBillingAddressChange}
        />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <InputField
              label="Şehir"
              id="city"
              name="city"
              type="text"
              placeholder="Şehriniz"
              value={billingAddress.city}
              onChange={handleBillingAddressChange}
              required
              error={paymentError.includes('fatura adresinizi') ? paymentError : ''}
            />
          </div>
          <div className="w-1/2">
            <InputField
              label="Posta Kodu"
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="XXXXX"
              value={billingAddress.postalCode}
              onChange={handleBillingAddressChange}
              required
              error={paymentError.includes('fatura adresinizi') ? paymentError : ''}
            />
          </div>
        </div>
      </div>

      {paymentError && <p className="text-red-500 text-sm italic mb-4 text-center">{paymentError}</p>}

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setCurrentPage('cart')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Geri Dön
        </button>
        <button
          onClick={handlePaymentSubmit}
          disabled={isProcessing}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'İşleniyor...' : 'Siparişi Tamamla'}
        </button>
      </div>
    </section>
  );
};

// --- CampaignsPage Component ---
const CampaignsPage = ({ campaigns }) => {
  return (
    <section className="py-8">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-300 mb-10 tracking-wide drop-shadow-md">Güncel Kampanyalar</h2>
      {campaigns.length === 0 ? (
        <p className="text-center text-xl text-gray-400">Şu anda aktif kampanya bulunmamaktadır.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </section>
  );
};

// --- CampaignCard Component ---
const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-700 hover:border-blue-500 flex flex-col">
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-48 object-cover rounded-t-xl border-b border-gray-700"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/4b5563/ffffff?text=${encodeURIComponent(campaign.title)}`; }}
      />
      <div className="p-6 flex flex-col justify-between flex-grow">
        <h3 className="text-2xl font-bold text-green-200 mb-3 leading-tight">{campaign.title}</h3>
        <p className="text-gray-300 text-base mb-4 flex-grow">{campaign.description}</p>
        <a
          href={campaign.link}
          className="inline-block self-start bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hemen İncele
        </a>
      </div>
    </div>
  );
};


// --- OrderConfirmationPage Component ---
const OrderConfirmationPage = ({ setCurrentPage }) => {
  return (
    <section className="py-8 max-w-xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-300 mb-6 drop-shadow-md">Siparişiniz Onaylandı!</h2>
      <svg className="mx-auto text-green-500 w-24 h-24 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p className="text-xl text-gray-300 mb-4">Teşekkür ederiz! Siparişiniz başarıyla alınmıştır.</p>
      <p className="text-md text-gray-400 mb-8">Sipariş detayları e-posta adresinize gönderilmiştir.</p>
      <button
        onClick={() => setCurrentPage('home')}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        Ana Sayfaya Dön
      </button>
    </section>
  );
};


// --- FormContainer Component for reusable styling ---
const FormContainer = ({ children, title }) => (
  <section className="py-8">
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-300 mb-8 drop-shadow-md">{title}</h2>
      {children}
    </div>
  </section>
);

// --- InputField Component for consistent input styling ---
const InputField = ({ label, id, type, placeholder, value, onChange, required, error, name }) => (
  <div>
    <label className="block text-gray-300 text-lg font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name || id} // Use name prop if provided, otherwise fallback to id
      className={`shadow-inner appearance-none border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 placeholder-gray-500 transition duration-200 text-lg`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="text-red-500 text-sm italic mt-2">{error}</p>}
  </div>
);


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
    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Lütfen geçerli bir e-posta adresi girin.');
        return;
    }
    // Password strength check (example)
    if (password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır.');
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
    <FormContainer title="Kayıt Ol">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="E-posta"
          id="email"
          type="email"
          placeholder="eposta@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={error.includes('e-posta') ? error : ''}
        />
        <InputField
          label="Şifre"
          id="password"
          type="password"
          placeholder="Şifreniz"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={error.includes('Şifre') ? error : ''}
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Kayıt Ol
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="inline-block align-baseline font-bold text-lg text-green-400 hover:text-green-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2"
          >
            Hesabınız var mı? Giriş yapın
          </button>
        </div>
      </form>
    </FormContainer>
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
    <FormContainer title="Giriş Yap">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="E-posta"
          id="login-email"
          type="email"
          placeholder="eposta@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={error.includes('e-posta') ? error : ''}
        />
        <InputField
          label="Şifre"
          id="login-password"
          type="password"
          placeholder="Şifreniz"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={error.includes('şifre') ? error : ''}
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('register')}
            className="inline-block align-baseline font-bold text-lg text-green-400 hover:text-green-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2"
          >
            Hesabınız yok mu? Kayıt olun
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

// --- QuickViewModal Component ---
const QuickViewModal = ({ product, onClose, addToCart }) => {
  if (!product) return null; // Don't render if no product is selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full transform scale-95 opacity-0 animate-scale-in border border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2"
          aria-label="Kapat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-green-300 mb-6 text-center">{product.name}</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-6 md:space-y-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl border border-gray-700 shadow-lg"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-4 drop-shadow-md">{product.price.toFixed(2)} TL</p>
            <p className="text-gray-300 text-base mb-6">
                {product.description || 'Ürün Açıklaması Buraya Gelecek. Bu harika ürün, günlük ihtiyaçlarınızı karşılamak üzere tasarlanmıştır...'}
            </p>
            <button
              onClick={() => { addToCart(product); onClose(); }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keyframes for modal animations (add these to your main CSS file or a style tag if not using build tools)
/*
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite ease-in-out;
}
*/

export default App;