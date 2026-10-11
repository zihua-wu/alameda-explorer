import './SettingsPage.css';

function SettingsPage({ theme, onToggleTheme, username, onOpenModal }) {
  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">
        Customize your Alameda Explorer experience.
      </p>

      <div className="settings-card">
        <div className="settings-item">
          <div className="settings-item-info">
            <h2 className="settings-item-title">Display Name</h2>
            <p className="settings-item-desc">
              Your current display name is shown in the header and on the
              home page greeting.
            </p>
            <p className="settings-item-current">
              Currently set to: <strong>{username}</strong>
            </p>
          </div>
          <button
            className="settings-btn"
            type="button"
            onClick={onOpenModal}
          >
            Change Name
          </button>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-item">
          <div className="settings-item-info">
            <h2 className="settings-item-title">Theme</h2>
            <p className="settings-item-desc">
              Switch between light and dark themes. Your preference applies to
              all pages.
            </p>
            <p className="settings-item-current">
              Currently using: <strong>{theme === 'light' ? 'Light' : 'Dark'} theme</strong>
            </p>
          </div>
          <button
            className="settings-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme'}
          >
            {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-item">
          <div className="settings-item-info">
            <h2 className="settings-item-title">About This App</h2>
            <p className="settings-item-desc">
              Alameda Explorer is a React-based single page application built
              to help residents and visitors discover activities on the island.
              Built with Vite and React, following best practices for
              accessibility, responsive design, and semantic HTML.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;