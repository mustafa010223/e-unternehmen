import React, { useState } from 'react';

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'blog':
        return <Blog setCurrentPage={setCurrentPage} />;
      case 'blogPostDetail':
        return <BlogPostDetail />;
      case 'media':
        return <Media setCurrentPage={setCurrentPage} />;
      case 'podcasts':
        return <Podcasts />;
      case 'terraformDetail':
        return <TerraformDetail />;
      case 'ansibleDetail':
        return <AnsibleDetail />;
      case 'helmDetail':
        return <HelmDetail />;
      case 'kubernetesDetail':
        return <KubernetesDetail />;
      case 'dockerDetail':
        return <DockerDetail />;
      case 'githubActionsDetail':
        return <GithubActionsDetail />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header setCurrentPage={setCurrentPage} />
      <main className="flex-grow-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

// Header Component
const Header = ({ setCurrentPage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand fs-3 fw-bold text-warning animate__animated animate__bounceInLeft" href="/" onClick={() => setCurrentPage('home')}>
          Cloud DevOps Lösungen
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <NavItem onClick={() => setCurrentPage('home')}>Startseite</NavItem>
            <NavItem onClick={() => setCurrentPage('services')}>Dienstleistungen</NavItem>
            <NavItem onClick={() => setCurrentPage('blog')}>Blog</NavItem>
            <NavItem onClick={() => setCurrentPage('podcasts')}>Podcasts</NavItem>
            <NavItem onClick={() => setCurrentPage('media')}>Medien</NavItem>
            <NavItem onClick={() => setCurrentPage('about')}>Über Uns</NavItem>
            <NavItem onClick={() => setCurrentPage('contact')}>Kontakt</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// NavItem Component
const NavItem = ({ children, onClick }) => {
  return (
    <li className="nav-item">
      <button className="nav-link btn btn-link text-white px-3 py-2 rounded-3 transition-all duration-300 hover:bg-secondary hover:text-white" onClick={onClick}>
        {children}
      </button>
    </li>
  );
};

// Home Page Component
const Home = ({ setCurrentPage }) => {
  const servicesData = [
    {
      title: "Cloud-Infrastruktur-Setup",
      description: "Design und Implementierung robuster und skalierbarer AWS-Infrastrukturen.",
      icon: "fas fa-cloud",
      color: "text-primary"
    },
    {
      title: "CI/CD Pipeline-Automatisierung",
      description: "Automatisieren Sie Ihre Softwarebereitstellung mit modernen CI/CD-Praktiken.",
      icon: "fas fa-cogs",
      color: "text-success"
    },
    {
      title: "Containerisierung mit Docker & Kubernetes",
      description: "Optimieren Sie Ihre Anwendungen mit Container-Technologien.",
      icon: "fas fa-box",
      color: "text-info"
    }
  ];

  const cloudLogos = [
    { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png" },
    { name: "Azure", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png" },
    { name: "Google Cloud", src: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-section text-center text-white py-5 d-flex align-items-center min-vh-75 position-relative bg-primary"
        style={{ 
          // backgroundImage: 'url(https://placehold.co/1920x1080/0d6efd/ffffff?text=Cloud+Background)', // Kaldırıldı
          // backgroundSize: 'cover', 
          // backgroundPosition: 'center',
          '--bs-bg-opacity': .9, // Daha belirgin bir arka plan için opaklık
          zIndex: 1
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{opacity: 0.6, zIndex: -1}}></div> {/* Overlay */}
        <div className="container animate__animated animate__fadeInUp">
          <h1 className="display-1 fw-bold mb-4 animate__animated animate__fadeInDown animate__delay-1s">Ihre Zukunft in der Cloud beginnt hier</h1>
          <p className="lead mb-5 animate__animated animate__fadeInUp animate__delay-2s">
            Wir sind Ihr Partner für innovative AWS Cloud- und DevOps-Lösungen.
            Optimieren Sie Ihre Infrastruktur, beschleunigen Sie Ihre Entwicklung und sichern Sie Ihre Daten.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center animate__animated animate__fadeInUp animate__delay-3s">
            <button className="btn btn-success btn-lg px-4 me-md-2 animate__animated animate__pulse animate__infinite" onClick={() => setCurrentPage('services')}>
              Unsere Dienstleistungen <i className="fas fa-arrow-right ms-2"></i>
            </button>
            <button className="btn btn-outline-light btn-lg px-4" onClick={() => setCurrentPage('contact')}>
              Kontaktieren Sie Uns <i className="fas fa-envelope ms-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unsere Kernkompetenzen</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {servicesData.map((service, index) => (
              <div className="col animate__animated animate__fadeInUp" style={{animationDelay: `${0.2 * index}s`}} key={index}>
                <div className="card h-100 shadow-sm border-0 transform-on-hover">
                  <div className="card-body text-center p-4">
                    <i className={`${service.icon} fa-4x ${service.color} mb-3 animate__animated animate__bounceIn`}></i>
                    <h3 className="card-title fs-4 fw-bold mb-2">{service.title}</h3>
                    <p className="card-text text-muted">{service.description}</p>
                    <button className="btn btn-link text-primary" onClick={() => setCurrentPage('services')}>Mehr erfahren <i className="fas fa-chevron-right ms-1"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Provider Logos Section */}
      <section className="cloud-logos-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unsere Cloud-Partner</h2>
          <div className="row justify-content-center align-items-center g-4">
            {cloudLogos.map((logo, index) => (
              <div className="col-6 col-md-3 text-center animate__animated animate__zoomIn" style={{animationDelay: `${0.2 * index}s`}} key={index}>
                <img src={logo.src} alt={logo.name} className="img-fluid" style={{maxHeight: '80px'}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section - Mustafa Salik & Location */}
      <section className="about-preview-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-4 text-dark animate__animated animate__fadeIn">Wer wir sind</h2>
          <p className="lead text-muted mb-3 animate__animated animate__fadeInUp">
            Gegründet von **Mustafa Salik**, sind wir ein Team von passionierten DevOps- und Cloud-Experten.
          </p>
          <p className="fs-5 text-muted animate__animated animate__fadeInUp animate__delay-1s">
            Unser Hauptsitz befindet sich in **BERLIN**, Deutschland.
          </p>
          <button className="btn btn-outline-primary btn-lg mt-4 animate__animated animate__zoomIn" onClick={() => setCurrentPage('about')}>
            Mehr über uns <i className="fas fa-info-circle ms-2"></i>
          </button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section bg-primary text-white py-5 text-center">
        <div className="container animate__animated animate__fadeInUp">
          <h2 className="display-4 fw-bold mb-4">Bereit für Ihre Cloud-Transformation?</h2>
          <p className="lead mb-5">Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.</p>
          <button className="btn btn-light btn-lg px-5 animate__animated animate__bounce animate__infinite" onClick={() => setCurrentPage('contact')}>
            Jetzt Kontakt Aufnehmen <i className="fas fa-phone-alt ms-2"></i>
          </button>
        </div>
      </section>
    </>
  );
};

// Services Page Component
const Services = () => {
  const services = [
    {
      title: "Cloud-Infrastruktur-Setup",
      description: "Wir entwerfen und implementieren robuste, skalierbare und sichere AWS-Infrastrukturen, die perfekt auf Ihre Geschäftsanforderungen zugeschnitten sind. Von der Netzwerkarchitektur bis zur Datenbankintegration – wir sorgen für eine solide Grundlage für Ihre Anwendungen.",
      icon: "fas fa-cloud",
      color: "text-primary"
    },
    {
      title: "CI/CD Pipeline-Automatisierung",
      description: "Beschleunigen Sie Ihre Softwarebereitstellung mit vollständig automatisierten CI/CD-Pipelines. Wir implementieren Best Practices für kontinuierliche Integration, Lieferung und Bereitstellung, um Ihre Entwicklungszyklen zu optimieren und Fehler zu minimieren.",
      icon: "fas fa-cogs",
      color: "text-success"
    },
    {
      title: "Containerisierung mit Docker & Kubernetes",
      description: "Nutzen Sie die Vorteile der Containerisierung für Ihre Anwendungen. Wir unterstützen Sie bei der Migration zu Docker, der Orchestrierung mit Kubernetes und der Optimierung Ihrer containerisierten Workloads für maximale Effizienz und Portabilität.",
      icon: "fas fa-box",
      color: "text-info"
    },
    {
      title: "Überwachung & Logging",
      description: "Implementieren Sie umfassende Überwachungs- und Logging-Lösungen, um die Leistung und Verfügbarkeit Ihrer Cloud-Ressourcen zu gewährleisten. Wir helfen Ihnen, Metriken zu sammeln, Logs zu analysieren und Alarme einzurichten, um proaktiv auf Probleme reagieren zu können.",
      icon: "fas fa-chart-line",
      color: "text-warning"
    },
    {
      title: "Sicherheits- & Compliance-Audits",
      description: "Wir führen detaillierte Sicherheitsaudits Ihrer Cloud-Umgebung durch und stellen sicher, dass Sie alle relevanten Compliance-Standards (z.B. DSGVO, ISO 27001) erfüllen. Schützen Sie Ihre Daten und Infrastruktur vor Bedrohungen.",
      icon: "fas fa-shield-alt",
      color: "text-danger"
    },
    {
      title: "Managed Cloud Services",
      description: "Konzentrieren Sie sich auf Ihr Kerngeschäft, während wir Ihre Cloud-Infrastruktur vollständig verwalten. Unser Team bietet 24/7-Support, proaktive Wartung, Kostenoptimierung und Performance-Tuning für Ihre AWS-Umgebung.",
      icon: "fas fa-hands-helping",
      color: "text-secondary"
    }
  ];

  return (
    <section className="services-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unsere Dienstleistungen</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {services.map((service, index) => (
            <div className="col animate__animated animate__fadeInUp" style={{animationDelay: `${0.2 * index}s`}} key={index}>
              <div className="card h-100 shadow-sm border-0 transform-on-hover">
                <div className="card-body text-center p-4">
                  <i className={`${service.icon} fa-4x ${service.color} mb-3 animate__animated animate__bounceIn`}></i>
                  <h3 className="card-title fs-4 fw-bold mb-2">{service.title}</h3>
                  <p className="card-text text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Page Component
const About = () => {
  return (
    <section className="about-section py-5 bg-white">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Über Uns</h2>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0 animate__animated animate__fadeInLeft">
            <img src="https://placehold.co/600x400/0d6efd/ffffff?text=Unser+Team" alt="Unser Team" className="img-fluid rounded shadow-lg" />
          </div>
          <div className="col-lg-6 animate__animated animate__fadeInRight">
            <p className="lead text-muted mb-4">
              Wir sind ein engagiertes Team von Cloud- und DevOps-Experten mit einer Leidenschaft für die Transformation von Unternehmen durch innovative Technologielösungen. Seit unserer Gründung haben wir unzähligen Kunden geholfen, ihre Infrastruktur zu optimieren, die Bereitstellung zu beschleunigen und die Sicherheit in der AWS Cloud zu verbessern.
            </p>
            <p className="text-muted">
              Unser Ansatz ist kundenorientiert und lösungsorientiert. Wir arbeiten eng mit Ihnen zusammen, um Ihre spezifischen Anforderungen zu verstehen und maßgeschneiderte Strategien zu entwickeln, die nicht nur die aktuellen Herausforderungen bewältigen, sondern auch zukünftiges Wachstum und Innovation ermöglichen. Vertrauen Sie auf unsere Expertise, um Ihre Cloud-Reise erfolgreich zu gestalten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Page Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend API
    console.log('Form submitted:', formData);
    alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <section className="contact-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Kontaktieren Sie Uns</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8 animate__animated animate__fadeInUp">
            <div className="card shadow-lg border-0 p-4">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-Mail</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Nachricht</label>
                    <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100">Nachricht Senden <i className="fas fa-paper-plane ms-2"></i></button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 animate__animated animate__fadeInUp animate__delay-1s">
          <p className="lead text-muted">Oder finden Sie uns hier:</p>
          <p className="fs-5 text-dark">
            <i className="fas fa-map-marker-alt me-2 text-primary"></i> Musterstraße 123, 12345 Musterstadt, Deutschland
          </p>
          <p className="fs-5 text-dark">
            <i className="fas fa-phone me-2 text-primary"></i> +49 123 456789
          </p>
          <p className="fs-5 text-dark">
            <i className="fas fa-envelope me-2 text-primary"></i> info@clouddevops-loesungen.de
          </p>
        </div>
      </div>
    </section>
  );
};

// Blog Page Component
const Blog = ({ setCurrentPage }) => {
  const blogPosts = [
    {
      id: 1,
      title: "Die Vorteile von AWS für Ihr Unternehmen",
      date: "2025-06-20",
      author: "Max Mustermann",
      summary: "Erfahren Sie, wie AWS Cloud-Lösungen Ihrem Unternehmen helfen können, Skalierbarkeit, Sicherheit und Kosteneffizienz zu erreichen.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      series: "AWS Grundlagen"
    },
    {
      id: 2,
      title: "CI/CD Best Practices mit GitLab und AWS",
      date: "2025-06-15",
      author: "Anna Schmidt",
      summary: "Ein Leitfaden zur Implementierung robuster CI/CD-Pipelines mit GitLab auf AWS.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      series: "CI/CD Pipelines"
    },
    {
      id: 3,
      title: "Sicherheit in der Cloud: Ein umfassender Ansatz",
      date: "2025-06-10",
      author: "Dr. Klaus Müller",
      summary: "Wichtige Überlegungen und Strategien zur Gewährleistung der Sicherheit Ihrer Cloud-Infrastruktur.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      series: "Cloud Sicherheit"
    },
    {
      id: 4,
      title: "Ansible für Anfänger: Erste Schritte zur Automatisierung",
      date: "2025-06-05",
      author: "Max Mustermann",
      summary: "Lernen Sie die Grundlagen von Ansible und wie Sie Ihre ersten Automatisierungs-Playbooks erstellen.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      series: "Ansible Serie"
    },
    {
      id: 5,
      title: "Kubernetes Deployment Strategien",
      date: "2025-05-28",
      author: "Anna Schmidt",
      summary: "Verschiedene Deployment-Strategien in Kubernetes verstehen und anwenden für reibungslose Updates.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      series: "Kubernetes Serie"
    }
  ];

  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    return <BlogPostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  // Group posts by series
  const postsBySeries = blogPosts.reduce((acc, post) => {
    (acc[post.series] = acc[post.series] || []).push(post);
    return acc;
  }, {});

  return (
    <section className="blog-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unser Blog</h2>
        
        {Object.entries(postsBySeries).map(([seriesName, posts]) => (
          <div key={seriesName} className="mb-5">
            <h3 className="fs-2 fw-bold mb-4 text-primary animate__animated animate__fadeInLeft">{seriesName}</h3>
            <div className="row g-4">
              {posts.map(post => (
                <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp" style={{animationDelay: `${0.2 * post.id}s`}} key={post.id}>
                  <div className="card h-100 shadow-sm border-0 transform-on-hover cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <div className="card-body">
                      <h4 className="card-title fs-4 fw-bold mb-2">{post.title}</h4>
                      <p className="card-subtitle mb-2 text-muted">
                        <i className="fas fa-calendar-alt me-2"></i>{post.date} | <i className="fas fa-user me-2"></i>{post.author}
                      </p>
                      <p className="card-text">{post.summary}</p>
                      <button className="btn btn-link text-primary">Weiterlesen <i className="fas fa-arrow-right ms-2"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Blog Post Detail Component
const BlogPostDetail = ({ post, onBack }) => {
  return (
    <section className="blog-post-detail-section py-5 bg-light">
      <div className="container">
        <button className="btn btn-secondary mb-4 animate__animated animate__fadeInLeft" onClick={onBack}>
          <i className="fas fa-arrow-left me-2"></i> Zurück zum Blog
        </button>
        <h2 className="display-4 fw-bold mb-4 text-dark animate__animated animate__fadeInDown">{post.title}</h2>
        <p className="text-muted mb-4 animate__animated animate__fadeInUp">
          <i className="fas fa-calendar-alt me-2"></i>{post.date} | <i className="fas fa-user me-2"></i>{post.author} | Serie: {post.series}
        </p>
        <img src={`https://placehold.co/800x450/0d6efd/ffffff?text=${encodeURIComponent(post.title)}`} alt={post.title} className="img-fluid rounded shadow-sm mb-4 animate__animated animate__zoomIn" />
        <p className="lead text-muted mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          {post.content}
        </p>
        {/* More content can be added here */}
      </div>
    </section>
  );
};

// Podcasts Page Component
const Podcasts = () => {
  const podcastEpisodes = [
    {
      id: 1,
      title: "DevOps im Mittelstand: Herausforderungen und Chancen",
      description: "Ein Gespräch über die Implementierung von DevOps-Praktiken in kleinen und mittleren Unternehmen, die Vorteile der Cloud-Migration und wie man typische Fallstricke vermeidet.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder audio
      date: "2025-06-25"
    },
    {
      id: 2,
      title: "Cloud-Sicherheit mit AWS: Best Practices für Ihr Unternehmen",
      description: "Experten diskutieren die wichtigsten Aspekte der Cloud-Sicherheit auf der AWS-Plattform, einschließlich IAM, VPC-Sicherheit, Verschlüsselung und Compliance-Anforderungen.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Placeholder audio
      date: "2025-06-18"
    },
    {
      id: 3,
      title: "Automatisierung mit Ansible und Terraform: Ein Deep Dive",
      description: "Wie Ansible und Terraform zusammenarbeiten, um Ihre Infrastruktur effizient zu verwalten. Wir beleuchten die Synergien zwischen IaC und Konfigurationsmanagement.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Placeholder audio
      date: "2025-06-10"
    },
    {
      id: 4,
      title: "Kubernetes im Praxiseinsatz: Skalierung und Resilienz",
      description: "Praktische Einblicke in den Einsatz von Kubernetes für hochverfügbare und skalierbare Anwendungen. Fallstudien und bewährte Methoden.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", // Placeholder audio
      date: "2025-06-01"
    }
  ];

  return (
    <section className="podcasts-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unsere Podcasts</h2>
        <div className="row g-4">
          {podcastEpisodes.map(episode => (
            <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp" style={{animationDelay: `${0.2 * episode.id}s`}} key={episode.id}>
              <div className="card h-100 shadow-sm border-0 transform-on-hover">
                <div className="card-body">
                  <h3 className="card-title fs-4 fw-bold mb-2">{episode.title}</h3>
                  <p className="card-subtitle mb-2 text-muted">
                    <i className="fas fa-calendar-alt me-2"></i>{episode.date}
                  </p>
                  <p className="card-text">{episode.description}</p>
                  <audio controls className="w-100 mt-3">
                    <source src={episode.audioUrl} type="audio/mpeg" />
                    Ihr Browser unterstützt das Audio-Element nicht.
                  </audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CiCdPipelineAnimation Component
const CiCdPipelineAnimation = () => {
  const pipelineSteps = [
    { id: 1, name: "Code Commit", icon: "fas fa-code-branch", delay: "0.5s" },
    { id: 2, name: "Build & Test", icon: "fas fa-hammer", delay: "1s" },
    { id: 3, name: "Docker Image Build", icon: "fab fa-docker", delay: "1.5s" },
    { id: 4, name: "Push to Registry", icon: "fas fa-upload", delay: "2s" },
    { id: 5, name: "Deploy to Kubernetes", icon: "fas fa-server", delay: "2.5s" },
    { id: 6, name: "Security Scan", icon: "fas fa-shield-alt", delay: "3s" },
    { id: 7, name: "E2E Tests", icon: "fas fa-vial", delay: "3.5s" },
    { id: 8, name: "Monitoring", icon: "fas fa-chart-line", delay: "4s" },
  ];

  return (
    <section className="ci-cd-pipeline-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unser CI/CD Pipeline</h2>
        <p className="lead text-center text-muted mb-5 animate__animated animate__fadeInUp">
          Ein Blick auf unseren automatisierten Software-Lieferprozess.
        </p>
        <div className="row justify-content-center g-4">
          {pipelineSteps.map(step => (
            <div className="col-md-3 col-lg-2 text-center animate__animated animate__zoomIn" style={{ animationDelay: step.delay }} key={step.id}>
              <div className="card h-100 shadow-sm border-0 p-3">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <i className={`${step.icon} fa-3x text-primary mb-3 animate__animated animate__bounce`}></i>
                  <h5 className="card-title fw-bold">{step.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <p className="fs-5 text-muted animate__animated animate__fadeInUp animate__delay-4s">
            Dieser Prozess gewährleistet schnelle, zuverlässige und sichere Software-Bereitstellungen.
          </p>
        </div>
      </div>
    </section>
  );
};

// Media Page Component
const Media = ({ setCurrentPage }) => {
  const images = [
    "https://placehold.co/600x400/28a745/ffffff?text=Cloud+Infrastruktur",
    "https://placehold.co/600x400/007bff/ffffff?text=DevOps+Automatisierung",
    "https://placehold.co/600x400/6c757d/ffffff?text=Sicherheits+Audit",
    "https://placehold.co/600x400/fd7e14/ffffff?text=Terraform+Code",
    "https://placehold.co/600x400/6f42c1/ffffff?text=Kubernetes+Cluster",
    "https://placehold.co/600x400/20c997/ffffff?text=Docker+Container"
  ];

  const videos = [
    { title: "Einführung in AWS DevOps", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, // Rick Astley - Never Gonna Give You Up (Placeholder)
    { title: "Unsere Cloud-Lösungen im Detail", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  ];

  const devOpsTools = [
    { name: "Terraform", icon: "fas fa-leaf", page: "terraformDetail", description: "Infrastruktur als Code" },
    { name: "Ansible", icon: "fas fa-server", page: "ansibleDetail", description: "Automatisierung und Konfiguration" },
    { name: "Helm", icon: "fas fa-ship", page: "helmDetail", description: "Kubernetes Paketmanager" },
    { name: "Kubernetes", icon: "fas fa-dharmachakra", page: "kubernetesDetail", description: "Container-Orchestrierung" },
    { name: "Docker", icon: "fab fa-docker", page: "dockerDetail", description: "Containerisierung" },
    { name: "GitHub Actions", icon: "fab fa-github-alt", page: "githubActionsDetail", description: "CI/CD Workflows" }
  ];

  return (
    <section className="media-section py-5 bg-white">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Unsere Medien & Tools</h2>

        <h3 className="fs-2 fw-bold mb-4 text-primary animate__animated animate__fadeInLeft">Bildergalerie</h3>
        <div className="row g-4 mb-5">
          {images.map((src, index) => (
            <div className="col-md-4 animate__animated animate__zoomIn" style={{animationDelay: `${0.2 * index}s`}} key={index}>
              <img src={src} className="img-fluid rounded shadow-sm transform-on-hover" alt="Media" />
            </div>
          ))}
        </div>

        <h3 className="fs-2 fw-bold mb-4 text-primary animate__animated animate__fadeInLeft">Videos</h3>
        <div className="row g-4 mb-5">
          {videos.map((video, index) => (
            <div className="col-md-6 animate__animated animate__fadeInUp" style={{animationDelay: `${0.2 * index}s`}} key={index}>
              <div className="card shadow-sm border-0 transform-on-hover">
                <div className="card-body">
                  <h4 className="card-title">{video.title}</h4>
                  <div className="ratio ratio-16x9">
                    <iframe src={video.url} title={video.title} allowFullScreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="fs-2 fw-bold mb-4 text-primary animate__animated animate__fadeInLeft">DevOps Tools</h3>
        <div className="row g-4">
          {devOpsTools.map((tool, index) => (
            <div className="col-md-4 animate__animated animate__fadeInUp" style={{animationDelay: `${0.2 * index}s`}} key={index}>
              <div className="card h-100 shadow-sm border-0 transform-on-hover cursor-pointer" onClick={() => setCurrentPage(tool.page)}>
                <div className="card-body text-center p-4">
                  <i className={`${tool.icon} fa-4x text-success mb-3 animate__animated animate__pulse animate__infinite`}></i>
                  <h4 className="card-title fs-4 fw-bold mb-2">{tool.name}</h4>
                  <p className="card-text text-muted">{tool.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CI/CD Pipeline Animation Preview */}
        <CiCdPipelineAnimation />

      </div>
    </section>
  );
};

// Terraform Detail Page
const TerraformDetail = () => {
  return (
    <section className="detail-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Terraform</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto animate__animated animate__fadeInUp">
            <img src="https://placehold.co/800x450/6f42c1/ffffff?text=Terraform+Infrastructure" alt="Terraform" className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              Terraform ist ein Open-Source-Tool für die Infrastruktur als Code (IaC). Es ermöglicht Ihnen, Cloud- und On-Premises-Ressourcen in einer deklarativen Konfigurationssprache zu definieren und bereitzustellen. Mit Terraform können Sie Ihre gesamte Infrastruktur versionieren, wiederverwenden und automatisieren.
            </p>
            <p className="text-muted">
              Es unterstützt eine Vielzahl von Cloud-Anbietern (AWS, Azure, Google Cloud) und anderen Diensten, was es zu einem vielseitigen Werkzeug für die Verwaltung komplexer Umgebungen macht. Durch die Automatisierung der Infrastrukturbereitstellung reduziert Terraform manuelle Fehler und beschleunigt den Entwicklungsprozess.
            </p>
            <h3 className="fs-3 fw-bold mt-5 mb-3 text-primary">Vorteile:</h3>
            <ul>
              <li><i className="fas fa-check-circle text-success me-2"></i> Infrastruktur als Code</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Multi-Cloud-Unterstützung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Automatisierte Bereitstellung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Versionskontrolle der Infrastruktur</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Ansible Detail Page
const AnsibleDetail = () => {
  return (
    <section className="detail-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Ansible</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto animate__animated animate__fadeInUp">
            <img src="https://placehold.co/800x450/dc3545/ffffff?text=Ansible+Automation" alt="Ansible" className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              Ansible ist ein Open-Source-Automatisierungs-Tool, das für Konfigurationsmanagement, Softwarebereitstellung und Orchestrierung verwendet wird. Es ist agentenlos, was bedeutet, dass keine spezielle Software auf den verwalteten Knoten installiert werden muss, was die Einrichtung und Wartung vereinfacht.
            </p>
            <p className="text-muted">
              Mit einfachen YAML-Playbooks können Sie komplexe Automatisierungsaufgaben definieren, von der Serverkonfiguration bis zur Anwendungsbereitstellung. Ansible ist bekannt für seine Benutzerfreundlichkeit und seine Fähigkeit, schnell Ergebnisse zu liefern, was es zu einer beliebten Wahl für DevOps-Teams macht.
            </p>
            <h3 className="fs-3 fw-bold mt-5 mb-3 text-primary">Vorteile:</h3>
            <ul>
              <li><i className="fas fa-check-circle text-success me-2"></i> Agentenlos</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Einfache YAML-Syntax</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Leistungsstarkes Konfigurationsmanagement</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Schnelle Implementierung</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helm Detail Page
const HelmDetail = () => {
  return (
    <section className="detail-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Helm</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto animate__animated animate__fadeInUp">
            <img src="https://placehold.co/800x450/17a2b8/ffffff?text=Helm+Chart" alt="Helm" className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              Helm ist der Paketmanager für Kubernetes. Er hilft Ihnen, Kubernetes-Anwendungen zu definieren, zu installieren und zu aktualisieren. Mit Helm können Sie komplexe Anwendungen als Charts verpacken, die alle notwendigen Kubernetes-Ressourcen enthalten.
            </p>
            <p className="text-muted">
              Helm vereinfacht die Bereitstellung und Verwaltung von Anwendungen in Kubernetes-Clustern erheblich. Es bietet Funktionen wie Versionskontrolle, Rollbacks und die einfache Freigabe von Anwendungen, was es zu einem unverzichtbaren Werkzeug für DevOps-Teams macht.
            </p>
            <h3 className="fs-3 fw-bold mt-5 mb-3 text-primary">Vorteile:</h3>
            <ul>
              <li><i className="fas fa-check-circle text-success me-2"></i> Vereinfachte Anwendungsbereitstellung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Versionskontrolle und Rollbacks</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Wiederverwendbare Charts</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Große Community und Chart-Repositorys</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Kubernetes Detail Page
const KubernetesDetail = () => {
  return (
    <section className="detail-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Kubernetes</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto animate__animated animate__fadeInUp">
            <img src="https://placehold.co/800x450/007bff/ffffff?text=Kubernetes+Orchestration" alt="Kubernetes" className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              Kubernetes ist eine Open-Source-Plattform zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von containerisierten Anwendungen. Es gruppiert Container, die eine Anwendung bilden, in logische Einheiten für eine einfache Verwaltung und Erkennung.
            </p>
            <p className="text-muted">
              Als De-facto-Standard für die Container-Orchestrierung bietet Kubernetes eine robuste ve erweiterbare Plattform für den Betrieb von Microservices und komplexen Workloads in jeder Umgebung, sei es On-Premises, in der Cloud oder in Hybrid-Setups.
            </p>
            <h3 className="fs-3 fw-bold mt-5 mb-3 text-primary">Vorteile:</h3>
            <ul>
              <li><i className="fas fa-check-circle text-success me-2"></i> Automatische Skalierung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Selbstheilung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Lastverteilung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Portabilität über verschiedene Umgebungen</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Docker Detail Page
const DockerDetail = () => {
  return (
    <section className="detail-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">Docker</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto animate__animated animate__fadeInUp">
            <img src="https://placehold.co/800x450/007bff/ffffff?text=Docker+Containerization" alt="Docker" className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              Docker ist eine Plattform für Entwickler und Systemadministratoren, um Anwendungen mit all ihren Abhängigkeiten in "Containern" zu entwickeln, bereitzustellen und auszuführen. Container sind leichtgewichtige, eigenständige, ausführbare Pakete von Software, die alles enthalten, was zur Ausführung einer Anwendung benötigt wird.
            </p>
            <p className="text-muted">
              Durch die Containerisierung mit Docker wird die Konsistenz über verschiedene Umgebungen hinweg gewährleistet, von der Entwicklung bis zur Produktion. Dies vereinfacht den Bereitstellungsprozess erheblich und reduziert Kompatibilitätsprobleme.
            </p>
            <h3 className="fs-3 fw-bold mt-5 mb-3 text-primary">Vorteile:</h3>
            <ul>
              <li><i className="fas fa-check-circle text-success me-2"></i> Konsistente Umgebungen</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Schnelle Bereitstellung</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Ressourcen-Effizienz</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Portabilität</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// GitHub Actions Detail Page
const GithubActionsDetail = () => {
  return (
    <section className="detail-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center display-4 fw-bold mb-5 text-dark animate__animated animate__fadeIn">GitHub Actions</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto animate__animated animate__fadeInUp">
            <img src="https://placehold.co/800x450/007bff/ffffff?text=GitHub+Actions+Workflow" alt="GitHub Actions" className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              GitHub Actions ist eine leistungsstarke CI/CD-Plattform, die es Ihnen ermöglicht, Automatisierungsworkflows direkt in Ihrem GitHub-Repository zu erstellen. Von der Code-Validierung über das Testen bis hin zur Bereitstellung – GitHub Actions bietet eine flexible und integrierte Lösung für Ihre DevOps-Anforderungen.
            </p>
            <p className="text-muted">
              Mit einer Vielzahl von vorgefertigten Aktionen und der Möglichkeit, eigene Aktionen zu erstellen, können Sie maßgeschneiderte Pipelines für jede Art von Projekt entwickeln. Es integriert sich nahtlessly in das GitHub-Ökosystem und bietet eine hervorragende Sichtbarkeit und Kontrolle über Ihre Entwicklungsprozesse.
            </p>
            <h3 className="fs-3 fw-bold mt-5 mb-3 text-primary">Vorteile:</h3>
            <ul>
              <li><i className="fas fa-check-circle text-success me-2"></i> Nahtlose Integration mit GitHub</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Flexible Workflow-Definitionen</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Große Community und Marktplatz für Aktionen</li>
              <li><i className="fas fa-check-circle text-success me-2"></i> Kostenlose Nutzung für öffentliche Repositories</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto shadow-lg">
      <div className="container">
        <p className="mb-0">&copy; 2025 Cloud DevOps Lösungen. Alle Rechte vorbehalten.</p>
        <p className="mb-0">Entwickelt mit <i className="fas fa-heart text-danger animate__animated animate__heartBeat animate__infinite"></i> für moderne Cloud-Infrastrukturen.</p>
      </div>
    </footer>
  );
};

export default App;