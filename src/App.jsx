import './App.css'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const editableRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const getAIResponse = (query) => {
    const responses = [
      "I'm Sam Green's AI assistant. I can help answer questions about Sam's background, experience, and interests. What would you like to know?",
      "That's a great question! Sam has extensive experience in various fields. Feel free to ask me anything specific about his work or background.",
      "I'd be happy to help you learn more about Sam. Is there a particular aspect of his experience you're interested in?",
      "Sam is passionate about technology and innovation. What specific area would you like to explore?",
      "Thanks for your interest in Sam's background! I can provide information about his skills, experience, or projects."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSearch = () => {
    const query = editableRef.current?.textContent?.trim();
    if (query) {
      const newUserMessage = { type: 'user', content: query };
      const newAIMessage = { type: 'ai', content: getAIResponse(query) };
      
      if (!showResults) {
        setMessages([newUserMessage, newAIMessage]);
        setShowResults(true);
      } else {
        setMessages(prev => [...prev, newUserMessage, newAIMessage]);
      }
      
      // Clear the input
      editableRef.current.textContent = '';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleHomeClick = () => {
    setMessages([]);
    setShowResults(false);
    if (editableRef.current) {
      editableRef.current.textContent = '';
    }
  };

  return (
    <div className={`homepage-container ${showResults ? 'search-mode' : ''}`}>
      <h1 
        className={`sam-green ${showResults ? 'compact' : ''}`}
        onClick={handleHomeClick}
        style={{ cursor: 'pointer' }}
      >
        <span className="word-line">I'm</span>
        <span className="word-line">Sam</span>
        <span className="word-line">Green<span className="blue-dot">.</span></span>
      </h1>

      {!showResults && (
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
      )}

      {!showResults && (
        <div className="button-row">
          <button className="homepage-btn" onClick={handleSearch}>
            Search
          </button>
          <button
            className="homepage-btn linkedin-btn"
            onClick={() => window.open('https://www.linkedin.com/in/samjohngreen/', '_blank')}
          >
            LinkedIn
          </button>
        </div>
      )}

      {showResults && (
        <div className="search-results fade-in">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.type}-message`}>
                <strong>{message.type === 'user' ? 'You:' : 'AI:'}</strong> {message.content}
              </div>
            ))}
          </div>
        </div>
      )}

      {showResults && (
        <div className="bottom-search-container">
          <div className="bottom-search-box">
            <div
              ref={editableRef}
              className="bottom-search-input"
              contentEditable
              role="textbox"
              aria-label="Ask another question..."
              spellCheck={false}
              data-placeholder="Ask another question..."
              onKeyDown={handleKeyPress}
            ></div>
            <button className="bottom-search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cv'); }} className="footer-link">My CV</a>
          {showResults && (
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.open('https://www.linkedin.com/in/samjohngreen/', '_blank'); }} 
              className="footer-link"
            >
              LinkedIn
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
export default App;