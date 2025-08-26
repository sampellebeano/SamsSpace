import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = new URLSearchParams(location.search).get('q') || '';
    const [newQuery, setNewQuery] = useState(searchQuery);

    const handleSearch = () => {
        if (newQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="homepage-container">
            <h1 className="sam-green" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                Sam Green
            </h1>

            <div className="input-box-container">
                <div
                    className="search-input center-editable"
                    contentEditable
                    role="textbox"
                    aria-label="Search query"
                    spellCheck={false}
                    data-placeholder="Search..."
                    onInput={(e) => setNewQuery(e.target.textContent)}
                    onKeyDown={handleKeyPress}
                    suppressContentEditableWarning={true}
                >
                    {newQuery}
                </div>
            </div>

            <div className="button-row">
                <button className="homepage-btn" onClick={handleSearch}>
                    Search
                </button>
                <button className="homepage-btn linkedin-btn" onClick={() => window.open('https://www.linkedin.com/in/samjohngreen/', '_blank')}>
                    LinkedIn
                </button>
            </div>

            {searchQuery && (
                <div className="search-results">
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

export default SearchResults;
