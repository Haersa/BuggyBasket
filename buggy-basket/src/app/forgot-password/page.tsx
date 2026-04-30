"use client";

export default function PasswordRecovery() {
  return (
    <div className="password-recovery-page">
      <div className="password-recovery-inner">

        <div className="password-recovery-intro">
          <h1 className="password-recovery-title">Password Recovery</h1>
          <p className="password-recovery-subtitle">
            Enter your email address and we&apos;ll send you a reset link.
          </p>
        </div>

        <form className="login-dropdown-form">
          <div className="modal-field">
            <label className="modal-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="modal-input"
            />
          </div>

          <button type="submit" className="modal-submit">
            Send Reset Link
          </button>

          <p className="password-recovery-note">
            We&apos;ll send a secure link to reset your password.
          </p>
        </form>

      </div>
    </div>
  );
}