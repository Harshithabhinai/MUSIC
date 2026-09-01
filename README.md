# Melodify — Music Streaming UI (Angular + Bootstrap)

A responsive, Spotify-style music player web app built with **Angular 17** and
**Bootstrap 5**. Built as a portfolio / resume project to demonstrate:

- Component-based architecture (Navbar, Sidebar, Song List, Player)
- Shared state management across components using an Angular **service +
  RxJS `BehaviorSubject`** (no external state library needed)
- Real, working audio playback via the native HTML5 `<audio>` element —
  play/pause, next/previous, seek bar, and volume control
- Two-way data binding and reactive forms (`ngModel`) for a live search/filter
  feature across song title, artist, and album
- Fully responsive layout using Bootstrap's grid + utility classes, with a
  mobile-friendly collapsed layout
- TypeScript interfaces/models for strong typing (`Song`)

## Features

- 🎵 Browse a catalog of songs with cover art, artist, album, and genre
- 🔍 Live search/filter as you type
- ▶️ Click any row (or hover to reveal the play button) to start playback
- ⏯️ Persistent bottom player bar with play/pause, next, previous
- 🎚️ Seek bar synced to actual audio playback position
- 🔊 Volume control
- ❤️ Like/unlike songs
- 📱 Responsive: sidebar and secondary columns collapse gracefully on mobile

## Tech Stack

| Layer          | Technology              |
|----------------|--------------------------|
| Framework      | Angular 17 (NgModule-based) |
| Styling        | Bootstrap 5 + Bootstrap Icons + custom SCSS |
| State          | RxJS `BehaviorSubject` in `MusicService` |
| Language       | TypeScript |

## Project Structure

```
music-app/
├── package.json
├── angular.json
├── tsconfig.json / tsconfig.app.json
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss                # global theme (dark mode, CSS variables)
    └── app/
        ├── app.module.ts
        ├── app.component.ts/html/scss
        ├── models/
        │   └── song.model.ts
        ├── services/
        │   └── music.service.ts   # catalog + playback state
        └── components/
            ├── navbar/            # brand, search bar, profile
            ├── sidebar/           # nav links + playlists
            ├── song-list/         # searchable song table
            └── player/            # bottom playback bar (audio element)
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm start

# 3. Open the app
http://localhost:4200
```

> Requires Node.js 18+ and the Angular CLI (`npm install -g @angular/cli`) if
> you want to use `ng` commands directly.

## Notes

- Album art uses placeholder images (picsum.photos); audio tracks use public
  demo MP3s (SoundHelix) so the player works immediately without needing to
  supply your own media files. Swap `cover` and `audioSrc` in
  `music.service.ts` with your own assets/API for production use.
- For a resume/portfolio project, you can highlight: component communication
  (`@Input`/`@Output`), RxJS observables, service-based state sharing,
  `ViewChild` + native DOM API usage (audio element), and responsive Bootstrap
  layout design.

## Possible Extensions

- Connect to a real backend (Spotify Web API, or a custom Node/Express API)
- Add routing for Album/Artist detail pages (`@angular/router`)
- Add a queue/playlist drag-and-drop feature
- Persist "Liked Songs" and volume to `localStorage`
- Add unit tests with Jasmine/Karma for `MusicService`
