import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import DarkModeToggle from './DarkModeToggle.jsx';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = new URLSearchParams(location.search).get('q') || '';
    const [newQuery, setNewQuery] = useState(searchQuery);

    const handleSearch = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (newQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleSearch(e);
        }
    };

    return (
        <div className="homepage-container">
            <h1 className="sam-green clickable" onClick={() => navigate('/')}>
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
                <button
                    className="homepage-btn search-btn"
                    onClick={(e) => handleSearch(e)}
                    type="button"
                >
                    Search
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

            <footer className="footer footer-visible">
                <div className="footer-content">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cv'); }} className="footer-link">My CV</a>
                    <DarkModeToggle />
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.open('https://www.linkedin.com/in/samjohngreen/', '_blank'); }}
                        className="footer-link"
                    >
                        LinkedIn
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default SearchResults;
