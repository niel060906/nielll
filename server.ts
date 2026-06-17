import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  let videos = [
    {
      id: "1",
      title: "Cosmos: Beyond Time",
      video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail_url: "/src/assets/images/apple_tv_premium_hero_1781728601624.jpg",
      duration: "58:00",
      views: 1240580,
      category: "Trending",
      uploaded_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "Foundation",
      video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail_url: "https://picsum.photos/seed/foundation/1280/720",
      duration: "52:00",
      views: 850000,
      category: "New Uploads",
      uploaded_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Ted Lasso",
      video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail_url: "https://picsum.photos/seed/tedlasso/1280/720",
      duration: "30:00",
      views: 2500000,
      category: "Recommended",
      uploaded_at: new Date().toISOString()
    },
    {
      id: "4",
      title: "Severance",
      video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail_url: "https://picsum.photos/seed/severance/1280/720",
      duration: "58:00",
      views: 980000,
      category: "Continue Watching",
      uploaded_at: new Date().toISOString()
    },
    {
      id: "5",
      title: "Hijack",
      video_url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail_url: "https://picsum.photos/seed/hijack/1280/720",
      duration: "45:00",
      views: 1100000,
      category: "Trending",
      uploaded_at: new Date().toISOString()
    }
  ];

  // API Routes
  app.get("/api/videos", (req, res) => {
    res.json({ success: true, data: videos });
  });

  app.post("/api/videos", (req, res) => {
    const { title, video_url, thumbnail_url } = req.body;
    if (!title || !video_url || !thumbnail_url) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const newVideo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      video_url,
      thumbnail_url,
      duration: "10:00", // Default
      views: 0,
      category: "New Uploads",
      uploaded_at: new Date().toISOString()
    };
    videos.unshift(newVideo);
    res.status(201).json({ success: true, data: newVideo });
  });

  app.delete("/api/videos/:id", (req, res) => {
    const { id } = req.params;
    videos = videos.filter(v => v.id !== id);
    res.json({ success: true, message: "Video deleted" });
  });

  app.put("/api/videos/:id", (req, res) => {
    const { id } = req.params;
    const { title, video_url, thumbnail_url } = req.body;
    const index = videos.findIndex(v => v.id === id);
    if (index !== -1) {
      videos[index] = { ...videos[index], title, video_url, thumbnail_url };
      res.json({ success: true, data: videos[index] });
    } else {
      res.status(404).json({ success: false, message: "Video not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
