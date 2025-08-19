import { NavLink } from "react-router-dom";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import { useEffect, useState } from "react";

const moods = [
  { emoji: '😢', label: 'Sad' },
  { emoji: '😣', label: 'Stressed' },
  { emoji: '🤩', label: 'Excited' },
  { emoji: '🥱', label: 'Tired' },
  { emoji: '❄️', label: 'Numb' },
  { emoji: '🌇', label: 'Nostalgic' },
  { emoji: '🧗‍♂️', label: 'Adventurous' },
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="content-container">
        <p className="top-words">
          <BlurText
            text="calm. Explore. Reflect"
            delay={150}
            animateBy="words"
            direction="top"
          />
        </p>
        
        <h1 className="main-heading">
          <span className="heading-line">Your AI-powered</span>
          <span className="heading-line">travel & mindfulness</span>
          <span className="heading-line">companion.</span>
        </h1>
        
        <ShinyText 
          text="💬 Chat With Me!" 
          disabled={false} 
          speed={3} 
          className='cta-button' 
        />
        
        <div className="blur-box">
          <h2 className="mood-question">How are you feeling today?</h2>
          <div className="mood-options">
            {moods.map((mood, index) => (
              <NavLink
                key={index}
                to={`/mood/${mood.label.toLowerCase()}`}
                className="mood-btn"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="emoji">{mood.emoji}</span>
                <span className="label">{mood.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;