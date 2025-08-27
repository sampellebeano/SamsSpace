import './App.css'
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import aiService from './aiService.js';
import DarkModeToggle from './DarkModeToggle.jsx';

function App() {
  const editableRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Handle scroll to hide/show footer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Only hide footer when there are results and page is scrollable
      if (showResults && documentHeight > windowHeight) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px
          setShowFooter(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowFooter(true);
        }
      } else {
        // Always show footer on homepage or short pages
        setShowFooter(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, showResults]);

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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
      e.stopPropagation();
      handleSearch(e);
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
          <button
            className="homepage-btn search-btn"
            onClick={(e) => handleSearch(e)}
            type="button"
          >
            Search
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
            <button
              className="bottom-search-btn search-btn"
              onClick={(e) => handleSearch(e)}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      )}

      <footer className={`footer ${showFooter ? 'footer-visible' : 'footer-hidden'}`}>
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
export default App;