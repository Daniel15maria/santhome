import principalPortrait from '../assets/images/site/principal-rev-bro-johnson.jpg';

export default function PrincipalWelcome() {
  return (
    <section className="principal-welcome motion-reveal">
      <div className="principal-photo-wrap">
        <img src={principalPortrait} alt="Rev. Bro. Johnson, Correspondent and Principal of Santhome Higher Secondary School"/>
        <span>REV. BRO. JOHNSON · CORRESPONDENT &amp; PRINCIPAL</span>
      </div>
      <div className="principal-copy">
        <div className="section-kicker">A WELCOME FROM THE SCHOOL</div>
        <h2 className="type-section">The bond we share<br/><em>has a future.</em></h2>
        <p>Our alumni carry Santhome’s values wherever life takes them. This association brings generations back together to guide today’s students, honour the teachers who shaped us, and strengthen the school we all call home.</p>
        <a className="underlined" href="https://santhomemylapore.in/" target="_blank" rel="noreferrer">Visit Santhome School <span>↗</span></a>
      </div>
    </section>
  );
}
