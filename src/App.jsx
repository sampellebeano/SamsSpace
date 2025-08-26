import './App.css'
import { useRef, useState } from 'react';

function App() {
  const editableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const query = editableRef.current?.textContent?.trim();
    if (query) {
      setSearchQuery(query);
      setShowResults(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleNewSearch = () => {
    const query = editableRef.current?.textContent?.trim();
    if (query) {
      setSearchQuery(query);
    }
  };

  const handleNewSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNewSearch();
    }
  };

  return (
    <div className={`homepage-container ${showResults ? 'search-mode' : ''}`}>
      <h1 className={`sam-green ${showResults ? 'compact' : ''}`}>Sam Green</h1>

      <div className={`input-box-container ${showResults ? 'compact' : ''}`}>
        <div
          ref={editableRef}
          className="search-input center-editable"
          contentEditable
          role="textbox"
          aria-label="What do you want to know..."
          spellCheck={false}
          data-placeholder="What do you want to know..."
          onKeyDown={showResults ? handleNewSearchKeyPress : handleKeyPress}
        ></div>
      </div>

      <div className={`button-row ${showResults ? 'compact' : ''}`}>
        <button className="homepage-btn" onClick={showResults ? handleNewSearch : handleSearch}>
          Search
        </button>
        <button
          className={`homepage-btn linkedin-btn ${showResults ? 'fade-out' : ''}`}
          onClick={() => window.open('https://www.linkedin.com/in/samjohngreen/', '_blank')}
        >
          LinkedIn
        </button>
      </div>

      {showResults && (
        <div className="search-results fade-in">
          <h2>Search Results for: "{searchQuery}"</h2>
          <div className="results-container">
            <p>Here are the results for your search query.</p>
            {/* Add your actual search results here */}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;