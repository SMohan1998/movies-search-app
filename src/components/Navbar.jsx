import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const base = 'px-3 py-2 rounded';
  const active = 'bg-gray-900 text-white';
  const inactive = 'text-gray-800 hover:bg-gray-200';
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">🎬 Movies Search</Link>
        <div className="space-x-2">
          <NavLink to="/" end className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Search</NavLink>
          <NavLink to="/favorites" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>Favorites</NavLink>
        </div>
      </nav>
    </header>
  );
}
