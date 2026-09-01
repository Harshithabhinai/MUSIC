import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../../models/song.model';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  @Input() searchTerm = '';

  allSongs: Song[] = [];
  currentSong$!: Observable<Song | null>;
  isPlaying$!: Observable<boolean>;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.allSongs = this.musicService.getSongs();
    this.currentSong$ = this.musicService.currentSong$;
    this.isPlaying$ = this.musicService.isPlaying$;
  }

  get filteredSongs(): Song[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.allSongs;
    return this.allSongs.filter(song =>
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      song.album.toLowerCase().includes(term)
    );
  }

  play(song: Song): void {
    this.musicService.playSong(song);
  }

  togglePlayPause(song: Song, event: Event): void {
    event.stopPropagation();
    const currentSong = this.musicService.getCurrentSong();
    const isPlaying = this.musicService.isPlaying();
    if (currentSong?.id === song.id) {
      this.musicService.togglePlay(!isPlaying);
    } else {
      this.play(song);
    }
  }

  toggleLike(song: Song, event: Event): void {
    event.stopPropagation();
    this.musicService.toggleLike(song);
  }

  trackBySongId(_index: number, song: Song): number {
    return song.id;
  }
}
