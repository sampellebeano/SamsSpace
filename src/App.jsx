import './App.css'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const editableRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = editableRef.current?.textContent?.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="sam-green">Sam Green</h1>
      <div className="input-box-container">
        <div
          ref={editableRef}
          className="search-input center-editable"
          contentEditable
          role="textbox"
          aria-label="What do you want to know..."
          spellCheck={false}
          data-placeholder="What do you want to know..."
          onKeyDown={handleKeyPress}
        ></div>
      </div>
      <div className="button-row">
        <button className="homepage-btn" onClick={handleSearch}>Search</button>
        <button className="homepage-btn linkedin-btn" onClick={() => window.open('https://www.linkedin.com/in/samjohngreen/', '_blank')}>LinkedIn</button>
      </div>
    </div>
  );
}
export default App;