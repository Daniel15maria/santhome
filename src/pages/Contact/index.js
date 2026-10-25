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
      interest: values.get('interest'),
      newsletter: values.get('newsletter') === 'on',
    };
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Registration could not be saved.');
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
          <div className="contact-detail"><span>WRITE TO US</span><a href="mailto:Karthik.b2@gmail.com">Karthik.b2@gmail.com ↗</a></div>
          <div className="contact-detail"><span>GIVE US A CALL</span><a href="tel:+919884485511">+91 98844 85511 ↗</a></div>
          <div className="contact-detail"><span>COME SAY HELLO</span><p>143 Santhome High Road<br/>Mylapore, Chennai — 600004</p></div>
        </div>
        <form className="register-form" onSubmit={submitRegistration}>
          <div className="section-kicker">ALUMNI REGISTRATION</div>
          {status === 'success' ? <div className="form-success" role="status"><span>✳</span><h2 className="type-section">You’re home.</h2><p>Thank you for reconnecting. We’ll be in touch soon.</p></div> : <>
            <label>Your name<input name="name" required autoComplete="name" placeholder="As your classmates know you"/></label>
            <div className="form-row"><label>Batch year<input name="batchYear" required inputMode="numeric" pattern="(?:19|20)\d{2}" placeholder="e.g. 1992"/></label><label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com"/></label></div>
            <label>What would you like to do?<select name="interest" defaultValue="" required><option value="" disabled>Select a way to reconnect</option><option>Find my batchmates</option><option>Attend an event</option><option>Mentor current students</option><option>Share a school memory</option></select></label>
            <label className="check-label"><input name="newsletter" type="checkbox"/> I’d like to hear about reunions and alumni news.</label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button-dark submit-button" disabled={status === 'submitting'}>{status === 'submitting' ? 'Saving…' : <>Join the family <span>↗</span></>}</button>
            <small>Your details help us bring the Santhome family together.</small>
          </>}
        </form>
      </div>
    </main>
  );
}
