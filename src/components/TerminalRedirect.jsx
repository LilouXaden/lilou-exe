import { useEffect, useState } from "react";

const TerminalRedirect = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [autoTriggered, setAutoTriggered] = useState(false);

  const bootLines = [
    "> INITIALIZING NETWORK ACCESS...",
    "> LINKING TO EXTERNAL NODES...",
    "> NODE://FANSLY... OK",
    "> NODE://MANYVIDS... OK",
    "> BOOT COMPLETE — ACCESS GRANTED"
  ];

  const links = [
    { name: "Fansly", url: "https://fansly.com/lilou.exe" },
    { name: "ManyVids", url: "https://manyvids.com/Profile/xxxxx" },
    { name: "Pornhub", url: "https://pornhub.com/model/lilou" }
  ];

  // Inactivity auto trigger
  useEffect(() => {
    const trigger = () => {
      clearTimeout(window.__inactivityTimeout);
      if (!autoTriggered) {
        window.__inactivityTimeout = setTimeout(() => {
          setShowTerminal(true);
          setAutoTriggered(true); // Only auto-open once
        }, 10000);
      }
    };

    window.addEventListener("mousemove", trigger);
    window.addEventListener("keydown", trigger);
    window.addEventListener("touchstart", trigger);
    trigger();

    return () => {
      window.removeEventListener("mousemove", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("touchstart", trigger);
      clearTimeout(window.__inactivityTimeout);
    };
  }, [autoTriggered]);

  // Simulate boot sequence
  useEffect(() => {
    if (showTerminal) {
      setBootProgress(0);
      setBootDone(false);
      let index = 0;
      const interval = setInterval(() => {
        index++;
        if (index >= bootLines.length) {
          clearInterval(interval);
          setBootDone(true);
        } else {
          setBootProgress(index);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [showTerminal]);

  return (
    <>
      {/* Persistent Button */}
      <button
        onClick={() => setShowTerminal(true)}
        className="fixed bottom-4 right-4 z-40 bg-cyan-500 text-black text-xs font-bold px-3 py-2 rounded-full shadow-md hover:bg-cyan-400 transition"
      >
        ACCESS PORTALS
      </button>

      {/* Terminal Modal */}
      {showTerminal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="bg-[#0a0a0a] text-gray-400 border border-cyan-500 rounded-xl w-full max-w-md p-6 font-mono text-sm shadow-xl relative">
            {/* Dismiss */}
            <button
              onClick={() => setShowTerminal(false)}
              className="absolute top-2 right-3 text-cyan-300 hover:text-red-500 text-xs"
            >
              ✕ DISMISS
            </button>

            <div className="text-cyan-300 mb-2 text-xs">/EXTERNAL.PROTOCOL</div>

            {!bootDone ? (
              <div className="space-y-1">
                {bootLines.slice(0, bootProgress + 1).map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 mt-2">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-cyan-500 rounded-lg px-3 py-2 bg-black text-cyan-300 hover:bg-cyan-700 hover:text-black transition text-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalRedirect;
