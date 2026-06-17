import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  increment 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Video } from '../types';

export const videoService = {
  async uploadVideo(video: { title: string; video_url: string; thumbnail_url: string }) {
    if (!video.title || !video.video_url || !video.thumbnail_url) {
      throw new Error('All fields are required');
    }

    return await addDoc(collection(db, "videos"), {
      ...video,
      views: 0,
      likes: 0,
      category: 'Trending', // Default category for easier filtering in UI
      duration: '10:00', // Mock duration calculation
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
  },

  async incrementViews(videoId: string) {
    const videoRef = doc(db, "videos", videoId);
    return await updateDoc(videoRef, {
      views: increment(1)
    });
  },

  async deleteVideo(videoId: string) {
    return await deleteDoc(doc(db, "videos", videoId));
  },

  async updateVideo(videoId: string, data: Partial<Video>) {
    const videoRef = doc(db, "videos", videoId);
    return await updateDoc(videoRef, {
      ...data,
      updated_at: serverTimestamp()
    });
  }
};
