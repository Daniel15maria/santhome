import { useState } from 'react';
import { galleryMemories } from '../Gallery/galleryData';
import './heritageShelf.css';
import montfortImage from '../../assets/images/site/st-montfort-school-site.jpg';

const photos = [65, 67, 68, 54, 46, 41, 55, 69].map((id) => galleryMemories.find((photo) => photo.id === id)).filter(Boolean);

const stories = [
  {
    number: '01', title: 'A LEGACY SINCE 1821', image: montfortImage, alt: 'Montfortian brothers teaching students',
    intro: 'For over two centuries, Santhome has shaped the soul of Chennai from the shores of Mylapore.',
    detail: <><p>Santhome Higher Secondary School was established in 1821 by Rev. Fr. Dom Drey Manuel De Ave Maria, Episcopal Administrator of the old Diocese of Mylapore. One of Chennai’s oldest educational establishments, it was managed by the Diocesan clergy until 1954 and is now a proud Montfortian Institution.</p><p>From Portuguese, Dutch and Jewish principals to the Brothers of St. Gabriel, the school has witnessed history while holding to Truth, Service and Character. For many of us, it was our first cricket ground, our first stage, and our first lessons in friendship and life.</p><small>School image: Santhome Higher Secondary School website</small></>,
  },
  {
    number: '02', title: 'WHY THIS ALUMNI ASSOCIATION?', image: galleryMemories.find((photo) => photo.id === 68)?.src, alt: 'Santhome alumni gathered together',
    intro: 'A homecoming for Santhomites everywhere: reconnect, remember the people who shaped us, and give back.',
    detail: <><p>We created this association to bring our scattered family back home. Find classmates and favourite teachers, share old photographs, organize reunions, and preserve the school’s history and achievements.</p><p>We also want to honour retired staff and guide today’s students through mentoring, career advice, scholarships and support for school initiatives. What we received, we can pass forward.</p></>,
  },
  {
    number: '03', title: 'OUR VISION & MISSION', image: galleryMemories.find((photo) => photo.id === 46)?.src, alt: 'Santhome alumni and teachers together',
    intro: 'A vibrant, lifelong, global community of Santhomites, connected to one another and to our alma mater.',
    detail: <><p>Our mission is to maintain a searchable alumni network, support personal and professional connections, provide welfare for alumni, teachers and current students, and celebrate the achievements that bring pride to Santhome.</p><p>Whether you are in Chennai, Singapore, Dubai, London or Toronto, you belong here. School ends, but Santhome never does.</p></>,
  },
];

export default function HeritageShelf() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="heritage-shelf" id="school-story" aria-label="Our story">
      <div className="heritage-shelf-heading"><span className="section-kicker">OUR STORY, IN THREE CHAPTERS</span><p>Every Santhomite has a place in it.</p></div>
      <div className="heritage-boxes">
        {stories.map((story, index) => {
          const isExpanded = expanded === index;
          return (
            <article className={`heritage-box${isExpanded ? ' is-expanded' : ''}`} key={story.number} style={{ '--heritage-image': `url("${story.image}")` }}>
              <div className="heritage-box-top">
                <div className="heritage-box-title"><span>{story.number} /</span><h2>{story.title}</h2></div>
                <button className="heritage-more" type="button" aria-expanded={isExpanded} aria-label={`${isExpanded ? 'Close' : 'Read more:'} ${story.title}`} onClick={() => setExpanded(isExpanded ? null : index)}>
                  <span className={`heritage-plus${isExpanded ? ' is-open' : ''}`} aria-hidden="true">+</span>
                </button>
              </div>
              <p className="heritage-intro">{story.intro}</p>
              <div className="heritage-box-content" hidden={!isExpanded}>{story.detail}</div>
              <div className="heritage-box-photos" aria-label="Alumni photos scrolling vertically">
                <div className="heritage-box-photo-track">{[...photos, ...photos].map((photo, photoIndex) => <img key={`${story.number}-${photo.id}-${photoIndex}`} src={photo.src} alt={photoIndex < photos.length ? photo.alt : ''} aria-hidden={photoIndex >= photos.length} loading="lazy" />)}</div>
              </div>
              <span className="heritage-box-caption">SANTHOME · {story.number}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
