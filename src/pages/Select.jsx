import { useState } from "react";
import { useNavigate } from "react-router-dom";
import outfitData from "../data/outfit.json";
import positionData from "../data/position.json";
import accessoriesData from "../data/accessories.json";
import moodData from "../data/mood.json";

const ImageOption = ({ src, label, selected, onClick, disabled, fundingLink }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-200 shadow-xl cursor-pointer group ${
      selected ? "border-cyan-400" : "border-transparent"
    } ${disabled ? "opacity-40 cursor-not-allowed grayscale" : "hover:scale-105"}`}
  >
    <img src={src} alt={label} className="w-full h-32 object-cover" />
    <div className="text-center text-sm text-white bg-black bg-opacity-60 py-1">
      {label}
    </div>
    {disabled && fundingLink && (
      <>
        <div className="absolute top-2 left-2 bg-purple-700 text-white text-[10px] px-2 py-1 rounded-full uppercase">
          Coming Soon
        </div>
        <a
          href={fundingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-1 right-2 text-[10px] text-purple-300 underline opacity-80 hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          🎁 Help Fund
        </a>
      </>
    )}
  </div>
);

const SelectGroup = ({ title, options, selected, setSelected, multi = true, disableByFunding = false }) => {
  const toggleSelection = (option) => {
    if (multi) {
      setSelected((prev) =>
        prev.includes(option.label) ? prev.filter((o) => o !== option.label) : [...prev, option.label]
      );
    } else {
      setSelected(option.label === selected ? "" : option.label);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl text-cyan-400 font-mono">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((opt) => {
          const isDisabled = disableByFunding && !!opt.fundingLink;
          return (
            <ImageOption
              key={opt.label}
              src={opt.image}
              label={opt.label}
              fundingLink={opt.fundingLink}
              disabled={isDisabled}
              selected={multi ? selected.includes(opt.label) : selected === opt.label}
              onClick={() => toggleSelection(opt)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function SelectPage() {
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState("");
  const [positions, setPositions] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [moods, setMoods] = useState([]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (outfit) params.append("outfit", outfit);
    positions.forEach((p) => params.append("position", p));
    accessories.forEach((a) => params.append("accessories", a));
    moods.forEach((m) => params.append("mood", m));
    navigate(`/vault?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 font-mono">
      <h1 className="text-3xl text-center text-purple-500 mb-8">SELECT YOUR PROTOCOL</h1>
      <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-8">
        <SelectGroup
          title="Outfit"
          options={outfitData}
          selected={outfit}
          setSelected={setOutfit}
          multi={false}
          disableByFunding={true}
        />
        <SelectGroup
          title="Position"
          options={positionData}
          selected={positions}
          setSelected={setPositions}
        />
        <SelectGroup
          title="Accessories"
          options={accessoriesData}
          selected={accessories}
          setSelected={setAccessories}
          disableByFunding={true}
        />
        <SelectGroup
          title="Mood"
          options={moodData}
          selected={moods}
          setSelected={setMoods}
        />
      </div>
      <div className="text-center mt-12">
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-full shadow-lg transition"
        >
          Launch Protocol
        </button>
      </div>
    </div>
  );
}
