import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submitRegistration(event) {
    event.preventDefault();
    setStatus('submitting');
    setError('');
    const values = new FormData(event.currentTarget);
    const payload = {
      name: values.get('name'),
      batchYear: values.get('batchYear'),
      email: values.get('email'),
      phone: values.get('phone'),
      interest: values.get('interest'),
    };
    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_73fq63c';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email delivery is not configured yet. Please contact us directly at shssaa.1821@gmail.com.');
      }

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            to_email: 'shssaa.1821@gmail.com',
            name: payload.name,
            batch_year: payload.batchYear,
            email: payload.email,
            phone: payload.phone,
            interest: payload.interest,
            submitted_at: new Date().toLocaleString(),
          },
        }),
      });
      if (!response.ok) {
        const reason = await response.text();
        throw new Error(reason || 'Email delivery failed. Please try again.');
      }
      setStatus('success');
    } catch (requestError) {
      setStatus('error');
      setError(requestError.message || 'Could not connect to the registration service. Please try again.');
    }
  }

  return (
    <main className="inner-page contact-page">
      <div className="inner-hero motion-reveal"><p className="eyebrow">04 / YOUR PLACE IS HERE</p><h1 className="type-display">Let’s find<br/><em>each other.</em></h1><p>Whether you left last year or fifty years ago, there’s a place for you in the Santhome family.</p></div>
      <div className="contact-grid motion-reveal">
        <div className="contact-info"><div className="section-kicker">THE FIRST STEP HOME</div><h2 className="type-section">Two minutes.<br/><em>A lifetime of connection.</em></h2><p>Register your details and we’ll help you reconnect with your batch, hear about upcoming events and find ways to give back.</p>
          <div className="contact-detail"><span>WRITE TO US</span><a href="mailto:shssaa.1821@gmail.com">shssaa.1821@gmail.com ↗</a></div>
          <div className="contact-detail"><span>GIVE US A CALL</span><a href="tel:+919884485511">+91 98844 85511 ↗</a></div>
          <div className="contact-detail"><span>COME SAY HELLO</span><p>143 Santhome High Road<br/>Mylapore, Chennai — 600004</p></div>
        </div>
        <form className="register-form" onSubmit={submitRegistration}>
          <div className="section-kicker">ALUMNI REGISTRATION</div>
          {status === 'success' ? <div className="form-success" role="status"><span>✳</span><h2 className="type-section">You’re home.</h2><p>Thank you for reconnecting. We’ll be in touch soon.</p></div> : <>
            <label>Your name<input name="name" required autoComplete="name" placeholder="As your classmates know you"/></label>
            <div className="form-row"><label>Batch year<input name="batchYear" required inputMode="numeric" pattern="(?:19|20)\d{2}" placeholder="e.g. 1992"/></label><label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com"/></label></div>
            <label>Phone number<input name="phone" required type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+() .-]{8,20}" title="Enter a phone number with 8 to 20 digits, spaces, or + ( ) - characters" placeholder="e.g. +91 98765 43210"/></label>
            <label>What would you like to do?<select name="interest" defaultValue="" required><option value="" disabled>Select a way to reconnect</option><option>Find my batchmates</option><option>Attend an event</option><option>Mentor current students</option><option>Share a school memory</option></select></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button-dark submit-button" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : <>Join the family <span>↗</span></>}</button>
            <small>Your details help us bring the Santhome family together.</small>
          </>}
        </form>
      </div>
    </main>
  );
}
