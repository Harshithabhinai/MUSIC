"""
Kaggle Dataset Import Script for Melodify
This script demonstrates how to download and import Kaggle music datasets
into the Melodify application.
"""

import pandas as pd
import json
from pathlib import Path
from typing import List, Dict, Any

class MelodifyDatasetImporter:
    """Import and convert Kaggle datasets to Melodify format"""
    
    def __init__(self):
        self.output_dir = Path('src/assets/datasets')
        self.output_dir.mkdir(parents=True, exist_ok=True)
    
    def convert_csv_to_melodify(self, csv_file: str, output_name: str = 'imported_songs.json'):
        """
        Convert a Kaggle CSV dataset to Melodify format
        
        Expected CSV columns: name, artists, duration_ms, genre (or similar)
        """
        try:
            df = pd.read_csv(csv_file)
            print(f"✓ Loaded {len(df)} songs from {csv_file}")
            
            # Convert to Melodify format
            songs = []
            for idx, row in df.iterrows():
                song = self._create_song_object(row, idx + 1)
                songs.append(song)
            
            # Save as JSON
            output_path = self.output_dir / output_name
            with open(output_path, 'w') as f:
                json.dump(songs, f, indent=2)
            
            print(f"✓ Converted {len(songs)} songs to Melodify format")
            print(f"✓ Saved to {output_path}")
            
            return songs
        
        except Exception as e:
            print(f"✗ Error converting dataset: {e}")
            return []
    
    def convert_spotify_format(self, csv_file: str) -> List[Dict[str, Any]]:
        """
        Convert Spotify dataset format
        Expected columns: track_name, artists, duration_ms, genre
        """
        df = pd.read_csv(csv_file)
        songs = []
        
        for idx, row in df.iterrows():
            # Handle different column name variations
            title = row.get('track_name') or row.get('name') or 'Unknown'
            artist = row.get('artists') or row.get('artist_name') or 'Unknown'
            
            # Duration is typically in milliseconds in Spotify data
            duration_ms = row.get('duration_ms', 0)
            duration_sec = int(duration_ms / 1000) if pd.notna(duration_ms) else 0
            
            # Format duration as mm:ss
            minutes = duration_sec // 60
            seconds = duration_sec % 60
            duration_str = f"{minutes}:{seconds:02d}"
            
            song = {
                'id': idx + 1,
                'title': str(title),
                'artist': str(artist),
                'album': str(row.get('album', 'Unknown')),
                'duration': duration_str,
                'durationSec': duration_sec,
                'cover': f'https://picsum.photos/seed/{title.replace(" ", "").lower()}/300/300',
                'audioSrc': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                'genre': str(row.get('genre', 'Pop')),
                'isLiked': False
            }
            songs.append(song)
        
        return songs
    
    def convert_million_song_format(self, json_file: str) -> List[Dict[str, Any]]:
        """
        Convert Million Song Dataset format
        """
        with open(json_file, 'r') as f:
            data = json.load(f)
        
        songs = []
        for idx, item in enumerate(data if isinstance(data, list) else [data]):
            # Adjust field names based on Million Song Dataset structure
            song = {
                'id': idx + 1,
                'title': item.get('title', 'Unknown'),
                'artist': item.get('artist_name', 'Unknown'),
                'album': item.get('release', 'Unknown Album'),
                'duration': self._format_duration(item.get('duration', 0)),
                'durationSec': int(item.get('duration', 0)),
                'cover': f'https://picsum.photos/seed/{item.get("title", "").replace(" ", "").lower()}/300/300',
                'audioSrc': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                'genre': item.get('genre', 'Pop'),
                'isLiked': False
            }
            songs.append(song)
        
        return songs
    
    def _create_song_object(self, row: pd.Series, song_id: int) -> Dict[str, Any]:
        """Create a Melodify song object from a CSV row"""
        
        # Try to extract values with multiple possible column names
        title = self._get_value(row, ['name', 'track_name', 'title'])
        artist = self._get_value(row, ['artists', 'artist', 'artist_name'])
        album = self._get_value(row, ['album', 'album_name'])
        genre = self._get_value(row, ['genre', 'style'])
        
        # Handle duration (might be in ms or seconds)
        duration_raw = self._get_numeric_value(row, ['duration_ms', 'duration', 'duration_s'])
        if duration_raw > 60:  # Likely milliseconds
            duration_sec = int(duration_raw / 1000)
        else:  # Likely seconds
            duration_sec = int(duration_raw)
        
        # Format as mm:ss
        minutes = duration_sec // 60
        seconds = duration_sec % 60
        duration_str = f"{minutes}:{seconds:02d}"
        
        song = {
            'id': song_id,
            'title': str(title),
            'artist': str(artist),
            'album': str(album),
            'duration': duration_str,
            'durationSec': duration_sec,
            'cover': f'https://picsum.photos/seed/{title.replace(" ", "").lower()}/300/300',
            'audioSrc': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            'genre': str(genre),
            'isLiked': False
        }
        
        return song
    
    def _get_value(self, row: pd.Series, column_names: List[str]) -> str:
        """Get value from row, trying multiple column names"""
        for col in column_names:
            if col in row.index:
                val = row[col]
                if pd.notna(val):
                    return val
        return 'Unknown'
    
    def _get_numeric_value(self, row: pd.Series, column_names: List[str]) -> float:
        """Get numeric value from row, trying multiple column names"""
        for col in column_names:
            if col in row.index:
                val = row[col]
                if pd.notna(val):
                    return float(val)
        return 0
    
    def _format_duration(self, seconds: int) -> str:
        """Format duration in seconds to mm:ss"""
        minutes = seconds // 60
        secs = seconds % 60
        return f"{minutes}:{secs:02d}"
    
    def generate_statistics(self, songs: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate statistics from imported songs"""
        df = pd.DataFrame(songs)
        
        return {
            'total_songs': len(songs),
            'unique_artists': df['artist'].nunique(),
            'unique_albums': df['album'].nunique(),
            'unique_genres': df['genre'].nunique(),
            'genres': df['genre'].unique().tolist(),
            'average_duration': df['durationSec'].mean(),
            'genre_distribution': df['genre'].value_counts().to_dict(),
            'artist_distribution': df['artist'].value_counts().head(10).to_dict()
        }


def main():
    """Example usage"""
    importer = MelodifyDatasetImporter()
    
    print("🎵 Melodify Dataset Importer")
    print("=" * 50)
    
    # Example 1: Convert Spotify CSV
    print("\n📥 To import Spotify dataset:")
    print("1. Download from Kaggle: https://www.kaggle.com/datasets/spotify/")
    print("2. Run: python import_kaggle_datasets.py")
    print("3. Dataset will be converted and saved automatically")
    
    # Example 2: Convert Million Song Dataset
    print("\n📥 To import Million Song Dataset:")
    print("1. Download from Kaggle: https://www.kaggle.com/datasets/millionsongdataset/")
    print("2. Place JSON files in current directory")
    print("3. Run: importer.convert_million_song_format('file.json')")
    
    print("\n" + "=" * 50)
    print("✓ Ready to import datasets!")
    
    # Uncomment to test with actual data:
    # songs = importer.convert_csv_to_melodify('spotify_songs.csv', 'spotify_imported.json')
    # stats = importer.generate_statistics(songs)
    # print(json.dumps(stats, indent=2))


if __name__ == '__main__':
    main()


# ==================== USAGE EXAMPLES ====================
"""
# Example 1: Import Spotify CSV
from import_kaggle_datasets import MelodifyDatasetImporter

importer = MelodifyDatasetImporter()
songs = importer.convert_csv_to_melodify('spotify_songs.csv')
print(f"Imported {len(songs)} songs!")


# Example 2: Generate statistics
stats = importer.generate_statistics(songs)
print(f"Total Artists: {stats['unique_artists']}")
print(f"Genres: {', '.join(stats['genres'])}")


# Example 3: Convert and save
songs = importer.convert_spotify_format('spotify_data.csv')
with open('melodify_songs.json', 'w') as f:
    json.dump(songs, f, indent=2)
"""
