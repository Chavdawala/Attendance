import React from 'react';
import './Index.css';
import Navbar from './Navbar';

function Index() {
  return (
    <>
    <Navbar />
    <div className="app-layout">
      {/* Left-side Navbar */}
     
        
    

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="logo-container">
            
            <h1 className="logo-title" style={{color:'black'}}>Career Counselor</h1>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="hero">
            <div className="hero-content">
              <h1 className="hero-title">Shape Your Career with Confidence</h1>
              <p className="hero-description">Empowering individuals to make informed career decisions with expert guidance.</p>
              <div className="hero-buttons">
                <button className="btn primary-btn">Get Started</button>
                <button className="btn secondary-btn">Learn More</button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about">
            <div className="about-container">
              <h2 style={{color:'black'}}>About Us</h2>
              <p style={{color:'black'}}>We are committed to helping you discover your true potential. Our team of experts provides personalized career advice and resources to guide you on your journey.</p>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="services">
            <h2 style={{color:'black'}}>Our Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3 style={{color:'black'}}>Career Assessments</h3>
                <p style={{color:'black'}}>Gain insights into your strengths and interests with our detailed assessments.</p>
              </div>
              <div className="service-card">
                <h3 style={{color:'black'}}>One-on-One Counseling</h3>
                <p style={{color:'black'}}>Work directly with experts to plan and achieve your career goals.</p>
              </div>
              <div className="service-card">
                <h3 style={{color:'black'}}>Workshops and Resources</h3>
                <p style={{color:'black'}}>Participate in workshops and access tools to enhance your career path.</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact">
            <h2 style={{color:'black'}}>Contact Us</h2>
            <p style={{color:'black'}}>Have questions or need support? Get in touch with us today!</p>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit" className="btn primary-btn">Send Message</button>
            </form>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Career Counselor. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
    </>
  );
}

export default Index;
