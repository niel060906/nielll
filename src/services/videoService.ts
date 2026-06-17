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
import { db, auth } from '../lib/firebase';
import { Video } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const videoService = {
  async uploadVideo(video: { title: string; video_url: string; thumbnail_url: string }) {
    if (!video.title || !video.video_url || !video.thumbnail_url) {
      throw new Error('All fields are required');
    }

    try {
      return await addDoc(collection(db, "videos"), {
        ...video,
        views: 0,
        likes: 0,
        category: 'Trending',
        duration: '10:00',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "videos");
    }
  },

  async incrementViews(videoId: string) {
    const videoRef = doc(db, "videos", videoId);
    try {
      return await updateDoc(videoRef, {
        views: increment(1)
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `videos/${videoId}`);
    }
  },

  async deleteVideo(videoId: string) {
    try {
      return await deleteDoc(doc(db, "videos", videoId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `videos/${videoId}`);
    }
  },

  async updateVideo(videoId: string, data: Partial<Video>) {
    const videoRef = doc(db, "videos", videoId);
    try {
      return await updateDoc(videoRef, {
        ...data,
        updated_at: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `videos/${videoId}`);
    }
  }
};
