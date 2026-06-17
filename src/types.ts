export interface Video {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  likes: number;
  category?: string; // Optional if not in Firestore schema explicitly
  duration?: string; // Optional
  created_at: any; // Firestore Timestamp
  updated_at: any; // Firestore Timestamp
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type VideoCategory = 'Trending' | 'New Uploads' | 'Recommended' | 'Continue Watching';
