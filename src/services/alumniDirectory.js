export const alumniDirectoryUrl = 'https://script.google.com/macros/s/AKfycbwE0yA8Mhx4cA_64WIjYCsIXMyPlC8FEY98BleUQ94oLjxnhZXHN0zVHSqufG3ymOd_/exec';

export async function fetchAlumniDirectory() {
  const response = await fetch(`${alumniDirectoryUrl}?refresh=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('The alumni list could not be reached.');
  const result = await response.json();
  if (result?.status !== 'success' || !Array.isArray(result.data)) {
    throw new Error(result?.message || 'The alumni list could not be loaded.');
  }
  return result.data;
}

export async function addAlumnusToDirectory(name, batchYear) {
  const payload = new URLSearchParams({ name, batchYear, publicConsent: 'yes' });
  const response = await fetch(alumniDirectoryUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: payload.toString(),
  });
  if (!response.ok) throw new Error('The registration was emailed, but the alumni list could not be updated.');
  const result = await response.json();
  if (result?.status !== 'success') {
    throw new Error(result?.message || 'The registration was emailed, but the alumni list could not be updated.');
  }
  const updatedAlumni = await fetchAlumniDirectory();
  if (!updatedAlumni.some((person) => person.name === name && person.batchYear === batchYear)) {
    throw new Error('The registration was emailed, but it has not appeared in the public list yet.');
  }
  return updatedAlumni;
}
