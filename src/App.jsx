import { useState, useEffect, useRef } from 'react';
import './App.css';
import SkipLink from './components/SkipLink.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import SubmitPage from './pages/SubmitPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { activities } from './data/activities.js';

function App() {
  const [page, setPage] = useState(window.location.hash || '#home');
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('Explorer');
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const dialogRef = useRef(null);

  useEffect(function listenForHashChanges() {
    function onHashChange() {
      setPage(window.location.hash || '#home');
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', onHashChange);
    return function cleanup() {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  function navToPage(hash) {
    window.location.hash = hash;
  }

  function handleNavClick(e) {
    e.preventDefault();
    const hash = e.currentTarget.hash;
    navToPage(hash);
  }

  function viewActivity(activityId) {
    setSelectedActivityId(activityId);
    navToPage('#detail');
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function openModal() {
    dialogRef.current.showModal();
    setIsModalOpen(true);
  }

  function closeModal() {
    dialogRef.current.close();
  }

  function handleDialogClose() {
    setIsModalOpen(false);
  }

  function handleUsernameChange(newName) {
    setUsername(newName);
    closeModal();
  }

  function handleSubmission(data) {
    setSubmissions([...submissions, data]);
  }

  const selectedActivity = activities.find(
    function findActivity(a) { return a.id === selectedActivityId; }
  ) || activities[0];

  const themeClass = theme === 'dark' ? 'theme-dark' : '';

  function renderPage() {
    switch (page) {
      case '#explore':
        return (
          <ExplorePage
            activities={activities}
            onViewActivity={viewActivity}
          />
        );
      case '#detail':
        return (
          <DetailPage
            activity={selectedActivity}
            onBack={function goBack() { navToPage('#explore'); }}
          />
        );
      case '#submit':
        return (
          <SubmitPage onSubmit={handleSubmission} />
        );
      case '#settings':
        return (
          <SettingsPage
            theme={theme}
            onToggleTheme={toggleTheme}
            username={username}
            onOpenModal={openModal}
          />
        );
      default:
        return (
          <HomePage
            activities={activities}
            onViewActivity={viewActivity}
            onNavClick={handleNavClick}
            username={username}
          />
        );
    }
  }

  return (
    <div className={'app ' + themeClass}>
      <SkipLink />
      <Header
        page={page}
        onNavClick={handleNavClick}
        username={username}
      />
      <main className="main-content" id="main-content">
        {renderPage()}
      </main>
      <Footer onNavClick={handleNavClick} />
      <Modal
        dialogRef={dialogRef}
        isOpen={isModalOpen}
        onClose={handleDialogClose}
        currentUsername={username}
        onSave={handleUsernameChange}
      />
    </div>
  );
}

export default App;
