// FloatingMenu.jsx
import { Link, useLocation } from "react-router-dom"
import { TerminalSquare, Film, Settings2, HandCoins } from "lucide-react"

const FloatingMenu = () => {
  const location = useLocation()

  const links = [
    { to: "/", icon: <TerminalSquare size={20} />, label: "Home" },
    { to: "/select", icon: <Settings2 size={20} />, label: "Select" },
    { to: "/vault", icon: <Film size={20} />, label: "Vault" },
    { to: "/support", icon: <HandCoins size={20} />, label: "Support" },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-[#0f0f0f]/80 border border-cyan-800 rounded-2xl backdrop-blur-lg shadow-lg p-3 flex flex-col gap-4">
      {links.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-2 text-sm hover:text-cyan-300 transition ${
            location.pathname === to ? "text-cyan-400" : "text-gray-300"
          }`}
        >
          {icon}
          <span>{label}</span>
        </Link>
      ))}
    </div>
  )
}

export default FloatingMenu
