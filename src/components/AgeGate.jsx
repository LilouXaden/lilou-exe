import { useEffect, useState } from "react"

const AgeGate = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const confirmed = localStorage.getItem("ageConfirmed")
    if (!confirmed) setShow(true)
  }, [])

  const handleConfirm = () => {
    const sound = new Audio("/sfx/access_granted.mp3")
    sound.play()
    localStorage.setItem("ageConfirmed", "true")
    setShow(false)
  }

  const handleDeny = () => {
    window.location.href = "https://www.google.com"
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative bg-[#0d0d0d] border border-cyan-500 text-cyan-300 rounded-xl p-6 shadow-2xl font-mono w-full max-w-sm animate-fadein">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent animate-scanline pointer-events-none rounded-xl" />
        
        <h2 className="text-center text-xl mb-4">$ ACCESS REQUIRED</h2>
        <p className="text-center text-sm text-cyan-200 mb-6">
          This interface contains adult-oriented protocols. Confirm you are 18+ to proceed.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full shadow-md transition"
          >
            Confirm Access
          </button>
          <button
            onClick={handleDeny}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition"
          >
            Exit
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          lilou.exe / age.gate v1.0
        </div>

        <style>
          {`
            @keyframes scanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
            .animate-scanline {
              animation: scanline 3s linear infinite;
            }
            @keyframes fadein {
              0% { opacity: 0; transform: scale(0.95); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-fadein {
              animation: fadein 0.4s ease-out;
            }
          `}
        </style>
      </div>
    </div>
  )
}

export default AgeGate
