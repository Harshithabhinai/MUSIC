import { Component } from '@angular/core';

interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  mainNav: NavItem[] = [
    { label: 'Home', icon: 'bi-house-fill', active: true },
    { label: 'Search', icon: 'bi-search' },
    { label: 'Your Library', icon: 'bi-collection-play-fill' }
  ];

  playlists: string[] = [
    'Liked Songs',
    'Recently Played',
    'Chill Vibes',
    'Workout Mix',
    'Late Night Focus',
    'Road Trip Anthems',
    'Throwback Hits'
  ];
}
