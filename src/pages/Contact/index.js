import { useState } from 'react';
import './contactForm.css';
import AlumniDirectory from '../../components/AlumniDirectory';
import { addAlumnusToDirectory } from '../../services/alumniDirectory';

const currentYear = new Date().getFullYear();
const passingYears = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => currentYear - index);
const interestOptions = [
  'Mentoring students',
  'Contributing to the school',
  'Organising events',
  'Networking with alumni',
  'Other support',
];

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [directoryError, setDirectoryError] = useState('');

  async function submitRegistration(event) {
    event.preventDefault();
    setStatus('submitting');
    setError('');
    setDirectoryError('');

    const form = new FormData(event.currentTarget);
    const name = form.get('name')?.toString().trim() || '';
    const batchYear = form.get('batch_year')?.toString() || '';
    const email = form.get('email')?.toString().trim() || '';
    const mobilePrimary = form.get('mobile_primary')?.toString().trim() || '';
    const participation = form.get('participation')?.toString() || '';
    const areasOfInterest = form.getAll('areas_of_interest').map((value) => value.toString());
    const otherSupport = form.get('other_support')?.toString().trim() || '';
    const publicConsent = form.get('show_in_directory') === 'on';

    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_73fq63c';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_q83fs0d';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'MmntosZE5j1lwqQyd';
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
            name,
            batch_year: batchYear,
            class_section: form.get('class_section') || '',
            date_of_birth: form.get('date_of_birth') || '',
            profession: form.get('profession') || '',
            organization: form.get('organization') || '',
            address: form.get('address') || '',
            city: form.get('city') || '',
            pin_code: form.get('pin_code') || '',
            state: form.get('state') || '',
            email,
            phone: mobilePrimary,
            mobile_primary: mobilePrimary,
            mobile_secondary: form.get('mobile_secondary') || '',
            participation,
            interest: areasOfInterest.join(', ') || 'No areas selected',
            areas_of_interest: areasOfInterest.join(', ') || 'No areas selected',
            other_support: otherSupport || '—',
            declaration: 'Accepted',
            show_in_directory: publicConsent ? 'Yes — may display my name and batch' : 'No',
            submitted_at: new Date().toLocaleString(),
          },
        }),
      });

      if (!response.ok) {
        const reason = await response.text();
        throw new Error(reason || 'Email delivery failed. Please try again.');
      }
      if (publicConsent) {
        try {
          await addAlumnusToDirectory(name, batchYear);
          window.dispatchEvent(new Event('santhome:alumni-updated'));
        } catch (directoryRequestError) {
          setDirectoryError(`Your email registration was sent, but we could not update the public list: ${directoryRequestError.message}`);
        }
      }
      setStatus('success');
    } catch (requestError) {
      setStatus('error');
      setError(requestError.message || 'Could not connect to the registration service. Please try again.');
    }
  }

  return (
    <main className="inner-page contact-page">
      <div className="inner-hero motion-reveal">
        <p className="eyebrow">04 / YOUR PLACE IS HERE</p>
        <h1 className="type-display">Let’s find<br/><em>each other.</em></h1>
        <p>Whether you left last year or fifty years ago, there’s a place for you in the Santhome family.</p>
      </div>

      <div className="contact-grid motion-reveal">
        <div className="contact-info">
          <div className="contact-intro-copy">
            <div className="section-kicker">THE FIRST STEP HOME</div>
            <h2 className="type-section">Two minutes.<br/><em>A lifetime of connection.</em></h2>
            <p>Share a few details so we can reconnect you with your batch, invite you to events and find ways to give back.</p>
          </div>
          <div className="contact-details">
            <div className="contact-detail"><span>WRITE TO US</span><a href="mailto:shssaa.1821@gmail.com">shssaa.1821@gmail.com ↗</a></div>
            <div className="contact-detail"><span>GIVE US A CALL</span><a href="tel:+919884485511">+91 98844 85511 ↗</a></div>
            <div className="contact-detail"><span>COME SAY HELLO</span><p>143 Santhome High Road<br/>Mylapore, Chennai — 600004</p></div>
          </div>
        </div>

        <form className="register-form alumni-form" onSubmit={submitRegistration}>
          <div className="alumni-form-heading">
            <div className="section-kicker">SANTHOME HIGHER SECONDARY SCHOOL</div>
            <h2>Alumni registration</h2>
            <p>Once a Santhomite, always a Santhomite. Fields marked <span aria-hidden="true">*</span> are required.</p>
          </div>

          {status === 'success' ? (
            <div className="form-success" role="status"><span>✳</span><h2 className="type-section">You’re home.</h2><p>Thank you for reconnecting. We’ll be in touch soon.</p></div>
          ) : (
            <>
              <section className="alumni-form-section" aria-labelledby="personal-details-heading">
                <div className="alumni-form-section-title"><span>01</span><h3 id="personal-details-heading">Your details</h3></div>
                <label className="alumni-field alumni-field-wide">Full name <i>*</i><input name="name" required autoComplete="name" placeholder="Your full name" /></label>
                <div className="alumni-field-grid">
                  <label className="alumni-field">Batch / year of passing <i>*</i>
                    <select name="batch_year" required defaultValue="">
                      <option value="" disabled>Select your passing year</option>
                      {passingYears.map((year) => <option key={year} value={year}>{year}</option>)}
                      <option value="Not sure">I’m not sure</option>
                    </select>
                  </label>
                  <label className="alumni-field">Class / section<input name="class_section" placeholder="e.g. 12-A" /></label>
                  <label className="alumni-field">Date of birth<input name="date_of_birth" type="date" autoComplete="bday" /></label>
                  <label className="alumni-field">Current profession / designation<input name="profession" autoComplete="organization-title" placeholder="e.g. Teacher, Engineer" /></label>
                  <label className="alumni-field alumni-field-wide">Organisation / company<input name="organization" autoComplete="organization" placeholder="Your organisation (optional)" /></label>
                </div>
              </section>

              <section className="alumni-form-section" aria-labelledby="contact-details-heading">
                <div className="alumni-form-section-title"><span>02</span><h3 id="contact-details-heading">How to reach you</h3></div>
                <label className="alumni-field alumni-field-wide">Residential address<textarea name="address" rows="2" autoComplete="street-address" placeholder="Street, area and address" /></label>
                <div className="alumni-field-grid alumni-address-grid">
                  <label className="alumni-field">City<input name="city" autoComplete="address-level2" placeholder="City" /></label>
                  <label className="alumni-field">PIN / postal code<input name="pin_code" autoComplete="postal-code" inputMode="text" placeholder="Postal code" /></label>
                  <label className="alumni-field alumni-field-wide">State / province / country<input name="state" autoComplete="address-level1" placeholder="State, province or country" /></label>
                  <label className="alumni-field">Mobile number 1 <i>*</i><input name="mobile_primary" required type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+() .-]{8,20}" title="Enter a phone number with 8 to 20 digits, spaces, or + ( ) - characters" placeholder="e.g. +91 98765 43210" /></label>
                  <label className="alumni-field">Mobile number 2<input name="mobile_secondary" type="tel" autoComplete="tel-national" inputMode="tel" pattern="[0-9+() .-]{8,20}" title="Enter a phone number with 8 to 20 digits, spaces, or + ( ) - characters" placeholder="Optional" /></label>
                  <label className="alumni-field alumni-field-wide">Email address <i>*</i><input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label>
                </div>
              </section>

              <section className="alumni-form-section" aria-labelledby="participation-heading">
                <div className="alumni-form-section-title"><span>03</span><h3 id="participation-heading">Stay involved</h3></div>
                <fieldset className="alumni-choice-group">
                  <legend>I’m interested in participating in alumni activities <i>*</i></legend>
                  <div className="alumni-choice-options alumni-radio-options">
                    {['Yes', 'Maybe', 'Not at the moment'].map((choice) => (
                      <label className="alumni-choice" key={choice}><input type="radio" name="participation" value={choice} required /><span>{choice}</span></label>
                    ))}
                  </div>
                </fieldset>
                <label className="alumni-choice alumni-directory-consent"><input type="checkbox" name="show_in_directory" required /><span>I understand that submitting this form will add my name and batch year to the public alumni list. <i>*</i></span></label>
                <fieldset className="alumni-choice-group alumni-areas-group">
                  <legend>Areas of interest <small>(optional)</small></legend>
                  <div className="alumni-choice-options alumni-interest-options">
                    {interestOptions.map((choice) => (
                      <label className="alumni-choice" key={choice}><input type="checkbox" name="areas_of_interest" value={choice} /><span>{choice}</span></label>
                    ))}
                  </div>
                  <label className="alumni-field alumni-other-support">If other, tell us how you’d like to help<input name="other_support" placeholder="Your idea (optional)" /></label>
                </fieldset>
              </section>

              <section className="alumni-declaration">
                <h3>Declaration</h3>
                <label className="alumni-declaration-check"><input type="checkbox" name="declaration_check" required /><span>I confirm that the information I have provided is true and correct to the best of my knowledge. <i>*</i></span></label>
              </section>

              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button-dark submit-button" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : <>Submit registration <span>↗</span></>}</button>
              <small className="alumni-form-footnote">Your information will be used by the Santhome HSS Alumni Association to contact you about alumni activities.</small>
            </>
          )}
        </form>
        <AlumniDirectory />
        {directoryError && <p className="form-error" role="alert">{directoryError}</p>}
      </div>
    </main>
  );
}
