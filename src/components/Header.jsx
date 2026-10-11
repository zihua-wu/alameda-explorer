import { useState } from 'react';
import './Header.css';

function Header({ page, onNavClick, username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLinkClick(e) {
    onNavClick(e);
    closeMenu();
  }

  function handleMenuKeyDown(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  }

  const navLinks = [
    { hash: '#home', label: 'Home' },
    { hash: '#explore', label: 'Explore' },
    { hash: '#submit', label: 'Submit Activity' },
    { hash: '#settings', label: 'Settings' },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="header-logo" href="#home" onClick={handleLinkClick}>
          <svg
            className="header-logo-icon"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
          </svg>
          Alameda Explorer
        </a>

        <span className="header-greeting">
          Hello, {username}
        </span>

        <button
          className="hamburger-btn"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
        </button>

        <nav
          className={'site-nav' + (isMenuOpen ? ' site-nav-open' : '')}
          aria-label="Main navigation"
          onKeyDown={handleMenuKeyDown}
        >
          <ul className="nav-list">
            {navLinks.map(function renderLink(link) {
              const isCurrent = page === link.hash ||
                (link.hash === '#home' && (page === '' || page === '#'));
              return (
                <li className="nav-item" key={link.hash}>
                  <a
                    className={'nav-link' + (isCurrent ? ' nav-link-current' : '')}
                    href={link.hash}
                    onClick={handleLinkClick}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;