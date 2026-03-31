import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
export default function Contact() {
  return (
    <div className="page">
      <div className="contact-banner">
        <h2 className="banner-text">Get in touch</h2>
        <h1>We'd love to <span className="banner-span">hear</span> from you</h1>
        <p>Have a question about an order, a product, or just want to say hello?
          Drop us a message and we'll get to you as soon as possible.</p>
      </div>
      <div className="contact-container">
        <div className="contact-section">
          <div className="contact-map">
            <iframe src="https://www.google.com/maps?q=Thurso&output=embed"
              width="100%" height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"></iframe>
          </div>

          <div className="contact-page">
            <form className="contact-form">
              <p className="modal-text">Send a message</p>
              <h2>Contact Us</h2>
              <div className="modal-field">
                <label className="modal-label">First name</label>
                <input type="text" className="modal-input" />
              </div>
              <div className="modal-field">
                <label className="modal-label">Surname</label>
                <input type="text" className="modal-input" />
              </div>
              <div className="modal-field">
                <label className="modal-label">Email</label>
                <input type="text" className="modal-input" />
              </div>
              <div className="modal-field">
                <label className="modal-label">Subject</label>
                <select className="modal-input">
                  <option value="Select">Select a topic</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Delivery">Delivery</option>
                  <option value="General">General Question</option>
                </select>
              </div>
              <div className="modal-field">
                <label className="modal-label">Message</label>
                <input type="text" className="modal-input" />
              </div>
              <button className="modal-submit">Submit</button>
            </form>
            <div className="contact-details-grid">

              <div className="contact-card">
                <Mail className="contact-icon"></Mail>
                <p>-add email here-</p>
              </div>

              <div className="contact-card">
                <Phone className="contact-icon"></Phone>
                <p>-add phone here-</p>
              </div>

              <div className="contact-card">
                <MapPin className="contact-icon"></MapPin>
                <p>Thurso, UK</p>
              </div>

              <div className="contact-card">
                <MessageCircle className="contact-icon"></MessageCircle>
                <p>Coming soon...</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div >
  )
}