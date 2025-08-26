import { useState, useEffect } from "react";
import './Home.css';

import img1 from '../../src/image/Art01.jpg';
import img2 from '../../src/image/Art02.jpg';
import img3 from '../../src/image/Art03.jpg';
import img4 from '../../src/image/Art04.jpg';


const heroImages = [
   img1,img2,img3,img4
];

function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Automatic slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentImage(index); // Switch image on dot click
  };

  return (
    <div className="page">

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Discover Contemporary Art</h1>
          <p className="hero-subtitle">
            Showcasing stunning works from talented artists around the globe.
          </p>
          <button className="hero-button">Explore Exhibitions</button>
        </div>

        {/* Navigation Dots */}
        <div className="hero-dots">
          {heroImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImage ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="content">
        <h2>Featured Artists</h2>
        <p>
          Our gallery presents a curated selection of contemporary works,
          offering visitors the chance to connect with inspiring artists.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Whistler Contemporary Gallery</h3>
            <p>123 Art Street, Whistler, BC</p>
            <p>Email: info@whistlergallery.com</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/artists">Artists & Artwork</a></li>
              <li><a href="/exhibitions">Exhibitions</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} Whistler Contemporary Gallery. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
