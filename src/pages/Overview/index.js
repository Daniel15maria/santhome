import { galleryFolders, getFolderCover } from '../Gallery/galleryData';
import PrincipalWelcome from '../../components/PrincipalWelcome';
import HeritageShelf from './HeritageShelf';

export default function OverviewPage({ go }) {
  return (
    <main className="overview-page">
      <section className="hero hero--video motion-reveal">
        <video className="hero-background-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex="-1">
          <source src={`${process.env.PUBLIC_URL}/videos/santhome-hero.mp4`} type="video/mp4" />
        </video>
        <div className="hero-video-shade" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot" /> WELCOME TO THE SANTHOME HIGHER SECONDARY SCHOOL ALUMNI ASSOCIATION</p>
          <h1 className="type-display">Welcome back<br/>to <em>Santhome.</em></h1>
          <p className="hero-tagline">Time to reminisce, revel and refresh.</p>
          <p className="hero-intro">A homecoming for every Santhomite. Reconnect with old friends, honour the people who shaped us, and help the next generation find its way.</p>
          <div className="hero-actions">
            <button className="button-dark btn-primary" onClick={() => go('Contact')}>Join the family <span>↗</span></button>
            <button className="text-button" onClick={() => document.getElementById('school-story')?.scrollIntoView({ behavior: 'smooth' })}>Our story <span>↓</span></button>
          </div>
          <div className="hero-foot"><span>TRUTH · SERVICE · CHARACTER</span><span>CHENNAI, INDIA</span></div>
        </div>
      </section>

      <section className="ticker"><span>ONCE A SANTHOMITE</span><b>✳</b><span>ALWAYS A SANTHOMITE</span><b>✳</b><span>ONCE A SANTHOMITE</span><b>✳</b></section>

      <HeritageShelf />


      <section className="invitation-section motion-reveal">
        <div className="invitation-mark">S</div>
        <div><div className="section-kicker">AN INVITATION TO EVERY SANTHOMITE</div><h2 className="type-section">If you ever walked through that gate,<br/><em>you belong here.</em></h2>
          <p>If you ever wore the Santhome uniform, if you ever cheered "Santhome!" on the sports field, if you ever walked through that gate on Santhome High Road - this is YOUR association.</p>
          <p>Whether you are in Chennai, Singapore, Dubai, London, or Toronto, you belong here. Register today. Add your batch. Upload a memory. Find a friend.</p>
          <strong>Because school ends, but Santhome never does.<br/>Once a Santhomite, Always a Santhomite.</strong>
        </div>
      </section>

      <section className="principal-stage" aria-label="A welcome from the school">
        <PrincipalWelcome />
      </section>

      <section className="note-section motion-reveal">
        <div className="note-mark">“</div>
        <div className="secretary-note">
          <div className="section-kicker">FROM THE GENERAL SECRETARY'S DESK</div>
          <p className="secretary-name">Mr. Karthikeyan Balasubramanian <span>· General Secretary · Alumnus, 1992 Batch</span></p>
          <blockquote>“That is the power of our school.<br/>It never leaves you.”</blockquote>
          <p className="note-author">KARTHIKEYAN BALASUBRAMANIAN · ALUMNUS, 1992 BATCH</p>
          <details className="message-details secretary-letter">
            <summary><span>Read the full message to Santhomites</span><span className="details-toggle">+</span></summary>
            <div className="letter-body">
              <p className="letter-salutation">My Dear Fellow Santhomites, Vanakkam!</p>
              <p>It still feels like yesterday.</p>
              <p>1992. The white shirt, the navy blue shorts, the heavy school bag, the morning assembly prayer, the roar on the playground, and the last bell that we never wanted to ring - because it meant saying goodbye to Santhome. We left that gate as 17-year-old boys with dreams in our eyes, not knowing that life would take us to different cities, different countries, and different destinies.</p>
              <p>Thirty-three years later, when I close my eyes, I can still see our classrooms on Santhome High Road, still hear the voice of our teachers, and still feel the pride of saying, "I am from Santhome."</p>
              <p>That is the power of our school. It never leaves you.</p>
              <p>As a proud alumnus of the 1992 batch, and now serving as the General Secretary of our Alumni Association, this is not just a post for me - it is an emotion, a responsibility, and a homecoming.</p>
              <p>For years, many of us have been asking: Why don't we have a common platform? Where are our friends? How is our school doing? How can we give back? This Alumni Association is the answer to all those questions.</p>
              <p>This is OUR association - of every Santhomite, from the senior-most batch of the 1950s, 60s and 70s to our youngest brothers and sisters who just passed out.</p>
              <p className="letter-label">My humble appeal to you:</p>
              <p><strong>To my seniors:</strong> You are our inspiration. You built the legacy of Santhome. Come back and bless us with your presence and guidance.</p>
              <p><strong>To my Executive Committee members:</strong> We are the bridge. We have the energy and the nostalgia. Let's take the lead in finding every classmate and bringing them home.</p>
              <p><strong>To my juniors:</strong> You are the future. This network is for you - for mentorship, for career guidance, for internships, and for a hand that will always be there because a Santhomite always helps another Santhomite.</p>
              <p className="letter-label">In the coming months, we are planning:</p>
              <ol><li>A grand Global Alumni Directory</li><li>Batch-wise reunions and a Mega Reunion for all batches</li><li>Mentorship and career guidance for current students</li><li>Honouring our beloved retired teachers</li></ol>
              <p>But none of this is possible without YOU. An alumni association is not built by a committee; it is built by its members.</p>
              <p>So, I request you - please take 2 minutes to register on this website. Add your photo. Write a memory. Find one friend and ask him to join. That one small step will keep Santhome alive for another 200 years.</p>
              <p>I thank our Correspondent &amp; Principal Rev. Bro. Johnson for his constant encouragement and blessings, and every alumnus who has worked day and night to make this dream a reality. I would like to recollect and remember all the past principals for their continuous support and encouragement; whenever I come to school I have always felt at home.</p>
              <p>Special mention to my mentor and my then-principal Rev. Bro. Selvanathan, who has guided me to this level.</p>
              <p>Let's reconnect. Let's reminisce. Let's rebuild.</p>
              <p>I look forward to seeing you, shaking your hand, and saying once again - "Dei, how are you da? Long time!"</p>
              <p>With pride, gratitude, and hope,<br/><strong>Once a Santhomite, Always a Santhomite.</strong></p>
              <p>Warmly,<br/><strong>Karthikeyan Balasubramanian</strong><br/>General Secretary<br/>Santhome Higher Secondary School Alumni Association<br/>Mylapore, Chennai<br/><a href="tel:+919884485511">9884485511</a><br/><a href="mailto:Karthik.b2@gmail.com">Karthik.b2@gmail.com</a></p>
            </div>
          </details>
        </div>
        <div className="note-aside">“Dei, how are you da?<br/>Long time!”<br/><small>The words we can't wait to say again</small></div>
      </section>

      <section className="home-albums motion-reveal">
        <div className="strip-heading"><div><div className="section-kicker">04 / OPEN THE PHOTO ALBUMS</div><h2 className="type-section">Some things stay<br/><em>with you.</em></h2></div><button className="underlined" onClick={() => go('Gallery')}>Explore all albums <span>↗</span></button></div>
        <div className="home-album-grid">
          {galleryFolders.map((folder) => {
            const cover = getFolderCover(folder);
            return <button className="home-album-card" key={folder.id} onClick={() => go('Gallery')}><img src={cover?.src} alt="" loading="lazy"/><span><small>{String(folder.memories.length).padStart(2, '0')} PHOTOS</small><strong>{folder.title}</strong><b>↗</b></span></button>;
          })}
          <button className="home-album-card video-album-teaser" onClick={() => go('Gallery')}><img src={getFolderCover(galleryFolders[0])?.src} alt="" loading="lazy"/><span><small>5 VIDEO CLIPS</small><strong>Our videos</strong><b>▶</b></span></button>
        </div>
      </section>

      <section className="cta motion-reveal"><p className="eyebrow">YOUR PLACE IS HERE</p><h2 className="type-section">Come back<br/><em>to Santhome.</em></h2><button className="button-light" onClick={() => go('Contact')}>Register as an alumnus <span>↗</span></button></section>
    </main>
  );
}
