import { useState, useId } from 'react';
import './Modal.css';

function Modal({ dialogRef, isOpen, onClose, currentUsername, onSave }) {
  const [nameValue, setNameValue] = useState('');
  const [error, setError] = useState('');
  const id = useId();

  function validate(value) {
    if (!value.trim()) {
      return 'Display name cannot be empty.';
    }
    if (value.trim().length < 2) {
      return 'Display name must be at least 2 characters.';
    }
    if (value.trim().length > 20) {
      return 'Display name must be 20 characters or fewer.';
    }
    return '';
  }

  function handleChange(e) {
    setNameValue(e.target.value);
    if (error) {
      setError(validate(e.target.value));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate(nameValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave(nameValue.trim());
    setError('');
  }

  function handleCancel() {
    setError('');
    dialogRef.current.close();
  }

  function handleDialogClose() {
    onClose();
  }

  return (
    <dialog
      className="modal-dialog"
      ref={dialogRef}
      onClose={handleDialogClose}
      aria-labelledby={id + '-title'}
    >
      {isOpen && (
        <div className="modal-content">
          <h2 className="modal-title" id={id + '-title'}>
            Change Display Name
          </h2>
          <p className="modal-description">
            Your display name appears in the header and on the home page greeting.
          </p>

          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="modal-field">
              <label className="modal-label" htmlFor={id + '-name'}>
                Display Name
              </label>
              <input
                className={'modal-input' + (error ? ' modal-input-invalid' : '')}
                id={id + '-name'}
                type="text"
                value={nameValue}
                onChange={handleChange}
                autoComplete="name"
              />
              {error && (
                <span className="modal-error" role="alert">
                  {error}
                </span>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-cancel"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="modal-btn modal-btn-save"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
}

export default Modal;