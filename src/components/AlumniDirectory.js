import { useCallback, useEffect, useState } from 'react';
import { fetchAlumniDirectory } from '../services/alumniDirectory';

export default function AlumniDirectory({ onJoin }) {
  const [alumni, setAlumni] = useState([]);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [directoryError, setDirectoryError] = useState('');

  const refreshList = useCallback(async () => {
    setLoading(true);
    setDirectoryError('');
    try {
      setAlumni(await fetchAlumniDirectory());
    } catch (error) {
      setDirectoryError(error.message || 'The alumni list could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshList();
    const handleDirectoryUpdate = () => refreshList();
    window.addEventListener('santhome:alumni-updated', handleDirectoryUpdate);
    return () => window.removeEventListener('santhome:alumni-updated', handleDirectoryUpdate);
  }, [refreshList]);

  return (
    <section className="alumni-directory" aria-labelledby="alumni-directory-heading">
      <div className="alumni-directory-heading">
        <div>
          <div className="section-kicker">SANTHOMITES, RECONNECTED</div>
          <h2 id="alumni-directory-heading">Know your friends who joined</h2>
          <p>{loading && alumni.length === 0 ? 'Loading alumni list…' : `${alumni.length} ${alumni.length === 1 ? 'alumnus' : 'alumni'} in the public list`}</p>
        </div>
        <div className="alumni-directory-heading-actions">
          {onJoin && <button className="alumni-directory-join" type="button" onClick={onJoin}>Join the family <span aria-hidden="true">↗</span></button>}
          <button className="button-dark alumni-directory-toggle" type="button" aria-expanded={directoryOpen} onClick={() => setDirectoryOpen((open) => !open)}>
            {directoryOpen ? 'Hide alumni' : 'View alumni'} <span aria-hidden="true">{directoryOpen ? '−' : '+'}</span>
          </button>
        </div>
      </div>
      {directoryOpen && (
        <div className="alumni-directory-content" aria-live="polite">
          {loading ? <p className="alumni-directory-message">Loading the latest list…</p> : directoryError ? (
            <p className="alumni-directory-message" role="alert">{directoryError}</p>
          ) : alumni.length === 0 ? (
            <p className="alumni-directory-message">No alumni have opted into the public list yet. Be the first to join.</p>
          ) : (
            <div className="alumni-directory-table-wrap">
              <table className="alumni-directory-table">
                <thead><tr><th scope="col">Name</th><th scope="col">Batch / year</th></tr></thead>
                <tbody>{alumni.map((person, index) => <tr key={`${person.name}-${person.batchYear}-${index}`}><td>{person.name}</td><td>{person.batchYear || '—'}</td></tr>)}</tbody>
              </table>
            </div>
          )}
          <div className="alumni-directory-actions">
            <button className="alumni-directory-refresh" type="button" onClick={refreshList} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh list'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
