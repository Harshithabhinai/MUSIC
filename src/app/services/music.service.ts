import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  // ---- Comprehensive Music Catalog (Kaggle-inspired Dataset) ---------
  // Extended catalog with 50+ songs across multiple genres and artists
  // Cover art from public placeholder service, audio from public-domain
  // SoundHelix demo tracks for full player functionality
  private songs: Song[] = [
    // Pop Artists
    {
      id: 1,
      title: 'Midnight Drive',
      artist: 'Nova Sound',
      album: 'City Lights',
      duration: '3:58',
      durationSec: 238,
      cover: 'https://picsum.photos/seed/midnightdrive/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Pop',
      isLiked: true
    },
    {
      id: 2,
      title: 'Golden Hour',
      artist: 'Aria Bloom',
      album: 'Sunset Diaries',
      duration: '4:12',
      durationSec: 252,
      cover: 'https://picsum.photos/seed/goldenhour/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Pop',
      isLiked: false
    },
    {
      id: 3,
      title: 'Summer Nights',
      artist: 'Aria Bloom',
      album: 'Sunset Diaries',
      duration: '3:45',
      durationSec: 225,
      cover: 'https://picsum.photos/seed/summernights/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Pop',
      isLiked: true
    },
    {
      id: 4,
      title: 'Coastal Breeze',
      artist: 'Aria Bloom',
      album: 'Sunset Diaries',
      duration: '3:47',
      durationSec: 227,
      cover: 'https://picsum.photos/seed/coastalbreeze/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Pop',
      isLiked: false
    },
    {
      id: 5,
      title: 'Dancing Dreams',
      artist: 'Crystal Rivers',
      album: 'Neon Nights',
      duration: '3:34',
      durationSec: 214,
      cover: 'https://picsum.photos/seed/dancingdreams/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Pop',
      isLiked: false
    },
    // Electronic/Dance Artists
    {
      id: 6,
      title: 'Neon Skyline',
      artist: 'Nova Sound',
      album: 'City Lights',
      duration: '3:34',
      durationSec: 214,
      cover: 'https://picsum.photos/seed/neonskyline/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Electronic',
      isLiked: true
    },
    {
      id: 7,
      title: 'Synthesized Waves',
      artist: 'Nova Sound',
      album: 'Digital Dreams',
      duration: '4:15',
      durationSec: 255,
      cover: 'https://picsum.photos/seed/synwaves/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Electronic',
      isLiked: false
    },
    {
      id: 8,
      title: 'Electric Pulse',
      artist: 'Kevin Cole',
      album: 'Urban Tales',
      duration: '3:29',
      durationSec: 209,
      cover: 'https://picsum.photos/seed/electricpulse/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Electronic',
      isLiked: false
    },
    {
      id: 9,
      title: 'Digital Horizon',
      artist: 'Tech Groove',
      album: 'Future Sounds',
      duration: '3:52',
      durationSec: 232,
      cover: 'https://picsum.photos/seed/digitalhorizon/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Electronic',
      isLiked: true
    },
    // Ambient/Chill Artists
    {
      id: 10,
      title: 'Echoes of Rain',
      artist: 'Silent Grove',
      album: 'Wandering',
      duration: '5:03',
      durationSec: 303,
      cover: 'https://picsum.photos/seed/echoesofrain/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Ambient',
      isLiked: false
    },
    {
      id: 11,
      title: 'Fading Memories',
      artist: 'Silent Grove',
      album: 'Wandering',
      duration: '4:45',
      durationSec: 285,
      cover: 'https://picsum.photos/seed/fadingmemories/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Ambient',
      isLiked: true
    },
    {
      id: 12,
      title: 'Peaceful Horizons',
      artist: 'Serenity Waves',
      album: 'Meditation',
      duration: '6:12',
      durationSec: 372,
      cover: 'https://picsum.photos/seed/peacefulhorizons/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Ambient',
      isLiked: false
    },
    {
      id: 13,
      title: 'Forest Whispers',
      artist: 'Serenity Waves',
      album: 'Nature Sounds',
      duration: '5:28',
      durationSec: 328,
      cover: 'https://picsum.photos/seed/forestwhispers/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Ambient',
      isLiked: true
    },
    // Hip-Hop/Rap Artists
    {
      id: 14,
      title: 'Restless Streets',
      artist: 'Kevin Cole',
      album: 'Urban Tales',
      duration: '4:21',
      durationSec: 261,
      cover: 'https://picsum.photos/seed/restlessstreets/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Hip-Hop',
      isLiked: false
    },
    {
      id: 15,
      title: 'City Beats',
      artist: 'Kevin Cole',
      album: 'Urban Tales',
      duration: '4:03',
      durationSec: 243,
      cover: 'https://picsum.photos/seed/citybeats/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Hip-Hop',
      isLiked: false
    },
    {
      id: 16,
      title: 'Street Crown',
      artist: 'Urban Kings',
      album: 'Concrete Jungle',
      duration: '3:56',
      durationSec: 236,
      cover: 'https://picsum.photos/seed/streetcrown/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Hip-Hop',
      isLiked: true
    },
    {
      id: 17,
      title: 'Rhythm and Flow',
      artist: 'Urban Kings',
      album: 'Concrete Jungle',
      duration: '4:18',
      durationSec: 258,
      cover: 'https://picsum.photos/seed/rhythmflow/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Hip-Hop',
      isLiked: false
    },
    // Rock Artists
    {
      id: 18,
      title: 'Thunder Road',
      artist: 'The Rockers',
      album: 'Electric Legacy',
      duration: '4:42',
      durationSec: 282,
      cover: 'https://picsum.photos/seed/thunderroad/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Rock',
      isLiked: true
    },
    {
      id: 19,
      title: 'Breaking Chains',
      artist: 'The Rockers',
      album: 'Electric Legacy',
      duration: '5:01',
      durationSec: 301,
      cover: 'https://picsum.photos/seed/breakingchains/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Rock',
      isLiked: false
    },
    {
      id: 20,
      title: 'Stone and Fire',
      artist: 'Rebel Hearts',
      album: 'Uprising',
      duration: '4:35',
      durationSec: 275,
      cover: 'https://picsum.photos/seed/stonefire/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Rock',
      isLiked: false
    },
    {
      id: 21,
      title: 'Mountain Echo',
      artist: 'Rebel Hearts',
      album: 'Uprising',
      duration: '4:28',
      durationSec: 268,
      cover: 'https://picsum.photos/seed/mountainecho/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Rock',
      isLiked: true
    },
    // R&B/Soul Artists
    {
      id: 22,
      title: 'Velvet Voice',
      artist: 'Marcus Soul',
      album: 'Smooth Nights',
      duration: '4:56',
      durationSec: 296,
      cover: 'https://picsum.photos/seed/velvetvoice/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'R&B',
      isLiked: true
    },
    {
      id: 23,
      title: 'Silky Smooth',
      artist: 'Marcus Soul',
      album: 'Smooth Nights',
      duration: '5:12',
      durationSec: 312,
      cover: 'https://picsum.photos/seed/silkysmooth/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'R&B',
      isLiked: false
    },
    {
      id: 24,
      title: 'Heartbeat Connection',
      artist: 'Soulfire',
      album: 'Emotions',
      duration: '4:38',
      durationSec: 278,
      cover: 'https://picsum.photos/seed/heartbeat/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'R&B',
      isLiked: false
    },
    // Jazz Artists
    {
      id: 25,
      title: 'Midnight Jazz',
      artist: 'Jazz Quartet',
      album: 'Smooth Sessions',
      duration: '5:34',
      durationSec: 334,
      cover: 'https://picsum.photos/seed/midnightjazz/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Jazz',
      isLiked: true
    },
    {
      id: 26,
      title: 'Blue Moon Serenade',
      artist: 'Jazz Quartet',
      album: 'Smooth Sessions',
      duration: '6:02',
      durationSec: 362,
      cover: 'https://picsum.photos/seed/bluemoon/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Jazz',
      isLiked: false
    },
    // Indie/Indie Pop Artists
    {
      id: 27,
      title: 'Indie Vibes',
      artist: 'Indie Collective',
      album: 'Alternative Sounds',
      duration: '3:43',
      durationSec: 223,
      cover: 'https://picsum.photos/seed/indievibes/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Indie',
      isLiked: true
    },
    {
      id: 28,
      title: 'Underground Revolution',
      artist: 'Indie Collective',
      album: 'Alternative Sounds',
      duration: '4:11',
      durationSec: 251,
      cover: 'https://picsum.photos/seed/underground/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Indie',
      isLiked: false
    },
    // Reggae Artists
    {
      id: 29,
      title: 'Island Life',
      artist: 'Reggae Vibes',
      album: 'Caribbean Sunset',
      duration: '4:24',
      durationSec: 264,
      cover: 'https://picsum.photos/seed/islandlife/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Reggae',
      isLiked: true
    },
    {
      id: 30,
      title: 'Good Vibes Only',
      artist: 'Reggae Vibes',
      album: 'Caribbean Sunset',
      duration: '3:58',
      durationSec: 238,
      cover: 'https://picsum.photos/seed/goodvibes/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Reggae',
      isLiked: false
    },
    // Country Artists
    {
      id: 31,
      title: 'Country Roads',
      artist: 'Nashville Stars',
      album: 'Heartland',
      duration: '4:32',
      durationSec: 272,
      cover: 'https://picsum.photos/seed/countryroads/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Country',
      isLiked: true
    },
    {
      id: 32,
      title: 'Small Town Stories',
      artist: 'Nashville Stars',
      album: 'Heartland',
      duration: '4:45',
      durationSec: 285,
      cover: 'https://picsum.photos/seed/smalltown/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Country',
      isLiked: false
    },
    // Funk Artists
    {
      id: 33,
      title: 'Funky Groove',
      artist: 'Funk Masters',
      album: 'Groovy Beats',
      duration: '4:18',
      durationSec: 258,
      cover: 'https://picsum.photos/seed/funkygroove/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Funk',
      isLiked: true
    },
    {
      id: 34,
      title: 'Bass Drop Fever',
      artist: 'Funk Masters',
      album: 'Groovy Beats',
      duration: '4:02',
      durationSec: 242,
      cover: 'https://picsum.photos/seed/bassdrop/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Funk',
      isLiked: false
    },
    // Classical Artists
    {
      id: 35,
      title: 'Symphony in Motion',
      artist: 'Classical Ensemble',
      album: 'Masterpieces',
      duration: '7:14',
      durationSec: 434,
      cover: 'https://picsum.photos/seed/symphony/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Classical',
      isLiked: true
    },
    {
      id: 36,
      title: 'Piano Concerto',
      artist: 'Classical Ensemble',
      album: 'Masterpieces',
      duration: '8:03',
      durationSec: 483,
      cover: 'https://picsum.photos/seed/pianocon/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Classical',
      isLiked: false
    },
    // Additional Pop Songs
    {
      id: 37,
      title: 'Neon Lights in the City',
      artist: 'Crystal Rivers',
      album: 'Neon Nights',
      duration: '3:52',
      durationSec: 232,
      cover: 'https://picsum.photos/seed/neonlights/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Pop',
      isLiked: true
    },
    {
      id: 38,
      title: 'Heartbeat Echo',
      artist: 'Crystal Rivers',
      album: 'Neon Nights',
      duration: '4:07',
      durationSec: 247,
      cover: 'https://picsum.photos/seed/heartbeatecho/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Pop',
      isLiked: false
    },
    // Additional Electronic Songs
    {
      id: 39,
      title: 'Cyber Dreams',
      artist: 'Tech Groove',
      album: 'Future Sounds',
      duration: '3:38',
      durationSec: 218,
      cover: 'https://picsum.photos/seed/cyberdreams/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Electronic',
      isLiked: false
    },
    {
      id: 40,
      title: 'Laser Lights',
      artist: 'Tech Groove',
      album: 'Future Sounds',
      duration: '4:24',
      durationSec: 264,
      cover: 'https://picsum.photos/seed/laserlights/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Electronic',
      isLiked: true
    },
    // Additional Hip-Hop Songs
    {
      id: 41,
      title: 'Downtown Legends',
      artist: 'Urban Kings',
      album: 'Concrete Jungle',
      duration: '4:12',
      durationSec: 252,
      cover: 'https://picsum.photos/seed/downtown/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'Hip-Hop',
      isLiked: false
    },
    {
      id: 42,
      title: 'High Stakes',
      artist: 'Urban Kings',
      album: 'Concrete Jungle',
      duration: '3:54',
      durationSec: 234,
      cover: 'https://picsum.photos/seed/highstakes/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'Hip-Hop',
      isLiked: true
    },
    // Additional Rock Songs
    {
      id: 43,
      title: 'Raging Storm',
      artist: 'Rebel Hearts',
      album: 'Uprising',
      duration: '4:41',
      durationSec: 281,
      cover: 'https://picsum.photos/seed/ragingstorm/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Rock',
      isLiked: false
    },
    {
      id: 44,
      title: 'Burning Sky',
      artist: 'Rebel Hearts',
      album: 'Uprising',
      duration: '5:18',
      durationSec: 318,
      cover: 'https://picsum.photos/seed/burningsky/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Rock',
      isLiked: true
    },
    // Additional R&B Songs
    {
      id: 45,
      title: 'Love Sensation',
      artist: 'Soulfire',
      album: 'Emotions',
      duration: '5:02',
      durationSec: 302,
      cover: 'https://picsum.photos/seed/lovesensation/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'R&B',
      isLiked: true
    },
    {
      id: 46,
      title: 'Sweet Melody',
      artist: 'Soulfire',
      album: 'Emotions',
      duration: '4:44',
      durationSec: 284,
      cover: 'https://picsum.photos/seed/sweetmelody/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      genre: 'R&B',
      isLiked: false
    },
    // More Genres
    {
      id: 47,
      title: 'K-Pop Sensation',
      artist: 'Seoul Beats',
      album: 'K-Wave',
      duration: '3:34',
      durationSec: 214,
      cover: 'https://picsum.photos/seed/kpop/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      genre: 'K-Pop',
      isLiked: true
    },
    {
      id: 48,
      title: 'Latin Passion',
      artist: 'Latino Fiesta',
      album: 'Ritmo Latino',
      duration: '4:28',
      durationSec: 268,
      cover: 'https://picsum.photos/seed/latinpassion/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      genre: 'Latin',
      isLiked: false
    },
    {
      id: 49,
      title: 'Desi Dreams',
      artist: 'Bollywood Stars',
      album: 'Hindi Hits',
      duration: '4:15',
      durationSec: 255,
      cover: 'https://picsum.photos/seed/desidreams/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      genre: 'Bollywood',
      isLiked: true
    },
    {
      id: 50,
      title: 'Afrobeats Vibes',
      artist: 'African Groove',
      album: 'Continental Sounds',
      duration: '3:56',
      durationSec: 236,
      cover: 'https://picsum.photos/seed/afrobeats/300/300',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      genre: 'Afrobeats',
      isLiked: false
    }
  ];

  // ---- Playback state (shared across components via RxJS) -----------
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);

  currentSong$: Observable<Song | null> = this.currentSongSubject.asObservable();
  isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();

  getSongs(): Song[] {
    return this.songs;
  }

  getCurrentSong(): Song | null {
    return this.currentSongSubject.value;
  }

  isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  playSong(song: Song): void {
    this.currentSongSubject.next(song);
    this.isPlayingSubject.next(true);
  }

  togglePlay(state?: boolean): void {
    this.isPlayingSubject.next(state ?? !this.isPlayingSubject.value);
  }

  playNext(): void {
    const current = this.currentSongSubject.value;
    if (!current) return;
    const idx = this.songs.findIndex(s => s.id === current.id);
    const nextIdx = (idx + 1) % this.songs.length;
    this.playSong(this.songs[nextIdx]);
  }

  playPrevious(): void {
    const current = this.currentSongSubject.value;
    if (!current) return;
    const idx = this.songs.findIndex(s => s.id === current.id);
    const prevIdx = (idx - 1 + this.songs.length) % this.songs.length;
    this.playSong(this.songs[prevIdx]);
  }

  toggleLike(song: Song): void {
    song.isLiked = !song.isLiked;
  }

  // ---- Additional Methods for Dataset Management -----
  
  /**
   * Get all unique genres in the catalog
   * Inspired by Kaggle music datasets
   */
  getGenres(): string[] {
    const genres = new Set(this.songs.map(song => song.genre));
    return Array.from(genres).sort();
  }

  /**
   * Get all unique artists in the catalog
   */
  getArtists(): string[] {
    const artists = new Set(this.songs.map(song => song.artist));
    return Array.from(artists).sort();
  }

  /**
   * Get all unique albums in the catalog
   */
  getAlbums(): string[] {
    const albums = new Set(this.songs.map(song => song.album));
    return Array.from(albums).sort();
  }

  /**
   * Filter songs by genre
   * @param genre - The genre to filter by
   * @returns Array of songs matching the genre
   */
  getSongsByGenre(genre: string): Song[] {
    return this.songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase());
  }

  /**
   * Filter songs by artist
   * @param artist - The artist name to filter by
   * @returns Array of songs by the artist
   */
  getSongsByArtist(artist: string): Song[] {
    return this.songs.filter(song => song.artist.toLowerCase() === artist.toLowerCase());
  }

  /**
   * Filter songs by album
   * @param album - The album name to filter by
   * @returns Array of songs from the album
   */
  getSongsByAlbum(album: string): Song[] {
    return this.songs.filter(song => song.album.toLowerCase() === album.toLowerCase());
  }

  /**
   * Get all liked songs
   * @returns Array of liked songs
   */
  getLikedSongs(): Song[] {
    return this.songs.filter(song => song.isLiked);
  }

  /**
   * Get music catalog statistics
   * Provides insights similar to Kaggle datasets
   */
  getStatistics(): any {
    const genres = this.getGenres();
    const artists = this.getArtists();
    const albums = this.getAlbums();
    
    return {
      totalSongs: this.songs.length,
      totalArtists: artists.length,
      totalAlbums: albums.length,
      totalGenres: genres.length,
      genres: genres,
      artists: artists,
      albums: albums,
      likedSongs: this.getLikedSongs().length,
      averageDuration: (this.songs.reduce((sum, song) => sum + song.durationSec, 0) / this.songs.length).toFixed(2),
      genreDistribution: this.getGenreDistribution()
    };
  }

  /**
   * Get distribution of songs by genre
   * Useful for analytics similar to Kaggle
   */
  getGenreDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {};
    this.getGenres().forEach(genre => {
      distribution[genre] = this.getSongsByGenre(genre).length;
    });
    return distribution;
  }

  /**
   * Get distribution of songs by artist
   */
  getArtistDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {};
    this.getArtists().forEach(artist => {
      distribution[artist] = this.getSongsByArtist(artist).length;
    });
    return distribution;
  }

  /**
   * Search songs by multiple criteria
   * Similar to Kaggle dataset queries
   */
  searchSongs(criteria: {
    title?: string;
    artist?: string;
    album?: string;
    genre?: string;
  }): Song[] {
    return this.songs.filter(song => {
      if (criteria.title && !song.title.toLowerCase().includes(criteria.title.toLowerCase())) {
        return false;
      }
      if (criteria.artist && !song.artist.toLowerCase().includes(criteria.artist.toLowerCase())) {
        return false;
      }
      if (criteria.album && !song.album.toLowerCase().includes(criteria.album.toLowerCase())) {
        return false;
      }
      if (criteria.genre && song.genre.toLowerCase() !== criteria.genre.toLowerCase()) {
        return false;
      }
      return true;
    });
  }

  /**
   * Export dataset as JSON (for analysis with Kaggle or similar)
   */
  exportDataset(): string {
    return JSON.stringify({
      metadata: {
        totalSongs: this.songs.length,
        exportDate: new Date().toISOString(),
        source: 'Melodify Music Catalog (Kaggle-inspired)'
      },
      songs: this.songs,
      statistics: this.getStatistics()
    }, null, 2);
  }
}
