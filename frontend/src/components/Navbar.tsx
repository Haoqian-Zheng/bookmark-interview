interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl">🔖</span>
          <span className="ml-2 text-xl font-bold">Bookmarks</span>
        </div>
        <button
          onClick={onLogout}
          className="text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
