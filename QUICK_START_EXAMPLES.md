# 🎵 Melodify - Quick Start Examples

## Using the New Dataset Methods

### Example 1: Get All Genres
```typescript
import { Component, OnInit } from '@angular/core';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-genre-list',
  template: '<div>{{ genres }}</div>'
})
export class GenreListComponent implements OnInit {
  genres: string[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.genres = this.musicService.getGenres();
    console.log('Available Genres:', this.genres);
    // Output: ['Ambient', 'Afrobeats', 'Bollywood', 'Classical', 
    //          'Country', 'Electronic', 'Funk', 'Hip-Hop', 'Indie', 
    //          'Jazz', 'K-Pop', 'Latin', 'Pop', 'R&B', 'Reggae', 'Rock']
  }
}
```

### Example 2: Get Songs by Genre
```typescript
// Get all Pop songs
const popSongs = this.musicService.getSongsByGenre('Pop');
console.log(`Found ${popSongs.length} Pop songs:`, popSongs);

// Result:
// [
//   { id: 1, title: 'Midnight Drive', artist: 'Nova Sound', ... },
//   { id: 2, title: 'Golden Hour', artist: 'Aria Bloom', ... },
//   { id: 3, title: 'Summer Nights', artist: 'Aria Bloom', ... },
//   { id: 4, title: 'Coastal Breeze', artist: 'Aria Bloom', ... },
//   { id: 5, title: 'Dancing Dreams', artist: 'Crystal Rivers', ... }
// ]
```

### Example 3: Search with Multiple Criteria
```typescript
// Search for Rock songs by Rebel Hearts
const results = this.musicService.searchSongs({
  genre: 'Rock',
  artist: 'Rebel Hearts'
});

console.log('Rock songs by Rebel Hearts:', results);
// Result: Array of 3 songs from Rebel Hearts in Rock genre
```

### Example 4: Get Statistics
```typescript
const stats = this.musicService.getStatistics();
console.log(stats);

// Output:
// {
//   totalSongs: 50,
//   totalArtists: 23,
//   totalAlbums: 18,
//   totalGenres: 12,
//   genres: ['Ambient', 'Afrobeats', ...],
//   artists: ['African Groove', 'Aria Bloom', ...],
//   albums: ['Alternative Sounds', 'Caribbean Sunset', ...],
//   likedSongs: 15,
//   averageDuration: '265.20',
//   genreDistribution: {
//     Pop: 5,
//     Electronic: 4,
//     Ambient: 4,
//     'Hip-Hop': 4,
//     Rock: 4,
//     'R&B': 3,
//     Jazz: 2,
//     Indie: 2,
//     Reggae: 2,
//     Country: 2,
//     Funk: 2,
//     Classical: 2,
//     'K-Pop': 1,
//     Latin: 1,
//     Bollywood: 1,
//     Afrobeats: 1
//   }
// }
```

### Example 5: Get Distribution Analysis
```typescript
// Genre distribution
const genreDistribution = this.musicService.getGenreDistribution();
console.log('Genre Distribution:', genreDistribution);

// Artist distribution
const artistDistribution = this.musicService.getArtistDistribution();
console.log('Top Artists:', artistDistribution);
```

### Example 6: Export Dataset as JSON
```typescript
const jsonData = this.musicService.exportDataset();
console.log(jsonData);
// Returns complete dataset as JSON string with metadata and statistics

// Save to file (Node.js/Electron)
const fs = require('fs');
fs.writeFileSync('melodify_export.json', jsonData);
```

## Building a Genre Filter Component

```typescript
import { Component, OnInit } from '@angular/core';
import { MusicService } from './services/music.service';
import { Song } from './models/song.model';

@Component({
  selector: 'app-genre-filter',
  template: `
    <div class="genre-filter">
      <h3>Filter by Genre</h3>
      <div class="genre-buttons">
        <button *ngFor="let genre of genres" 
                (click)="filterByGenre(genre)"
                [class.active]="selectedGenre === genre">
          {{ genre }}
        </button>
      </div>
      <div class="song-list">
        <div *ngFor="let song of filteredSongs" class="song-item">
          <p>{{ song.title }} - {{ song.artist }}</p>
        </div>
      </div>
    </div>
  `
})
export class GenreFilterComponent implements OnInit {
  genres: string[] = [];
  selectedGenre: string = '';
  filteredSongs: Song[] = [];
  allSongs: Song[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.genres = this.musicService.getGenres();
    this.allSongs = this.musicService.getSongs();
  }

  filterByGenre(genre: string) {
    this.selectedGenre = genre;
    this.filteredSongs = this.musicService.getSongsByGenre(genre);
  }
}
```

## Creating a Music Analytics Component

```typescript
import { Component, OnInit } from '@angular/core';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-music-analytics',
  template: `
    <div class="analytics">
      <h2>Music Analytics</h2>
      <div class="stats">
        <div class="stat-card">
          <h3>{{ stats.totalSongs }}</h3>
          <p>Total Songs</p>
        </div>
        <div class="stat-card">
          <h3>{{ stats.totalArtists }}</h3>
          <p>Total Artists</p>
        </div>
        <div class="stat-card">
          <h3>{{ stats.totalGenres }}</h3>
          <p>Total Genres</p>
        </div>
        <div class="stat-card">
          <h3>{{ stats.likedSongs }}</h3>
          <p>Liked Songs</p>
        </div>
      </div>
      
      <h3>Top Genres</h3>
      <ul>
        <li *ngFor="let entry of genreEntries">
          {{ entry[0] }}: {{ entry[1] }} songs
        </li>
      </ul>
    </div>
  `
})
export class MusicAnalyticsComponent implements OnInit {
  stats: any = {};
  genreEntries: [string, number][] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.stats = this.musicService.getStatistics();
    this.genreEntries = Object.entries(this.stats.genreDistribution)
                               .sort((a, b) => b[1] - a[1]);
  }
}
```

## Importing Kaggle Data (TypeScript)

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DataImportService {
  constructor(private http: HttpClient) {}

  /**
   * Import songs from JSON file
   */
  importFromJSON(filePath: string): Observable<Song[]> {
    return this.http.get<Song[]>(filePath);
  }

  /**
   * Convert external dataset to Melodify format
   */
  convertToMelodifyFormat(data: any[]): Song[] {
    return data.map((item, index) => ({
      id: index + 1,
      title: item.name || item.track_name || item.title,
      artist: item.artists || item.artist_name || 'Unknown',
      album: item.album || item.album_name || 'Unknown',
      duration: this.formatDuration(item.duration_ms || item.duration || 0),
      durationSec: Math.floor((item.duration_ms || item.duration || 0) / 1000),
      cover: item.cover_url || `https://picsum.photos/seed/${item.title}/300/300`,
      audioSrc: item.audio_url || item.preview_url || '',
      genre: item.genre || item.genres?.[0] || 'Pop',
      isLiked: false
    }));
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}
```

## Usage in Component

```typescript
// Import Kaggle dataset
constructor(
  private musicService: MusicService,
  private importService: DataImportService
) {}

importKaggleData() {
  this.importService.importFromJSON('assets/datasets/spotify.json')
    .subscribe(data => {
      const convertedSongs = this.importService.convertToMelodifyFormat(data);
      console.log(`Imported ${convertedSongs.length} songs from Kaggle`);
      // Add to music service or use directly
    });
}
```

## Terminal Examples

### Using the Service in Console
```bash
# In browser console (after app loads):

// Get all genres
angular.probe(document.querySelector('app-root')).injector.get(MusicService).getGenres()

// Get Pop songs
angular.probe(document.querySelector('app-root')).injector.get(MusicService).getSongsByGenre('Pop')

// Get statistics
angular.probe(document.querySelector('app-root')).injector.get(MusicService).getStatistics()

// Export as JSON
angular.probe(document.querySelector('app-root')).injector.get(MusicService).exportDataset()
```

## Real-World Dataset Integration

### Step-by-Step: Spotify Dataset

```bash
# 1. Download Spotify dataset
pip install kaggle
kaggle datasets download -d spotify

# 2. Extract
unzip spotify.zip

# 3. Convert using Python script
python import_kaggle_datasets.py spotify.csv

# 4. Import the generated JSON into Melodify
# Copy output JSON to src/assets/datasets/
# Update music.service.ts to load the data
```

---

**Ready to explore music data? Start with any of these examples!** 🎵
