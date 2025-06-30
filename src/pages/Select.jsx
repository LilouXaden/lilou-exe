import { useState } from "react";
import { useNavigate } from "react-router-dom";
import outfitData from "../data/outfit.json";
import videosData from "../data/videos.json";

const TextOption = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full border text-sm font-mono transition 
      ${selected ? "bg-pink-500 text-black border-pink-400" : "border-gray-600 text-white hover:border-pink-400 hover:text-pink-300"}`}
  >
    {label}
  </button>
);

const SelectPage = () => {
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState("");
  const [previewOutfit, setPreviewOutfit] = useState(null); // May include non-selectable ones
  const [positions, setPositions] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [moods, setMoods] = useState([]);

  const allPositions = Array.from(new Set(videosData.flatMap((v) => v.position)));
  const allAccessories = Array.from(new Set(videosData.flatMap((v) => v.accessories)));
  const allMoods = Array.from(new Set(videosData.flatMap((v) => v.mood)));

  const toggle = (value, list, setter) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleOutfitClick = (o) => {
    setPreviewOutfit(o); // Show preview regardless
    if (!o.fundingLink) setOutfit(outfit === o.label ? "" : o.label);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (outfit) params.append("outfit", outfit);
    positions.forEach((p) => params.append("position", p));
    accessories.forEach((a) => params.append("accessories", a));
    moods.forEach((m) => params.append("mood", m));
    navigate(`/vault?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#0a0010] to-black text-pink-400" style={{padding:"100px 20px 300px 20px"}}>

    <div className="min-h-screen text-white font-mono pb-32 relative mx-auto" style={{ maxWidth: "800px" }}>

      <h1 className="text-center text-3xl text-pink-300 my-6 tracking-wide" style={{margin:"40px 0 40px 0"}}>SELECT YOUR PROTOCOL</h1>

      {/* OUTFIT SECTION */}
      <div className="px-6 flex flex-col md:flex-row items-center justify-center gap-10 text-start">
        {/* Outfit Menu */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-xl text-pink-400 mb-3">Outfit</h2>
          <div className="flex flex-wrap gap-2">
            {outfitData.map((o) => {
              const isDisabled = !!o.fundingLink;
              const isActive = previewOutfit?.label === o.label;

              return (
                <button
                  key={o.label}
                  onClick={() => handleOutfitClick(o)}
                  className={`px-4 py-2 rounded-full text-sm border transition relative ${
                    outfit === o.label
                      ? "bg-pink-500 text-black border-pink-400"
                      : isDisabled
                      ? "border-gray-700 text-gray-500 hover:border-purple-400 hover:text-purple-300"
                      : "border-gray-700 text-white hover:border-pink-300 hover:text-pink-300"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SCAN VISUAL */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative mb-6">
            {previewOutfit ? (
              <>
                <img
                  src={previewOutfit.image}
                  alt={previewOutfit.label}
                  className="w-64 h-64 object-cover rounded-full border-2 border-pink-500 shadow-[0_0_40px_#ff00cc66] animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent animate-scanline pointer-events-none " />
                {previewOutfit.fundingLink && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center px-4 text-center rounded-full">
                    <p className="text-sm text-purple-300 mb-2">
                      <strong>{previewOutfit.label}</strong> incoming...
                    </p>
                    <a
                      href={previewOutfit.fundingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 underline hover:text-purple-300 text-xs"
                    >
                      🎁 Help unlock this outfit
                    </a>
                  </div>
                )}
              </>
            ) : (
              <div className="w-64 h-64 rounded-full border-2 border-pink-500 bg-[#0f0f0f] flex items-center justify-center text-gray-500">
                Awaiting scan...
              </div>
            )}
          </div>
        </div>

      </div>

      {/* OTHER FIELDS */}
      <div className="px-6 mt-10 space-y-6">
        <div>
          <h2 className="text-xl text-pink-400 mb-2">Position</h2>
          <div className="flex flex-wrap gap-2">
            {allPositions.map((pos) => (
              <TextOption
                key={pos}
                label={pos}
                selected={positions.includes(pos)}
                onClick={() => toggle(pos, positions, setPositions)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl text-pink-400 mb-2">Accessories</h2>
          <div className="flex flex-wrap gap-2">
            {allAccessories.map((acc) => (
              <TextOption
                key={acc}
                label={acc}
                selected={accessories.includes(acc)}
                onClick={() => toggle(acc, accessories, setAccessories)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl text-pink-400 mb-2">Mood</h2>
          <div className="flex flex-wrap gap-2">
            {allMoods.map((mood) => (
              <TextOption
                key={mood}
                label={mood}
                selected={moods.includes(mood)}
                onClick={() => toggle(mood, moods, setMoods)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FIXED LAUNCH BUTTON */}
      <div className="fixed bottom-0 left-0 w-full px-6 py-4 flex justify-center">
        <button
          onClick={handleSearch}
          className="text-pink-400 hover:text-white bg-pink-600/20 hover:bg-pink-600/40 px-4 py-2 rounded-full transition font-semibold"
        >
          &gt; Launch
        </button>
      </div>

    </div>

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
};

export default SelectPage;
