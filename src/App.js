import { useRef, useState } from 'react';
import './App.css';
import usePageAnimations from './animations/usePageAnimations';
import OverviewPage from './pages/Overview';
import EventsPage from './pages/Events';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import graduationPhoto from './assets/images/site/alumni-school-friends.jpg';
import alumniPhoto from './assets/images/site/alumni-friends-gathering.jpg';
import classroomPhoto from './assets/images/site/classroom-community.jpg';

const navItems = ['Our story', 'Events', 'Gallery', 'Contact'];
const photos = [
  [graduationPhoto, 'The next chapter begins together', '01'],
  [alumniPhoto, 'The people who make us', '02'],
  [classroomPhoto, 'A place that stays with you', '03'],
];

function App() {
  const rootRef = useRef(null);
  const [page, setPage] = useState('Our story');
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (item) => { setPage(item); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  usePageAnimations(page, rootRef);

  return <div ref={rootRef} className="site-shell font-jakarta min-h-screen w-full mx-auto max-w-screen-2xl">
    <div className="topline"><span>143 Santhome High Road · Mylapore, Chennai</span><span>A legacy since 1821 <a className="official-link" href="https://santhomemylapore.in/" target="_blank" rel="noreferrer">School website ↗</a><i>✳</i></span></div>
    <header className="header relative z-20 bg-paper/95 backdrop-blur-sm">
      <button className="brand" onClick={() => go('Our story')} aria-label="Santhome Alumni home"><span className="crest">S</span><span className="brand-name">SANTHOME<span>ALUMNI ASSOCIATION</span></span></button>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? 'Close −' : 'Menu +'}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}>{navItems.map((item, i) => <button key={item} className={page === item ? 'nav-link active' : 'nav-link'} onClick={() => go(item)}><span>0{i + 1}</span>{item}</button>)}<button className="join-button" onClick={() => go('Contact')}>Join the family <b>↗</b></button></nav>
    </header>

    <div key={page} className="page-transition">
      {page === 'Our story' && <OverviewPage go={go} photos={photos} />}
      {page === 'Events' && <EventsPage />}
      {page === 'Gallery' && <GalleryPage go={go} photos={photos} />}
      {page === 'Contact' && <ContactPage />}
    </div>

    <footer className="footer"><button className="brand footer-brand" onClick={() => go('Our story')}><span className="crest">S</span><span className="brand-name">SANTHOME<span>ALUMNI ASSOCIATION</span></span></button><p>Once a Santhomite,<br/><em>always a Santhomite.</em></p><div className="footer-bottom"><span>© SANTHOME HSS ALUMNI ASSOCIATION</span><span>TRUTH · SERVICE · CHARACTER</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div></footer>
  </div>;
}

export default App;
