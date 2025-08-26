import './App.css'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import aiService from './aiService.js';

function App() {
  const editableRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const query = editableRef.current?.textContent?.trim();
    if (query && !isLoading) {
      const newUserMessage = { type: 'user', content: query };

      // Add user message immediately
      if (!showResults) {
        setMessages([newUserMessage]);
        setShowResults(true);
      } else {
        setMessages(prev => [...prev, newUserMessage]);
      }

      // Clear the input
      editableRef.current.textContent = '';
      setIsLoading(true);

      try {
        // Get AI response
        const aiResponse = await aiService.sendMessage(query);
        const newAIMessage = { type: 'ai', content: aiResponse };

        // Add AI response
        setMessages(prev => [...prev, newAIMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        const errorMessage = {
          type: 'ai',
          content: "I'm sorry, I'm having trouble processing your request right now. Please try again later."
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
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
        className={`sam-green clickable ${showResults ? 'compact' : ''}`}
        onClick={handleHomeClick}
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
            {isLoading && (
              <div className="chat-message ai-message loading">
                <strong>AI:</strong> <span className="typing-indicator">Thinking...</span>
              </div>
            )}
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