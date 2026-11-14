import principalPortrait from '../assets/images/site/principal-rev-bro-johnson.jpg';

export default function PrincipalWelcome() {
  return (
    <section className="principal-welcome motion-reveal">
      <div className="principal-photo-wrap">
        <img src={principalPortrait} alt="Rev. Bro. Johnson, Correspondent and Principal of Santhome Higher Secondary School" loading="lazy" />
        <span>REV. BRO. JOHNSON · CORRESPONDENT &amp; PRINCIPAL</span>
      </div>
      <div className="principal-copy">
        <div className="section-kicker">A WELCOME FROM THE SCHOOL</div>
        <h2 className="type-section">The bond we share<br/><em>has a future.</em></h2>
        <p>“If the school is the body, you - our alumni - are its soul and its living testimony.”</p>
        <details className="message-details principal-letter">
          <summary><span>Read Rev. Bro. Johnson's full welcome</span><span className="details-toggle">+</span></summary>
          <div className="letter-body">
            <p className="letter-salutation">My Dear Beloved Alumni,</p>
            <p>Praise be to God!</p>
            <p>It gives me immense joy and pride to address you all through this official platform of our Alumni Association - a long-awaited homecoming for the great family of Santhome.</p>
            <p>If the school is the body, you - our alumni - are its soul and its living testimony. Wherever you are today - in Chennai or across the oceans, as doctors, engineers, teachers, entrepreneurs, civil servants, artists, sportspersons and above all, as good human beings - you carry the spirit of Santhome with you. The discipline you learnt in our corridors, the values you imbibed in our morning assembly, and the friendships you forged on our playground are what define a true Santhomite.</p>
            <p>I have often met old students who, even after 30 or 40 years, recall the name of their class teacher, the corner of the classroom where they sat, and the thrill of winning a trophy for Santhome. That emotional bond is our greatest strength. The creation of this Alumni Association is not just about nostalgia; it is about responsibility. It is about reconnecting for a purpose - to guide our present students who look up to you, to support our retired teachers who shaped you, and to strengthen the alma mater that made you who you are.</p>
            <p>On behalf of the Management, the Brothers, the staff and the students of Santhome, I wholeheartedly welcome you back. May this website be a bridge that brings every batch together, from the Golden Jubilee batch of 1976 to the young graduates of today. Let us celebrate our past, collaborate in our present, and co-create a glorious future for Santhome.</p>
            <p>I bless this noble initiative and assure you of my full support and prayers. May the good Lord, through the intercession of Our Lady and St. Montfort, bless you, your families and all your endeavours.</p>
            <p>Come, let us rebuild our connections and keep the Santhome flag flying high.<br/><strong>Once a Santhomite, Always a Santhomite.</strong></p>
            <p>Yours in Montfort,<br/><strong>Rev. Bro. Johnson</strong><br/>Correspondent &amp; Principal<br/>Santhome Higher Secondary School (Montfortian Institution)<br/>Mylapore, Chennai - 600004</p>
          </div>
        </details>
        <a className="underlined" href="https://santhomemylapore.in/" target="_blank" rel="noreferrer">Visit Santhome School <span>↗</span></a>
      </div>
    </section>
  );
}
