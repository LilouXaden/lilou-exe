import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import videosData from "../data/videos.json"

const Vault = () => {
  const [filteredVideos, setFilteredVideos] = useState([])
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const outfit = searchParams.get("outfit")
    const position = searchParams.getAll("position")
    const accessories = searchParams.getAll("accessories")
    const mood = searchParams.getAll("mood")

    const matches = videosData.filter((video) => {
      const matchOutfit = !outfit || video.outfit === outfit
      const matchPosition = position.every(p => video.position.includes(p))
      const matchAccessories = accessories.every(a => video.accessories.includes(a))
      const matchMood = mood.every(m => video.mood.includes(m))

      return matchOutfit && matchPosition && matchAccessories && matchMood
    })

    setFilteredVideos(matches)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0010] to-black text-pink-400 px-6 py-12">
      <h1 className="text-4xl font-mono text-center mb-10 text-pink-300">/VAULT</h1>

      {filteredVideos.length > 0 ? (
        <>
          <h2 className="text-2xl font-mono text-pink-200 mb-4">Matching Protocols</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {filteredVideos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0f0f0f] border border-pink-800 rounded-2xl hover:scale-[1.02] hover:shadow-lg transition p-2"
              >
                <img
                  src={video.thumb}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <div className="font-mono text-sm text-pink-100">{video.title}</div>
                <div className="text-xs text-gray-400">
                  <span className="block">Outfit: {video.outfit}</span>
                  <span className="block">Position: {video.position.join(", ")}</span>
                  <span className="block">Accessories: {video.accessories.join(", ")}</span>
                  <span className="block">Mood: {video.mood.join(", ")}</span>
                </div>
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mb-16">No matching protocols found.</div>
      )}

      <div className="border-t border-pink-800 my-10"></div>

      <h2 className="text-2xl font-mono text-pink-200 mb-4">All Protocols</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {videosData.map((video) => (
          <a
            key={`all-${video.id}`}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0f0f0f] border border-gray-700 rounded-2xl hover:scale-[1.02] hover:shadow-md transition p-2"
          >
            <img
              src={video.thumb}
              alt={video.title}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <div className="font-mono text-sm text-white">{video.title}</div>
            <div className="text-xs text-gray-400">
              <span className="block">Outfit: {video.outfit}</span>
              <span className="block">Position: {video.position.join(", ")}</span>
              <span className="block">Accessories: {video.accessories.join(", ")}</span>
              <span className="block">Mood: {video.mood.join(", ")}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Custom Protocol Section */}
      <div className="bg-[#101010] border border-purple-800 rounded-2xl p-6 shadow-lg relative overflow-hidden mb-24">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/terminal_bg.svg')] bg-center bg-cover animate-pulse"></div>

        <h2 className="text-3xl text-center text-purple-400 font-mono mb-4">/CUSTOM PROTOCOL</h2>
        <p className="text-center text-sm text-gray-300 max-w-2xl mx-auto mb-6">
          Can't find your perfect combination? Deploy a tailor-made scenario.<br />
          You define the Outfit, Mood, Accessories and Action. Lilou.exe will execute.
        </p>
        <div className="text-center">
          <a
            href="https://www.manyvids.com/Profile/1009839785/LilouExe/Store/Custom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold text-lg rounded-full shadow-md transition"
          >
            Inject Custom Protocol
          </a>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          Request. Deploy. Watch it unfold.
        </p>
      </div>
    </div>
  )
}

export default Vault
