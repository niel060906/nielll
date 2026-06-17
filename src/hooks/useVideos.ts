import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Video } from '../types';

export const useVideos = (pageSize = 12) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "videos"),
      orderBy("created_at", "desc"),
      limit(pageSize)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      
      setVideos(videoData);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === pageSize);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pageSize]);

  const loadMore = useCallback(async () => {
    if (!lastDoc || !hasMore || loadingMore) return;

    setLoadingMore(true);
    const nextQ = query(
      collection(db, "videos"),
      orderBy("created_at", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );

    const snapshot = await getDocs(nextQ);
    const newVideos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Video[];

    setVideos(prev => [...prev, ...newVideos]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    setHasMore(snapshot.docs.length === pageSize);
    setLoadingMore(false);
  }, [lastDoc, hasMore, loadingMore, pageSize]);

  return { videos, loading, loadingMore, hasMore, loadMore };
};

export const useRealtimeStats = () => {
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalViews: 0,
    totalLikes: 0
  });

  useEffect(() => {
    const q = collection(db, "videos");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalViews = 0;
      let totalLikes = 0;
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        totalViews += data.views || 0;
        totalLikes += data.likes || 0;
      });
      setStats({
        totalVideos: snapshot.size,
        totalViews,
        totalLikes
      });
    });
    return () => unsubscribe();
  }, []);

  return stats;
};
