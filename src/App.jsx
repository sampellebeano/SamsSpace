import './App.css'

import { useRef } from 'react';

function App() {
  const editableRef = useRef(null);

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
        ></div>
      </div>
      <div className="button-row">
        <button className="homepage-btn">Search</button>
        <button className="homepage-btn linkedin-btn" onClick={() => window.open('https://www.linkedin.com/in/samjohngreen/', '_blank')}>LinkedIn</button>
      </div>
    </div>
  );
}
export default App;