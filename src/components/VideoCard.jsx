// src/components/VideoCard.jsx
import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 hover:border-cyan-400 transition-all shadow-md">
      <img
        src={video.thumb}
        alt={video.title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="text-white font-semibold text-lg mb-1">{video.title}</h3>
      <div className="text-sm text-zinc-400 mb-2">
        <p><strong>Outfit:</strong> {video.outfit}</p>
        <p><strong>Position:</strong> {video.position.join(", ")}</p>
        <p><strong>Accessories:</strong> {video.accessories.join(", ")}</p>
        <p><strong>Mood:</strong> {video.mood.join(", ")}</p>
      </div>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded"
      >
        Watch
      </a>
    </div>
  );
};

export default VideoCard;
