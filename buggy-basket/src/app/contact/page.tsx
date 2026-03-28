export default function Contact() {
  return (
    <div className="page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-section">

          <div className="contact-map">
            <iframe src="https://www.google.com/maps?q=Thurso&output=embed"
              width="100%" height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"></iframe>
          </div>

          <form className="contact-form">
            <h2>Have an enquiry?</h2>
            <div className="modal-field">
              <label className="modal-label">Name</label>
              <input type="text" className="modal-input" />
            </div>
            <div className="modal-field">
              <label className="modal-label">Email</label>
              <input type="text" className="modal-input" />
            </div>
            <div className="modal-field">
              <label className="modal-label">Message</label>
              <input type="text" className="modal-input" />
            </div>
            <button className="modal-submit">Submit</button>
          </form>
          <div className="contact-page">
            <div className="contact-info">
              <h2>Get in touch</h2>
              <br />
              <p>Email: Contact@buggybasket.co.uk</p>
              <br />
              <p>Phone: (Phone number here)</p>
              <br />
              <p>Location: Thurso, Scotland, UK</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}