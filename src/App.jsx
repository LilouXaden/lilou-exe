import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Home from "./pages/Home"
import Select from "./pages/Select"
import Vault from "./pages/Vault"
import Support from "./pages/Support"
import About from "./pages/About"

import FloatingMenu from "./components/FloatingMenu"
import TerminalRedirect from "./components/TerminalRedirect"
import NetworkModal from "./components/NetworkModal"
import AgeGate from "./components/AgeGate" 

const App = () => {
  const [networkOpen, setNetworkOpen] = useState(false)

  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white font-mono">
        <AgeGate /> 
        <FloatingMenu />

        {/* Bouton d’ouverture du Network */}
        <button
          onClick={() => setNetworkOpen(true)}
          className="fixed top-6 right-6 z-40 bg-black/80 border border-cyan-500 text-cyan-300 rounded-full px-4 py-2 text-sm font-mono hover:bg-cyan-500 hover:text-black transition"
        >
          /network
        </button>

        {/* Composant Modal */}
        <NetworkModal isOpen={networkOpen} onClose={() => setNetworkOpen(false)} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Select />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <TerminalRedirect />
      </div>
    </Router>
  )
}

export default App
