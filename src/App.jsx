import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Select from "./pages/Select"
import Vault from "./pages/Vault"
import Support from "./pages/Support"
import FloatingMenu from "./components/FloatingMenu"
import TerminalRedirect from "./components/TerminalRedirect"

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white font-mono">
        <FloatingMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Select />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <TerminalRedirect />
      </div>
    </Router>
  )
}

export default App