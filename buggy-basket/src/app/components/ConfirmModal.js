'use client';

import { X } from 'lucide-react';

export default function ConfirmModal({ title, message, confirmText, onConfirm, onCancel, danger = false }) {
  return (
    <>
      <div className="modal-overlay" onClick={onCancel} />
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <h2 className="confirm-modal-title">{title}</h2>
          <button className="modal-close" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-cancel" onClick={onCancel}>Cancel</button>
          <button
            className={`confirm-modal-confirm ${danger ? 'danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </>
  );
}