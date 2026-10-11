import { useState, useId } from 'react';
import './SubmitPage.css';

function SubmitPage({ onSubmit }) {
  const id = useId();

  const [activityName, setActivityName] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [dogFriendly, setDogFriendly] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const categoryLabels = {
    'outdoor': 'Outdoor',
    'shopping': 'Shopping',
    'entertainment': 'Entertainment',
    'dog-friendly': 'Dog-Friendly',
    'other': 'Other',
  };

  function validateAll() {
    const newErrors = {};

    if (!activityName.trim()) {
      newErrors.activityName = 'Activity name is required.';
    }

    if (!category) {
      newErrors.category = 'Please select a category.';
    }

    if (category === 'other' && !otherCategory.trim()) {
      newErrors.otherCategory = 'Please specify the category.';
    }

    if (!cost.trim()) {
      newErrors.cost = 'Cost information is required.';
    } else if (cost.trim() !== 'Free' && !/^\d+(\.\d{0,2})?$/.test(cost.trim())) {
      newErrors.cost = 'Please enter a number (e.g., 10, 15.50) or "Free".';
    }

    if (!description.trim()) {
      newErrors.description = 'A description is required.';
    } else if (description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters.';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }

    return newErrors;
  }

  function handleFieldChange(setter) {
    return function onChange(e) {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setter(value);
    };
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    setCategory(value);
    if (value !== 'other') {
      setOtherCategory('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setShowPreview(true);
  }

  function handleConfirm() {
    onSubmit({
      activityName: activityName.trim(),
      category: category === 'other' ? otherCategory.trim() : category,
      cost: cost.trim(),
      description: description.trim(),
      address: address.trim(),
      dogFriendly: dogFriendly,
    });

    setSubmitSuccess(true);
    setShowPreview(false);
    setActivityName('');
    setCategory('');
    setOtherCategory('');
    setCost('');
    setDescription('');
    setAddress('');
    setDogFriendly(false);
    setHasAttemptedSubmit(false);
    setErrors({});
  }

  function handleEidt() {
    setShowPreview(false);
  }

  function getDisplayCategory() {
    if (category === 'other') {
      return otherCategory.trim() || 'Other';
    }
    return categoryLabels[category] || category;
  }

  if (showPreview) {
    return (
      <div className="submit-page">
        <div className="submit-header">
          <h1 className="submit-title">Submit an Activity</h1>
          <p className="submit-subtitle">
            Please review the details below. If everything looks correct,
            click Confirm to submit.
          </p>
        </div>

        <div className="preview-card">
          <div className="preview-item">
            <span className="preview-label">Activity Name:</span>
            <span className="preview-value">{activityName}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Category:</span>
            <span className="preview-value">{getDisplayCategory()}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Cost:</span>
            <span className="preview-value">
              {cost.trim() === 'Free' ? 'Free' : '$' + cost.trim()}
            </span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Description:</span>
            <span className="preview-value">{description}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Address:</span>
            <span className="preview-value">{address}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Dog-Friendly:</span>
            <span className="preview-value">{dogFriendly ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className="preview-actions">
          <button
            className="preview-btn preview-btn-edit"
            type="button"
            onClick={handleEidt}
          >
            Go Back and Edit
          </button>
        <button
            className="preview-btn preview-btn-confirm"
            type="button"
            onClick={handleConfirm}
          >
            Confirm and Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <div className="submit-header">
        <h1 className="submit-title">Submit an Activity</h1>
        <p className="submit-subtitle">
          Know a great activity in Alameda that’s not listed here? Share it with us!
          Fill out the form below to submit your recommendation. After you submit,
          our team will review the information and add it to the site if it meets
          our guidelines.
        </p>
      </div>

      {submitSuccess && (
        <div className="submit-success" role="alert">
          <p className="submit-success-text">
            Thank you! Your activity has been submitted successfully.
          </p>
        </div>
      )}

      <form className="submit-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor={id + '-name'}>
            Activity Name
            <span className="form-required" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            className={'form-input' + (errors.activityName ? ' form-input-error' : '')}
            id={id + '-name'}
            type="text"
            value={activityName}
            onChange={handleFieldChange(setActivityName)}
            autoComplete="off"
          />
          {errors.activityName && (
            <span className="form-error" role="alert">
              {errors.activityName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor={id + '-category'}>
            Category
            <span className="form-required" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <select
            className={'form-select' + (errors.category ? ' form-input-error' : '')}
            id={id + '-category'}
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Please select</option>
            <option value="outdoor">Outdoor</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="dog-friendly">Dog-Friendly</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <span className="form-error" role="alert">
              {errors.category}
            </span>
          )}
        </div>

        {category === 'other' && (
          <div className="form-group form-group-indent">
            <label className="form-label" htmlFor={id + '-other'}>
              Specify Category
              <span className="form-required" aria-hidden="true"> *</span>
              <span className="sr-only"> (required)</span>
            </label>
            <input
              className={'form-input' + (errors.otherCategory ? ' form-input-error' : '')}
              id={id + '-other'}
              type="text"
              value={otherCategory}
              onChange={handleFieldChange(setOtherCategory)}
              placeholder="e.g., Fitness, Art, Education"
              autoComplete="off"
            />
            {errors.otherCategory && (
              <span className="form-error" role="alert">
                {errors.otherCategory}
              </span>
            )}
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor={id + '-cost'}>
            Cost
            <span className="form-required" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <div className="form-input-with-prefix">
            <span className="form-input-prefix" aria-hidden="true">$</span>
            <input
              className={'form-input form-input-prefixed' + (errors.cost ? ' form-input-error' : '')}
              id={id + '-cost'}
              type="text"
              value={cost}
              onChange={handleFieldChange(setCost)}
              placeholder='e.g., Free, 10, 15.50'
              autoComplete="off"
            />
          </div>
          {errors.cost && (
            <span className="form-error" role="alert">
              {errors.cost}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor={id + '-description'}>
            Description
            <span className="form-required" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <textarea
            className={'form-textarea' + (errors.description ? ' form-input-error' : '')}
            id={id + '-description'}
            value={description}
            onChange={handleFieldChange(setDescription)}
            rows="4"
          ></textarea>
          {errors.description && (
            <span className="form-error" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor={id + '-address'}>
            Address
            <span className="form-required" aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            className={'form-input' + (errors.address ? ' form-input-error' : '')}
            id={id + '-address'}
            type="text"
            value={address}
            onChange={handleFieldChange(setAddress)}
            autoComplete="street-address"
          />
          {errors.address && (
            <span className="form-error" role="alert">
              {errors.address}
            </span>
          )}
        </div>

        <div className="form-group-checkbox">
          <input
            className="form-checkbox"
            id={id + '-dog'}
            type="checkbox"
            checked={dogFriendly}
            onChange={handleFieldChange(setDogFriendly)}
          />
          <label className="form-label-checkbox" htmlFor={id + '-dog'}>
            This activity is dog-friendly
          </label>
        </div>

        <p className="form-note">
          <span aria-hidden="true">*</span> Required fields
        </p>

        <button className="form-submit-btn" type="submit">
          Submit Activity
        </button>
      </form>
    </div>
  );
}

export default SubmitPage;