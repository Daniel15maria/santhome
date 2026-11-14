import { useState } from 'react';
import { galleryMemories } from '../Gallery/galleryData';
import './heritageShelf.css';
import montfortImage from '../../assets/images/site/st-montfort-school-site.jpg';

const stories = [
  {
    number: '01', label: 'A legacy since 1821', title: 'A school that stays with you.', image: montfortImage,
    alt: 'Montfortian brothers teaching students', credit: 'Image from the Santhome school website',
    intro: 'For over two centuries, Santhome has shaped the soul of Chennai from the shores of Mylapore.',
    detail: <><p>Santhome Higher Secondary School was established in 1821 by Rev. Fr. Dom Drey Manuel De Ave Maria, Episcopal Administrator of the old Diocese of Mylapore. One of Chennaiâ€™s oldest educational establishments, it was managed by the Diocesan clergy until 1954 and is now a proud Montfortian Institution.</p><p>From Portuguese, Dutch and Jewish principals to the Brothers of St. Gabriel, the school has witnessed history while holding to Truth, Service and Character. For many of us, it was our first cricket ground, our first stage, and our first lessons in friendship and life.</p></>,
  },
  {
    number: '02', label: 'Why this alumni association?', title: 'The bond remains.', image: galleryMemories.find((photo) => photo.id === 68)?.src,
    alt: 'Santhome alumni gathered together', credit: 'From the Santhome alumni photo archive',
    intro: 'A homecoming for Santhomites everywhere: reconnect, remember the people who shaped us, and give back.',
    detail: <><p>We created this association to bring our scattered family back home. Find classmates and favourite teachers, share old photographs, organize reunions, and preserve the schoolâ€™s history and achievements.</p><p>We also want to honour retired staff and guide todayâ€™s students through mentoring, career advice, scholarships and support for school initiatives. What we received, we can pass forward.</p></>,
  },
  {
    number: '03', label: 'Our vision & mission', title: 'A lifelong bond. A shared purpose.', image: galleryMemories.find((photo) => photo.id === 46)?.src,
    alt: 'Santhome alumni and teachers together', credit: 'From the Santhome alumni photo archive',
    intro: 'A vibrant, lifelong, global community of Santhomites, connected to one another and to our alma mater.',
    detail: <><p>Our mission is to maintain a searchable alumni network, support personal and professional connections, provide welfare for alumni, teachers and current students, and celebrate the achievements that bring pride to Santhome.</p><p>Whether you are in Chennai, Singapore, Dubai, London or Toronto, you belong here. School ends, but Santhome never does.</p></>,
  },
];

const railPhotos = [65, 67, 68, 54, 46, 41, 55, 69].map((id) => galleryMemories.find((photo) => photo.id === id)).filter(Boolean);

export default function HeritageShelf() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const selectStory = (index) => {
    setActive(index);
    setExpanded(false);
  };

  return (
    <section className="heritage-shelf" id="school-story" aria-label="Our story">
      <div className="heritage-shelf-heading"><span className="section-kicker">OUR STORY, IN THREE CHAPTERS</span><p>Every Santhomite has a place in it.</p></div>
      <div className="heritage-shelf-layout">
        <div className="heritage-bookcase" role="tablist" aria-label="Santhome story chapters">
          {stories.map((item, index) => index === active ? (
            <article className="heritage-book heritage-book--active" key={item.number} role="tabpanel" style={{ backgroundImage: `linear-gradient(90deg, rgba(13,29,56,.88), rgba(13,29,56,.3)), url("${item.image}")` }}>
              <span className="heritage-number">{item.number} / SANTHOME STORY</span>
              <h2>{item.title}</h2>
              <p className="heritage-intro">{item.intro}</p>
              <button className="heritage-more" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
                <span>{expanded ? 'Read less' : 'Read more'}</span><span className={`heritage-plus${expanded ? ' is-open' : ''}`} aria-hidden="true">+</span>
              </button>
              {expanded && <div className="heritage-detail">{item.detail}</div>}
              <small className="heritage-credit">{item.credit}</small>
            </article>
          ) : (
            <button className="heritage-book heritage-book--tab" key={item.number} type="button" role="tab" aria-selected="false" aria-label={`Show ${item.label}`} onClick={() => selectStory(index)} style={{ backgroundImage: `linear-gradient(0deg, rgba(13,29,56,.62), rgba(13,29,56,.12)), url("${item.image}")` }}>
              <span>{item.number}</span><strong>{item.label}</strong>
            </button>
          ))}
        </div>
        <aside className="heritage-memory-rail" aria-label="Alumni memories, scrolling vertically">
          <div className="heritage-memory-track">{[...railPhotos, ...railPhotos].map((photo, index) => <img key={`${photo.id}-${index}`} src={photo.src} alt={index < railPhotos.length ? photo.alt : ''} aria-hidden={index >= railPhotos.length} loading="lazy" />)}</div>
          <span>MEMORIES THAT BRING US HOME</span>
        </aside>
      </div>
    </section>
  );
}
