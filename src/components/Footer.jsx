import './Footer.css';

function Footer({ onNavClick }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-nav-list">
            <li>
              <a className="footer-nav-link" href="#home" onClick={onNavClick}>Home</a>
            </li>
            <li>
              <a className="footer-nav-link" href="#explore" onClick={onNavClick}>Explore</a>
            </li>
            <li>
              <a className="footer-nav-link" href="#submit" onClick={onNavClick}>Submit Activity</a>
            </li>
            <li>
              <a className="footer-nav-link" href="#settings" onClick={onNavClick}>Settings</a>
            </li>
          </ul>
        </nav>

        <div className="footer-info">
          <p className="footer-tagline">
            Discover great things to do on the island.
          </p>
          <p className="footer-copy">
            &copy; 2026 Alameda Explorer. Built for INFO 6150.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;