import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-green-500 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold"></h1>
        <nav>
          <ul className="flex space-x-8 text-base font-medium">
            <li>
              <Link to="/" className="hover:underline">
                Početna
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:underline">
                Artikli
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
