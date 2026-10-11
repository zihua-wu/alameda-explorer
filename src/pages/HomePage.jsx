import './HomePage.css';
import ActivityCard from '../components/ActivityCard.jsx';

function HomePage({ activities, onViewActivity, onNavClick, username }) {
  const featuredActivities = activities.filter(
    function isFeatured(a) { return a.featured; }
  );

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Explore Alameda
          </h1>
          <p className="hero-subtitle">
            Welcome back, {username}! Discover great activities
            across the island — beaches, trails, local shops, and more.
          </p>
          <a
            className="hero-cta"
            href="#explore"
            onClick={onNavClick}
          >
            Browse All Activities
          </a>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-heading">Featured Activities</h2>
        <p className="section-intro">
          Hand-picked recommendations to get you started. From sandy beaches to
          hands-on museums, these are some of the best things Alameda has to offer.
        </p>
        <div className="featured-grid">
          {featuredActivities.map(function renderCard(activity) {
            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onViewActivity={onViewActivity}
              />
            );
          })}
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2 className="section-heading">Why Alameda?</h2>
          <p className="about-text">
            Alameda is a small island city nestled in the San Francisco Bay, known for
            its tree-lined Victorian streets, beautiful waterfront views, and
            tight-knit community. Despite being just minutes from Oakland and San
            Francisco, Alameda maintains a relaxed, small-town atmosphere that makes
            it a unique destination in the Bay Area.
          </p>
          <p className="about-text">
            From the sandy shores of Crown Beach to the Alameda Point, 
            there is no shortage of things to do. Whether
            you are a longtime resident or a first-time visitor, Alameda Explorer
            helps you find activities that fit your interests and your budget.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;