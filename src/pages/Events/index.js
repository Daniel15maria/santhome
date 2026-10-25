import { useState } from 'react';
import alumniPhoto from '../../assets/images/site/alumni-friends-gathering.jpg';

export default function EventsPage() {
  const [interested, setInterested] = useState(false);
  return (
    <main className="inner-page">
      <div className="inner-hero motion-reveal"><p className="eyebrow">02 / GATHER AGAIN</p><h1 className="type-display">Make a date<br/>with <em>your people.</em></h1><p>Old stories are even better when everyone’s in the room. Find your next Santhome gathering.</p></div>
      <div className="events-layout motion-reveal">
        <div className="event-feature"><img src={alumniPhoto} alt="Friends standing together at sunset"/><div className="event-feature-caption"><span>THE BIG ONE · COMING SOON</span><h2 className="type-section">One school.<br/><em>Every generation.</em></h2><p>We’re bringing every batch home for a day of memories, music and new beginnings.</p><button className="button-light" onClick={() => setInterested(true)}>{interested ? 'You’re on the list ✓' : 'Keep me in the loop ↗'}</button></div></div>
        <div className="event-list"><div className="section-kicker">UP NEXT / SAVE YOUR PLACE</div>
          <article><div className="event-date">TBA<span>2026</span></div><div><span className="event-tag">ALL BATCHES</span><h3>Santhome Mega Reunion</h3><p>A day to come home, reconnect and celebrate the school that made us.</p></div><button onClick={() => setInterested(true)} aria-label="Register interest">↗</button></article>
          <article><div className="event-date">TBA<span>2026</span></div><div><span className="event-tag">GIVE BACK</span><h3>Mentor a Santhomite</h3><p>Meet current students and share a little of what your journey has taught you.</p></div><button onClick={() => setInterested(true)} aria-label="Register interest">↗</button></article>
          <article><div className="event-date">TBA<span>2026</span></div><div><span className="event-tag">BY BATCH</span><h3>Batch Reunions</h3><p>Get your classmates together. We’ll help you find the right people.</p></div><button onClick={() => setInterested(true)} aria-label="Register interest">↗</button></article>
          {interested && <p className="inline-success" role="status">Thanks for your interest. Register on the Contact page to receive event updates.</p>}
        </div>
      </div>
    </main>
  );
}
