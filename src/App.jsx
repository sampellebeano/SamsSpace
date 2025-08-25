
import './App.css'

function App() {
  return (
    <div className="homepage-container">
      <h1 className="sam-green">Sam Green</h1>
      <div className="input-box-container">
        <input
          type="text"
          className="search-input"
          placeholder="Type here..."
        />
      </div>
      <div className="button-row">
        <button className="homepage-btn">Search</button>
        <button className="homepage-btn linkedin-btn" onClick={() => window.open('https://www.linkedin.com/in/samjohngreen/', '_blank')}>LinkedIn</button>
      </div>
    </div>
  );
}

export default App;
