import { useState, useEffect } from 'react';
import './DarkModeToggle.css';

/**
 * Dark Mode Toggle Component
 * 
 * Features:
 * - Automatic day/night switching based on sunrise/sunset times
 * - Manual override capability
 * - Remembers user choice in localStorage
 * - Smooth transitions between light and dark modes
 * - Accessible with proper ARIA labels
 * - Mobile-responsive design
 */
function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAutoMode, setIsAutoMode] = useState(true);

    // Get user's location for sunrise/sunset calculation
    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    // Default to Dublin, Ireland if location not available
                    resolve({ latitude: 53.3498, longitude: -6.2603 });
                }
            );
        });
    };

    // Calculate sunrise and sunset times
    const getSunTimes = (lat, lng) => {
        const now = new Date();
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);

        // Simplified sunrise/sunset calculation
        const P = Math.asin(0.39795 * Math.cos(0.98563 * (dayOfYear - 173) * Math.PI / 180));
        const argument = -Math.tan(lat * Math.PI / 180) * Math.tan(P);

        // Handle polar day/night
        if (argument < -1) return { sunrise: 0, sunset: 24 }; // Polar day
        if (argument > 1) return { sunrise: 12, sunset: 12 }; // Polar night

        const hourAngle = 24 / Math.PI * Math.acos(argument);

        const timeCorrection = 4 * (lng - 15 * Math.round(lng / 15));
        const sunrise = 12 - hourAngle / 2 - timeCorrection / 60;
        const sunset = 12 + hourAngle / 2 - timeCorrection / 60;

        return { sunrise, sunset };
    };

    // Check if it's currently night time
    const isNightTime = async () => {
        try {
            const location = await getUserLocation();
            const { sunrise, sunset } = getSunTimes(location.latitude, location.longitude);
            const now = new Date();
            const currentHour = now.getHours() + now.getMinutes() / 60;

            return currentHour < sunrise || currentHour > sunset;
        } catch (error) {
            // Fallback to simple time-based check (8 PM to 6 AM)
            const currentHour = new Date().getHours();
            return currentHour >= 20 || currentHour < 6;
        }
    };

    const updateTheme = (dark) => {
        const root = document.documentElement;
        if (dark) {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
    };

    const checkAutoMode = async () => {
        if (isAutoMode) {
            const shouldBeDark = await isNightTime();
            setIsDarkMode(shouldBeDark);
            updateTheme(shouldBeDark);
        }
    };

    useEffect(() => {
        // Check for saved preferences
        const savedTheme = localStorage.getItem('theme');
        const savedAutoMode = localStorage.getItem('autoMode');

        if (savedAutoMode === 'false') {
            // Manual mode
            setIsAutoMode(false);
            const shouldUseDark = savedTheme === 'dark';
            setIsDarkMode(shouldUseDark);
            updateTheme(shouldUseDark);
        } else {
            // Auto mode (default)
            setIsAutoMode(true);
            checkAutoMode();
        }

        // Set up interval to check every minute for auto mode
        const interval = setInterval(() => {
            checkAutoMode();
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [isAutoMode]);

    const toggleMode = () => {
        if (isAutoMode) {
            // Switch to manual mode and toggle
            const newDarkMode = !isDarkMode;
            setIsAutoMode(false);
            setIsDarkMode(newDarkMode);
            updateTheme(newDarkMode);
            localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
            localStorage.setItem('autoMode', 'false');
        } else {
            // Toggle between dark/light in manual mode
            const newDarkMode = !isDarkMode;
            setIsDarkMode(newDarkMode);
            updateTheme(newDarkMode);
            localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        }
    };

    const resetToAuto = () => {
        setIsAutoMode(true);
        localStorage.setItem('autoMode', 'true');
        localStorage.removeItem('theme');
        checkAutoMode();
    };

    const getButtonText = () => {
        if (isAutoMode) {
            return `Auto mode: ${isDarkMode ? 'Night' : 'Day'}`;
        } else {
            return `Manual: ${isDarkMode ? 'Dark' : 'Light'} mode`;
        }
    };

    return (
        <div className="dark-mode-controls footer-toggle">
            <button
                className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'} ${isAutoMode ? 'auto' : 'manual'}`}
                onClick={toggleMode}
                aria-label={getButtonText()}
                title={getButtonText()}
            >
                <span className="toggle-icon">
                    {isDarkMode ? (
                        <div className="time-circle">5pm</div>
                    ) : (
                        <div className="time-circle">5am</div>
                    )}
                </span>
                {isAutoMode && <span className="auto-indicator">●</span>}
            </button>
            {!isAutoMode && (
                <button
                    className="auto-reset-btn"
                    onClick={resetToAuto}
                    aria-label="Switch to auto mode"
                    title="Switch to automatic day/night mode"
                >
                    🔄
                </button>
            )}
        </div>
    );
}

export default DarkModeToggle;
