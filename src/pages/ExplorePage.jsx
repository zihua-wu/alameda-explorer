import { useState, useId } from 'react';
import './ExplorePage.css';
import ActivityCard from '../components/ActivityCard.jsx';
import { categories } from '../data/activities.js';

function ExplorePage({ activities, onViewActivity }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const id = useId();

  function handleCategoryChange(e) {
    setActiveCategory(e.target.value);
  }

  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }

  const filteredActivities = activities.filter(
    function matchCategory(activity) {
      if (activeCategory === 'all') {
        return true;
      }
      if (activeCategory === 'dog-friendly') {
        return activity.dogFriendly;
      }
      return activity.category === activeCategory;
    }
  );

  const sortedActivities = [...filteredActivities].sort(
    function compareActivities(a, b) {
      switch (sortOrder) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'cost-low':
          return a.cost.localeCompare(b.cost);
        case 'cost-high':
          return b.cost.localeCompare(a.cost);
        default:
          return a.name.localeCompare(b.name);
      }
    }
  );

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore Activities</h1>
        <p className="explore-subtitle">
          Browse all {activities.length} activities in Alameda. Use the filters
          to find exactly what you are looking for.
        </p>
      </div>

      <div className="explore-controls">
        <div className="explore-filter">
          <label className="explore-label" htmlFor={id + '-category'}>
            Category
          </label>
          <select
            className="explore-select"
            id={id + '-category'}
            value={activeCategory}
            onChange={handleCategoryChange}
          >
            {categories.map(function renderOption(cat) {
              return (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="explore-filter">
          <label className="explore-label" htmlFor={id + '-sort'}>
            Sort by
          </label>
          <select
            className="explore-select"
            id={id + '-sort'}
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="cost-low">Cost (Low first)</option>
            <option value="cost-high">Cost (High first)</option>
          </select>
        </div>

        <p className="explore-count" aria-live="polite">
          Showing {sortedActivities.length} of {activities.length} activities
        </p>
      </div>

      {sortedActivities.length > 0 ? (
        <div className="explore-grid">
          {sortedActivities.map(function renderCard(activity) {
            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onViewActivity={onViewActivity}
              />
            );
          })}
        </div>
      ) : (
        <div className="explore-empty">
          <p className="explore-empty-text">
            No activities found for this category. Try selecting a different filter.
          </p>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;