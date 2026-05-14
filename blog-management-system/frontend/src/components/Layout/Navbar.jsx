import { Link, useLocation } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <FileText size={20} />
          </span>
          <span>Blog Studio</span>
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            All Posts
          </Link>
          <Link to="/add" className="btn btn-primary btn-sm nav-action">
            <Plus size={16} />
            Add Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
