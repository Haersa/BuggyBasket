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

            <form className="contact-form">
              <h2>Have an enquiry?</h2>
              <input type="text" placeholder="Your Name" />
              <input type="text" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}