const imageFiles = require.context('../../assets/images/shared_images', false, /\.jpe?g$/);
const sortedFiles = imageFiles.keys().sort((left, right) => left.localeCompare(right));

export const galleryFolders = [
  {
    id: 'reunions',
    title: 'Reunions & batchmates',
    eyebrow: 'THE PEOPLE WHO MAKE US',
    description: 'Familiar faces, new stories, and the old friendships that pick up right where they left off.',
    coverNumber: 68,
    memories: [1, 6, 16, 20, 21, 22, 23, 27, 28, 29, 32, 33, 40, 42, 43, 44, 47, 52, 54, 56, 62, 64, 65, 66, 67, 68, 69, 70],
  },
  {
    id: 'celebrations',
    title: 'Alumni celebrations',
    eyebrow: 'MILESTONES TOGETHER',
    description: 'Gatherings, school occasions, and moments the Santhome family came together to celebrate.',
    coverNumber: 2,
    memories: [2, 3, 4, 5, 7, 8, 9, 12, 13, 17, 19, 24, 25, 26, 31, 36, 38, 39, 50],
  },
  {
    id: 'teachers',
    title: 'Teachers & mentors',
    eyebrow: 'WITH GRATITUDE',
    description: 'Remembering the teachers and mentors whose care and guidance stay with us.',
    coverNumber: 46,
    memories: [10, 11, 14, 15, 34, 41, 45, 46, 49, 51, 53, 57, 61, 63],
  },
  {
    id: 'archives',
    title: 'School days & archives',
    eyebrow: 'A WINDOW INTO OUR PAST',
    description: 'Old class photographs, familiar corridors, and snapshots from another Santhome era.',
    coverNumber: 55,
    memories: [18, 30, 35, 37, 48, 55, 58, 59, 60, 71],
  },
];

const folderByNumber = new Map();
galleryFolders.forEach((folder) => {
  folder.memories.forEach((number) => folderByNumber.set(number, folder));
});

export const galleryMemories = sortedFiles.map((file, index) => {
  const number = index + 1;
  const folder = folderByNumber.get(number);

  return {
    id: number,
    number: String(number).padStart(2, '0'),
    src: imageFiles(file),
    folderId: folder?.id || 'reunions',
    folderTitle: folder?.title || 'Santhome memories',
    alt: `${folder?.title || 'Santhome'} — photo archive memory ${String(number).padStart(2, '0')}`,
  };
});

export const getFolderCover = (folder) => galleryMemories.find((memory) => memory.id === folder.coverNumber);

const videoFiles = require.context('../../assets/videos/our-videos', false, /\.mp4$/);
const sortedVideoFiles = videoFiles.keys().sort((left, right) => left.localeCompare(right));
const videoPosterNumbers = [65, 66, 67, 68, 69];

export const galleryVideos = sortedVideoFiles.map((file, index) => ({
  id: index + 1,
  title: `Santhome memory ${String(index + 1).padStart(2, '0')}`,
  src: videoFiles(file),
  poster: galleryMemories.find((memory) => memory.id === videoPosterNumbers[index])?.src,
}));
