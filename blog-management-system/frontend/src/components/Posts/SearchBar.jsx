import { Search, X } from 'lucide-react';
import { useState } from 'react';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-panel">
      <div className="search-field">
        <Search size={19} className="search-icon" />
        <input
          type="text"
          placeholder="Search by title, author, or category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="icon-button clear-search"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
