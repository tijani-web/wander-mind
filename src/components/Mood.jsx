import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from './Layout';
import moodToLocation from '../data/moodToLocation';
import moodQuotes from '../data/moodQuotes';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Mood = () => {
  const { mood } = useParams(); // e.g. /mood/sad
  const [imageUrl, setImageUrl] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  const fetchImage = async (query) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setImageUrl(data.results[0].urls.regular);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (mood && moodToLocation[mood]) {
      const randomLocation =
        moodToLocation[mood][
          Math.floor(Math.random() * moodToLocation[mood].length)
        ];
      setSelectedLocation(randomLocation);
      setQuote(
        moodQuotes[mood][
          Math.floor(Math.random() * moodQuotes[mood].length)
        ]
      );
      setLoading(true);
      fetchImage(randomLocation.imageQuery).then(() => setLoading(false));
    }
  }, [mood]);

  const handleSaveEscape = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to save your escape");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "escapes"), {
        mood,
        location: selectedLocation,
        imageUrl,
        quote,
        createdAt: new Date()
      });

      setShowSavedPopup(true);
      setTimeout(() => setShowSavedPopup(false), 2000);
    } catch (error) {
      console.error("Error saving escape:", error);
      alert("Failed to save escape.");
    }
  };

  if (loading || !selectedLocation) {
    return (
      <Layout>
        <div className="loading-screen">
          <h2>✨ Getting your dream escape...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="overlay">
        <div className="text-content">
          <h1>Feeling {mood.charAt(0).toUpperCase() + mood.slice(1)}?</h1>
          <p style={{paddingTop: '10px'}}>
            Consider <span className='location-highlight' style={{
                background:'rgba(255, 255, 255, 0.08)',
                padding: '10px 20px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem'
            }}> {selectedLocation.vibe}</span> at{" "}
            <strong  className="location-highlight" style={{
                background:'rgba(255, 255, 255, 0.08)',
                padding: '10px 20px',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                backdropFilter: 'blur(12px)',
                margin: '0 5px'
            }}>
              {selectedLocation.location}, {selectedLocation.country}
            </strong>.
          </p>
        </div>

        <div className="escape-card">
          <div className="escape-image-container">
            <img
              src={imageUrl}
              alt={selectedLocation.location}
              className="escape-image"
            />

            <div className="content-overlay">
              <p className="quote-text">“{quote}”</p>

              <div className="btn-s">
                <button onClick={handleSaveEscape} className='save-btn'>Save this escape</button>
                {showSavedPopup && (
                  <div className="saved-popup">✅ Escape Saved!</div>
                )}
                <button className="try-btn">Try another mood</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
