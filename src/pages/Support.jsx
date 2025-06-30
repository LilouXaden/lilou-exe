import { useEffect, useState } from "react"
import systemsData from "../data/systems.json"
import opsLog from "../data/ops.json"

export default function Support() {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const sum = opsLog.reduce((acc, op) => acc + op.amount, 0)
    setTotal(sum)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0010] to-black text-white px-6 py-12 font-mono" style={{padding:"100px 20px 300px 20px"}}>
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-cyan-400 font-bold mb-4">/SUPPORT LILOU.EXE</h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
          I have a mind full of ideas and fantasies, but not always the funds to bring them to life.
          With your help, each protocol upgrade becomes possible. Your support directly expands
          the capacities of Lilou.exe.
        </p>
        <a
          href="https://ko-fi.com/lilouexe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-full transition shadow-lg"
        >
          ⚡ Inject Core Energy
        </a>
        <div className="mt-3 text-sm text-gray-500">
          Total injected: <span className="text-cyan-300 font-bold">{total}€</span>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-2xl mx-auto border-l-2 border-cyan-700 pl-6 mb-20">
        {systemsData.map((sys, index) => {
          const previousGoal = index === 0 ? 0 : systemsData[index - 1].goal
          const isUnlocked = total >= previousGoal
          const progress = isUnlocked
            ? Math.min(100, ((total - previousGoal) / (sys.goal - previousGoal)) * 100)
            : 0

          return (
            <div key={sys.id} className="relative pb-16">
              {/* Timeline Node */}
              <div
                className={`absolute -left-[37px] top-0 w-6 h-6 rounded-full border-2 ${
                  progress === 100 ? "bg-cyan-400 border-cyan-200" : "bg-black border-cyan-600"
                }`} 
              />
              {/* Content */}
              <div>
                <h3 className="text-lg text-cyan-300 font-semibold">
                  {sys.version || `v1.${index}`} — {sys.name}
                </h3>
                <p className="text-sm text-gray-300 mb-2">{sys.description}</p>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                  <div
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {Math.min(total, sys.goal)} / {sys.goal}€ injected
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* OPERATOR LOG */}
      <div className="max-w-xl mx-auto mt-12">
        <h2 className="text-2xl text-purple-400 mb-4">/ops.log</h2>
        <div className="bg-[#0c0c0c] rounded-xl p-4 border border-purple-800 text-sm space-y-4 max-h-[300px] overflow-y-auto">
          {opsLog
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((op, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-cyan-300 font-semibold">
                  <span>Operator {op.name}</span>
                  <span>{op.amount}€</span>
                </div>
                <div className="text-gray-500 text-xs">
                  {new Date(op.date).toLocaleDateString()}
                </div>
                {op.message && (
                  <div className="text-purple-300 text-xs mt-1 italic">"{op.message}"</div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
