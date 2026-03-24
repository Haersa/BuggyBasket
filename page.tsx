"use client";

export default function PasswordRecovery() {
  return (
    <div
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="main" style={{ width: "100%", maxWidth: "420px" }}>

        <div className="intro" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1 style={{ marginBottom: "0.5rem" }}>Password Recovery</h1>
          <p style={{ color: "#555", fontSize: "0.95rem" }}>
            Enter your email address and we’ll send you a reset link.
          </p>
        </div>

        <form className="login-dropdown-form">
          <div className="modal-field" style={{ marginBottom: "1.5rem" }}>
            <label className="modal-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="modal-input"
            />
          </div>

          <button type="submit" className="modal-submit" style={{ marginBottom: "1rem" }}>
            Send Reset Link
          </button>

          <p style={{ fontSize: "0.85rem", color: "#666", textAlign: "center" }}>
            We’ll send a secure link to reset your password.
          </p>
        </form>

      </div>
    </div>
  );
}
