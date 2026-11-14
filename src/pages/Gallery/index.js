import { useEffect, useMemo, useState } from 'react';
import './gallery.css';
import { galleryFolders, galleryMemories, getFolderCover } from './galleryData';

export default function GalleryPage({ go }) {
  const [activeFolder, setActiveFolder] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const visibleMemories = useMemo(
    () => activeFolder === 'all'
      ? galleryMemories
      : galleryMemories.filter((memory) => memory.folderId === activeFolder),
    [activeFolder],
  );
  const selectedIndex = visibleMemories.findIndex((memory) => memory.id === selectedId);
  const selectedMemory = selectedIndex >= 0 ? visibleMemories[selectedIndex] : null;

  useEffect(() => {
    if (!selectedMemory) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedId(null);
      if (event.key === 'ArrowRight') {
        setSelectedId(visibleMemories[(selectedIndex + 1) % visibleMemories.length].id);
      }
      if (event.key === 'ArrowLeft') {
        setSelectedId(visibleMemories[(selectedIndex - 1 + visibleMemories.length) % visibleMemories.length].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedMemory, selectedIndex, visibleMemories]);

  const openFolder = (folderId) => {
    setActiveFolder(folderId);
    window.setTimeout(() => document.getElementById('memory-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const changePhoto = (direction) => {
    const nextIndex = (selectedIndex + direction + visibleMemories.length) % visibleMemories.length;
    setSelectedId(visibleMemories[nextIndex].id);
  };

  return (
    <main className="inner-page gallery-page">
      <section className="inner-hero gallery-hero motion-reveal">
        <div>
          <p className="eyebrow">03 / SANTHOME, THROUGH OUR EYES</p>
          <h1 className="type-display">A living album<br/>of <em>Santhome.</em></h1>
          <p>Every face holds a story. Explore the reunions, teachers, celebrations, and school days that still bring us back.</p>
        </div>
        <div className="gallery-count" aria-label={`${galleryMemories.length} photographs in ${galleryFolders.length} albums`}>
          <strong>{String(galleryMemories.length).padStart(2, '0')}</strong>
          <span>PHOTOGRAPHS<br/>4 ALBUMS</span>
        </div>
      </section>

      <section className="gallery-albums motion-reveal" aria-labelledby="album-heading">
        <div className="gallery-section-heading">
          <div>
            <p className="section-kicker">OPEN A FOLDER</p>
            <h2 id="album-heading">Stories, <em>together.</em></h2>
          </div>
          <p>Browse by the moments that made us a family.</p>
        </div>
        <div className="gallery-folder-grid">
          {galleryFolders.map((folder, index) => {
            const cover = getFolderCover(folder);
            return (
              <button
                className={`gallery-folder gallery-folder-${folder.id}`}
                key={folder.id}
                onClick={() => openFolder(folder.id)}
                style={{ '--folder-delay': `${index * 90}ms` }}
                aria-label={`Open ${folder.title}, ${folder.memories.length} photographs`}
              >
                <span className="folder-image-wrap">
                  <img src={cover?.src} alt="" loading="lazy" />
                  <span className="folder-image-wash" />
                  <span className="folder-count">{String(folder.memories.length).padStart(2, '0')} PHOTOS</span>
                  <span className="folder-open" aria-hidden="true">↗</span>
                </span>
                <span className="folder-caption">
                  <span className="folder-eyebrow">{folder.eyebrow}</span>
                  <span className="folder-title">{folder.title}</span>
                  <span className="folder-description">{folder.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="gallery-collection motion-reveal" id="memory-grid" aria-labelledby="memories-heading">
        <div className="gallery-collection-heading">
          <div>
            <p className="section-kicker">THE PHOTO ARCHIVE</p>
            <h2 id="memories-heading">{activeFolder === 'all' ? 'All our memories.' : galleryFolders.find((folder) => folder.id === activeFolder)?.title}</h2>
          </div>
          <span className="gallery-results">{String(visibleMemories.length).padStart(2, '0')} MOMENTS</span>
        </div>
        <div className="gallery-filter" role="group" aria-label="Filter photo albums">
          <button className={activeFolder === 'all' ? 'active' : ''} onClick={() => setActiveFolder('all')}>All memories <span>{galleryMemories.length}</span></button>
          {galleryFolders.map((folder) => (
            <button className={activeFolder === folder.id ? 'active' : ''} key={folder.id} onClick={() => setActiveFolder(folder.id)}>
              {folder.title}<span>{folder.memories.length}</span>
            </button>
          ))}
        </div>
        <div className="gallery-grid gallery-memory-grid">
          {visibleMemories.map((memory, index) => (
            <button
              className={`gallery-memory gallery-memory-${index % 5}`}
              key={memory.id}
              onClick={() => setSelectedId(memory.id)}
              style={{ '--memory-delay': `${(index % 8) * 45}ms` }}
              aria-label={`View photo ${memory.number}, ${memory.folderTitle}`}
            >
              <span className="gallery-memory-image"><img src={memory.src} alt={memory.alt} loading="lazy" /></span>
              <span className="gallery-memory-meta"><span>{memory.folderTitle}</span><span>{memory.number} <b>↗</b></span></span>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-invite motion-reveal">
        <p className="eyebrow">YOUR MEMORY BELONGS HERE</p>
        <h2 className="type-section">Have a photo<br/>to <em>share?</em></h2>
        <button className="button-dark btn-primary" onClick={() => go('Contact')}>Share a memory <span>↗</span></button>
      </section>

      {selectedMemory && (
        <div className="gallery-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedId(null); }}>
          <div className="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label={`Photo ${selectedMemory.number} from ${selectedMemory.folderTitle}`}>
            <button className="lightbox-close" onClick={() => setSelectedId(null)} aria-label="Close photo viewer">×</button>
            <button className="lightbox-arrow lightbox-previous" onClick={() => changePhoto(-1)} aria-label="Previous photo">←</button>
            <img src={selectedMemory.src} alt={selectedMemory.alt} />
            <button className="lightbox-arrow lightbox-next" onClick={() => changePhoto(1)} aria-label="Next photo">→</button>
            <div className="lightbox-caption"><span>{selectedMemory.folderTitle}</span><span>{selectedMemory.number} / {String(visibleMemories.length).padStart(2, '0')}</span></div>
          </div>
        </div>
      )}
    </main>
  );
}
