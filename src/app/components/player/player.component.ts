import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../models/song.model';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  currentSong: Song | null = null;
  isPlaying = false;
  volume = 80;
  currentTime = 0;   // seconds
  duration = 0;       // seconds

  private subs: Subscription[] = [];

  constructor(private musicService: MusicService) {}

  ngAfterViewInit(): void {
    this.subs.push(
      this.musicService.currentSong$.subscribe(song => {
        this.currentSong = song;
        if (song && this.audioRef) {
          const audio = this.audioRef.nativeElement;
          audio.src = song.audioSrc;
          audio.load();
          if (this.isPlaying) {
            audio.play().catch(() => {});
          }
        }
      })
    );

    this.subs.push(
      this.musicService.isPlaying$.subscribe(playing => {
        this.isPlaying = playing;
        const audio = this.audioRef?.nativeElement;
        if (!audio || !this.currentSong) return;
        if (playing) {
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
      })
    );

    this.audioRef.nativeElement.volume = this.volume / 100;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  togglePlay(): void {
    if (!this.currentSong) return;
    this.musicService.togglePlay();
  }

  next(): void {
    this.musicService.playNext();
  }

  previous(): void {
    this.musicService.playPrevious();
  }

  onTimeUpdate(): void {
    const audio = this.audioRef.nativeElement;
    this.currentTime = audio.currentTime;
    this.duration = audio.duration || 0;
  }

  onTrackEnded(): void {
    this.next();
  }

  onSeek(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    const audio = this.audioRef.nativeElement;
    audio.currentTime = value;
    this.currentTime = value;
  }

  onVolumeChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.volume = value;
    this.audioRef.nativeElement.volume = value / 100;
  }

  formatTime(totalSeconds: number): string {
    if (!totalSeconds || isNaN(totalSeconds)) return '0:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
