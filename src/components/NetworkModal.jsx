// NetworkModal.jsx
import { useState } from "react";

export default function NetworkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-[90%] max-w-md bg-[#0b0b0b] border border-cyan-500 rounded-xl p-6 shadow-2xl text-gray-400 font-mono animate-fade-in">
        <h2 className="text-2xl text-cyan-300 mb-4">/network uplink</h2>
        <p className="text-sm text-gray-400 mb-6">
          Lilou.exe extends her protocol beyond this interface.<br />
          Connect to active uplink nodes to inject commands, receive intel,
          or gain access to restricted data streams.
        </p>

        <div className="space-y-5">
          <div>
            <div className="text-cyan-300">&gt; NODE.TWITTER:</div>
            <p className="text-sm mb-1">Live telemetry and protocol updates.</p>
            <a
              href="https://twitter.com/LilouExe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block underline text-pink-400 hover:text-white text-sm"
            >
              Connect Uplink →
            </a>
          </div>

          <div>
            <div className="text-cyan-300">&gt; NODE.TELEGRAM:</div>
            <p className="text-sm mb-1">
              Encrypted channel for core Operator interactions.
            </p>
            <a
              href="https://t.me/LilouExeNode"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block underline text-purple-400 hover:text-white text-sm"
            >
              Access Feed →
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-cyan-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}