import schoolGathering from '../../assets/images/site/school-friends-field.jpg';
import studentMemory from '../../assets/images/site/alumni-classroom-memory.jpg';

export default function GalleryPage({ go, photos }) {
  const memories = [
    ...photos,
    [schoolGathering, 'A day we came together', '04'],
    [studentMemory, 'The classrooms that raised us', '05'],
    [photos[2][0], 'The people who made it home', '06'],
  ];

  return (
    <main className="inner-page gallery-page">
      <div className="inner-hero motion-reveal">
        <p className="eyebrow">03 / A LITTLE NOSTALGIA</p>
        <h1 className="type-display">Every picture<br/>has a <em>backstory.</em></h1>
        <p>The uniforms, the grounds, the people. A living album of the place we still call home.</p>
      </div>
      <div className="gallery-grid motion-reveal">
        {memories.map(([src, caption, number]) => (
          <figure key={number}>
            <img src={src} alt={caption}/>
            <figcaption><span>{number} / MEMORY</span>{caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-invite motion-reveal">
        <p className="eyebrow">HAVE A PHOTO TO SHARE?</p>
        <h2 className="type-section">Help us fill in<br/><em>the picture.</em></h2>
        <button className="button-dark btn-primary" onClick={() => go('Contact')}>Share a memory <span>↗</span></button>
      </div>
    </main>
  );
}
