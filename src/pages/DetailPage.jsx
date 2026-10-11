import './DetailPage.css';

function DetailPage({ activity, onBack }) {
  const categoryLabels = {
    'outdoor': 'Outdoor',
    'shopping': 'Shopping',
    'entertainment': 'Entertainment',
    'dog-friendly': 'Dog-Friendly',
  };

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img
          className="detail-hero-image"
          src={activity.image}
          alt={activity.alt}
        />
      </div>

      <div className="detail-content">
        <a
          className="detail-back-btn"
          href='#explore'
          onClick={onBack}
        >
          &larr; Back to Explore
        </a>

        <div className="detail-header">
          <span className="detail-tag">
            {categoryLabels[activity.category] || activity.category}
          </span>
          <h1 className="detail-title">{activity.name}</h1>
        </div>

        <div className="detail-meta">
          <div className="detail-meta-item">
            <span className="detail-meta-label">Cost</span>
            <span className="detail-meta-value">{activity.cost}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Hours</span>
            <span className="detail-meta-value">{activity.hours}</span>
          </div>
          <div className="detail-meta-item">
            <span className="detail-meta-label">Dog-Friendly</span>
            <span className="detail-meta-value">
              {activity.dogFriendly ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div className="detail-body">
          <h2 className="detail-body-heading">About This Activity</h2>
          <p className="detail-body-text">
            {activity.fullDescription}
          </p>
        </div>

        <div className="detail-location">
          <h2 className="detail-location-heading">Location</h2>
          <address className="detail-address">
            {activity.address}
          </address>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;