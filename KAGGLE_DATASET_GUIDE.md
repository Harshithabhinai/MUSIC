# 🎵 Melodify Music Dataset Guide

## Overview
This guide explains how to use Kaggle music datasets with the Melodify music streaming application. The application comes with a curated collection of 50 songs across 12 genres, inspired by popular Kaggle music datasets.

## 📊 Current Dataset Statistics

| Metric | Count |
|--------|-------|
| **Total Songs** | 50 |
| **Total Artists** | 23 |
| **Total Albums** | 18 |
| **Total Genres** | 12 |
| **Average Duration** | 4:25 |

## 🎭 Available Genres

1. Pop
2. Electronic
3. Ambient
4. Hip-Hop
5. Rock
6. R&B
7. Jazz
8. Indie
9. Reggae
10. Country
11. Funk
12. Classical
13. K-Pop
14. Latin
15. Bollywood
16. Afrobeats

## 🔍 Popular Kaggle Music Datasets

### 1. **Spotify Dataset**
- **Link**: [Kaggle Spotify Dataset](https://www.kaggle.com/datasets/spotify/)
- **Size**: 10,000+ songs
- **Features**: 
  - Song metadata (title, artist, album)
  - Audio features (energy, danceability, valence)
  - Popularity scores
  - Release dates
- **Format**: CSV
- **Best For**: Recommendation systems, popularity analysis

### 2. **Million Song Dataset**
- **Link**: [Kaggle Million Song Dataset](https://www.kaggle.com/datasets/millionsongdataset/)
- **Size**: 1,000,000+ songs
- **Features**:
  - Extensive metadata
  - Release information
  - Artist details
  - Year analysis
- **Format**: HDF5, JSON
- **Best For**: Large-scale analysis, machine learning

### 3. **Genius Lyrics Dataset**
- **Link**: [Kaggle Genius Lyrics](https://www.kaggle.com/datasets/genius/)
- **Size**: Millions of songs with lyrics
- **Features**:
  - Song lyrics
  - Song metadata
  - Artist information
- **Format**: CSV/JSON
- **Best For**: NLP analysis, lyric-based features

### 4. **FMA: A Dataset For Music Analysis**
- **Link**: [Kaggle FMA Dataset](https://www.kaggle.com/datasets/fma/)
- **Size**: 8,000+ songs
- **Features**:
  - Audio files (actual MP3s)
  - Genre labels
  - Metadata
  - Features extracted from audio
- **Format**: MP3, JSON, CSV
- **Best For**: Audio processing, genre classification

### 5. **30 Music Genres Dataset**
- **Link**: [Kaggle Music Genres MFCC](https://www.kaggle.com/datasets/henrybekeen/30-music-genres-mfcc/)
- **Size**: 1,000+ songs
- **Features**:
  - MFCC features for all songs
  - 30 different genres
  - Pre-processed audio features
- **Format**: CSV
- **Best For**: Genre classification, ML models

## 📥 How to Import Kaggle Datasets

### Step 1: Download from Kaggle
```bash
# First, install Kaggle API
pip install kaggle

# Authenticate (download kaggle.json from your account)
# Place it in ~/.kaggle/kaggle.json
chmod 600 ~/.kaggle/kaggle.json

# Download a dataset
kaggle datasets download -d spotify
unzip spotify.zip
```

### Step 2: Convert CSV to JSON (if needed)
```python
import pandas as pd
import json

# Read CSV
df = pd.read_csv('songs.csv')

# Convert to JSON
songs_json = df.to_json(orient='records', indent=2)

# Save JSON
with open('songs.json', 'w') as f:
    f.write(songs_json)
```

### Step 3: Format for Melodify
The application expects songs in this format:
```json
{
  "id": 1,
  "title": "Song Title",
  "artist": "Artist Name",
  "album": "Album Name",
  "duration": "3:45",
  "durationSec": 225,
  "cover": "https://example.com/image.jpg",
  "audioSrc": "https://example.com/audio.mp3",
  "genre": "Pop",
  "isLiked": false
}
```

### Step 4: Import into Melodify
Add songs to `src/app/services/music.service.ts`:
```typescript
private songs: Song[] = [
  // ... existing songs ...
  // Add imported songs here
];
```

## 🛠️ Using Dataset Methods

The `MusicService` provides several methods for data analysis:

### Get All Genres
```typescript
const genres = this.musicService.getGenres();
// Returns: ['Pop', 'Rock', 'Electronic', ...]
```

### Get Songs by Genre
```typescript
const popSongs = this.musicService.getSongsByGenre('Pop');
// Returns array of all Pop songs
```

### Get Songs by Artist
```typescript
const artistSongs = this.musicService.getSongsByArtist('Aria Bloom');
// Returns array of all songs by this artist
```

### Search with Multiple Criteria
```typescript
const results = this.musicService.searchSongs({
  genre: 'Rock',
  artist: 'Rebel Hearts',
  title: 'Fire'
});
```

### Get Statistics
```typescript
const stats = this.musicService.getStatistics();
// Returns comprehensive statistics about the dataset
console.log(stats);
// {
//   totalSongs: 50,
//   totalArtists: 23,
//   totalAlbums: 18,
//   totalGenres: 12,
//   genres: ['Ambient', 'Afrobeats', ...],
//   genreDistribution: { Pop: 5, Rock: 4, ... },
//   averageDuration: '265.2'
// }
```

### Export as JSON
```typescript
const jsonData = this.musicService.exportDataset();
// Returns complete dataset as JSON string
```

## 📈 Data Analysis Example

### Analysis in Python/Jupyter (Kaggle)
```python
import pandas as pd
import matplotlib.pyplot as plt

# Load your dataset
df = pd.read_csv('melodify_songs.csv')

# Genre distribution
genre_counts = df['genre'].value_counts()
genre_counts.plot(kind='bar', figsize=(12, 6))
plt.title('Songs by Genre')
plt.show()

# Average duration by genre
duration_by_genre = df.groupby('genre')['durationSec'].mean()
duration_by_genre.plot(kind='barh')
plt.title('Average Duration by Genre')
plt.show()

# Top artists
top_artists = df['artist'].value_counts().head(10)
print(top_artists)
```

## 🔗 Integration Steps

1. **Download Dataset** from Kaggle
2. **Parse Data** using pandas or similar
3. **Format** to match Melodify Song interface
4. **Import** into `music.service.ts`
5. **Test** using the provided methods
6. **Analyze** using dashboard component (if available)

## 📝 Dataset Schema

```typescript
interface Song {
  id: number;              // Unique identifier
  title: string;           // Song title
  artist: string;          // Artist name
  album: string;           // Album name
  duration: string;        // Format: mm:ss (e.g., "3:45")
  durationSec: number;     // Duration in seconds
  cover: string;           // URL to album art
  audioSrc: string;        // URL to audio file
  genre: string;           // Music genre
  isLiked: boolean;        // User preference
}
```

## 🎯 Project Ideas with Kaggle Data

1. **Genre Classification**
   - Build ML model to classify songs by genre
   - Train on Spotify or Million Song Dataset

2. **Recommendation System**
   - Implement collaborative filtering
   - Use audio features for content-based recommendations

3. **Lyric Analysis**
   - Analyze sentiments using Genius lyrics
   - Extract themes and topics

4. **Audio Feature Analysis**
   - Extract MFCC, spectral features
   - Correlate with genre, artist, album

5. **Popularity Trends**
   - Track artist/song popularity over time
   - Identify emerging trends

6. **Playlist Generation**
   - Create playlists based on mood/genre
   - Use clustering algorithms

## 📚 Resources

### Kaggle Notebooks
- Search for "music analysis" on Kaggle
- Many public notebooks with complete examples

### Python Libraries
- `pandas` - Data manipulation
- `numpy` - Numerical computing
- `matplotlib` / `seaborn` - Visualization
- `librosa` - Audio processing
- `scikit-learn` - Machine learning
- `tensorflow` / `keras` - Deep learning

### Documentation
- [Kaggle API Docs](https://github.com/Kaggle/kaggle-api)
- [Librosa Documentation](https://librosa.org/)
- [Pandas User Guide](https://pandas.pydata.org/docs/)

## ✅ Checklist for Dataset Integration

- [ ] Create Kaggle account
- [ ] Download desired dataset
- [ ] Convert to required format (if needed)
- [ ] Add to `src/assets/datasets/`
- [ ] Update `music.service.ts`
- [ ] Test filtering methods
- [ ] Verify audio/cover URLs work
- [ ] Update statistics in README
- [ ] Deploy and test in browser

## 🚀 Next Steps

1. Visit [Kaggle.com](https://www.kaggle.com)
2. Browse the "Datasets" section
3. Search for "music" or specific genres
4. Download a dataset that interests you
5. Follow the integration steps above
6. Enjoy your expanded music library!

## 📞 Support

For issues or questions:
1. Check Kaggle dataset documentation
2. Review data format requirements
3. Test with sample data first
4. Use browser console for debugging

---

**Happy data exploring! 🎶**
