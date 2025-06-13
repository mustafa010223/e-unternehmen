import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Backend'den gelecek mesajı, yüklenme durumunu ve olası hataları tutmak için state'ler oluşturuyoruz.
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook'u, component ilk render edildiğinde sadece bir kez çalışacak şekilde ayarlandı (boş dependency array [] sayesinde).
  useEffect(() => {
    // Backend API'nize istek atıyoruz.
    // '/api/message' gibi göreceli bir yol kullanmak, Ingress veya proxy ile yönlendirme yapmayı kolaylaştırır.
    fetch('/api/message')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Gelen veriyi state'e kaydediyoruz.
        setBackendMessage(data.message);
      })
      .catch(error => {
        // Bir hata oluşursa, hata state'ini güncelliyoruz.
        console.error('Fetch error:', error);
        setError('Backend ile iletişim kurulamadı. Lütfen backend servisinin çalıştığından ve /api/message endpointinin mevcut olduğundan emin olun.');
      })
      .finally(() => {
        // İstek başarılı ya da başarısız olsun, yüklenme durumunu false yapıyoruz.
        setLoading(false);
      });
  }, []); // Boş dependency array, bu effect'in sadece component mount edildiğinde çalışmasını sağlar.

  // Dinamik olarak render edilecek içeriği belirliyoruz.
  const renderContent = () => {
    if (loading) {
      return <p>Backend'den veri yükleniyor...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>Hata: {error}</p>;
    }
    if (backendMessage) {
      return (
        <div>
          <p>Frontend başarıyla çalışıyor.</p>
          <p className="backend-message">
            <strong>Backend'den Gelen Mesaj:</strong> {backendMessage}
          </p>
        </div>
      );
    }
    return <p>Frontend başarıyla çalışıyor ancak backend'den mesaj alınamadı.</p>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Merhaba K3s CI/CD! 🚀</h1>
        {renderContent()}
      </header>
    </div>
  );
}

export default App;