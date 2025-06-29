import { useEffect, useState } from "react"

const Support = () => {
  const [systems, setSystems] = useState([])
  const [ops, setOps] = useState([])

  useEffect(() => {
    // Chargement local de données simulées (remplace par fetch si besoin)
    import("../data/systems.json").then((mod) => setSystems(mod.default))
    import("../data/ops.json").then((mod) => setOps(mod.default))
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-4 py-10">
      <h1 className="text-center text-4xl mb-10">
        <span className="text-cyan-300">$</span> SYSTEM STATUS // Lilou.exe
      </h1>

      {/* Stretch Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {systems.map((sys) => {
          const progress = Math.min(100, (sys.current / sys.goal) * 100)
          const filled = progress >= 100

          return (
            <div key={sys.id} className="bg-[#0f0f0f] border border-cyan-700 rounded-2xl p-4 shadow-md hover:scale-[1.01] transition">
              <img src={sys.image} alt={sys.name} className="w-full h-40 object-cover rounded-xl mb-4" />

              <h2 className="text-xl text-cyan-300 mb-1">{sys.name}</h2>
              <p className="text-sm text-green-300 mb-3">{sys.description}</p>

              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div className={`h-3 rounded-full ${filled ? 'bg-green-400' : 'bg-cyan-400'}`} style={{ width: `${progress}%` }}></div>
              </div>

              <div className="text-xs text-green-500 mb-3">
                {sys.current}€ / {sys.goal}€ — {Math.floor(progress)}%
              </div>

              {!filled && (
                <a
                  href={sys.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-xl transition"
                >
                  Inject Credits
                </a>
              )}
              {filled && (
                <div className="text-center text-green-400 text-sm mt-2">
                  ✅ Protocol fully integrated
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-cyan-800 my-12"></div>

      {/* Operator Log */}
      <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-cyan-800 rounded-xl p-6 shadow-inner">
        <h2 className="text-xl text-cyan-300 mb-4">/OPS.LOG</h2>
        <div className="text-sm text-green-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
          {ops.length === 0 ? (
            <p className="text-gray-600">Awaiting operator activity...</p>
          ) : (
            ops.map((entry, idx) => (
              <div key={idx}>
                <span className="text-gray-500">[{new Date(entry.timestamp).toLocaleString()}]</span>{" "}
                Operator <span className="text-cyan-400">{entry.operator}</span> injected{" "}
                <span className="text-white">{entry.credits} credits</span> toward{" "}
                <span className="text-purple-400">{entry.target}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-8 italic">
        All injections fuel the evolution of Lilou.exe. Operator data is anonymized. Terminal logs are reset periodically.
      </p>
    </div>
  )
}

export default Support
