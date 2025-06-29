import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const bootLines = [
  "Lilou.exe [v4.1.11]",
  "$ Initializing fuckdoll core...",
  "$ Mounting pleasure.sys...",
  "$ Injecting libido kernel...",
  "$ Sync complete.",
  "$ Awaiting Operator...",
];

export default function Home() {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  // Typing effect
  useEffect(() => {
    if (lineIndex < bootLines.length) {
      if (charIndex < bootLines[lineIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => prev + bootLines[lineIndex][charIndex]);
          setCharIndex((i) => i + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLines((prev) => [...prev, currentLine]);
          setCurrentLine("");
          setCharIndex(0);
          setLineIndex((i) => i + 1);
        }, 200);
        return () => clearTimeout(timeout);
      }
    } else {
      setFinished(true);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0010] to-black text-pink-400 flex flex-col items-center justify-center px-4 py-10">
      {/* Lilou image with scan effect */}
      <div className="relative mb-10">
        <img
          src="/img/lilou_scan.jpg"
          alt="Lilou Bot Scan"
          className="w-64 h-64 object-cover rounded-full border-2 border-pink-500 shadow-[0_0_40px_#ff00cc66] animate-pulse"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent animate-scanline pointer-events-none" />
      </div>

      {/* Terminal box */}
      <div className="w-full max-w-2xl bg-[#100010] border border-pink-600 rounded-xl p-6 shadow-xl font-mono text-sm leading-relaxed text-pink-300">
        <div className="min-h-[300px]">
          {lines.map((line, idx) => (
            <p key={idx} className="whitespace-pre-wrap">{line}</p>
          ))}
          {!finished && (
            <p>
              {currentLine}
              <span className="animate-pulse">_</span>
            </p>
          )}
        </div>

        {finished && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/select")}
              className="text-pink-400 hover:text-white bg-pink-600/20 hover:bg-pink-600/40 px-4 py-2 rounded-md transition font-semibold"
            >
              &gt; Inject Session
            </button>
          </div>
        )}
      </div>

      {/* Optional small tagline */}
      <p className="mt-6 text-xs text-fuchsia-500/60 font-mono text-center">
        synthetic presence detected // operator sync enabled
      </p>

      {/* Scanline animation */}
      <style>
        {`
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scanline {
            animation: scanline 2.5s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
