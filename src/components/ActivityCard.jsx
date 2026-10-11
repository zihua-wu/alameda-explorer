import './ActivityCard.css';

function ActivityCard({ activity, onViewActivity }) {
    const categoryLabels = {
    'outdoor': 'Outdoor',
    'shopping': 'Shopping',
    'entertainment': 'Entertainment',
    'dog-friendly': 'Dog-Friendly',
  };

  return (
    <article className="activity-card">
      <div className="activity-card-image-wrap">
        <img
          className="activity-card-image"
          src={activity.image}
          alt={activity.alt}
          loading="lazy"
        />
      </div>
      <div className="activity-card-body">
        <span className="activity-card-tag">
          {categoryLabels[activity.category] || activity.category}
        </span>
        <h3 className="activity-card-title">{activity.name}</h3>
        <p className="activity-card-desc">{activity.shortDescription}</p>
        <div className="activity-card-footer">
          <span className="activity-card-cost">{activity.cost}</span>
          <a
            className="activity-card-btn"
            href="#detail"
            onClick={() => onViewActivity(activity.id)}
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}

export default ActivityCard;