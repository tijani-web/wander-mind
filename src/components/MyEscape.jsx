import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Layout } from './Layout';
import { useNavigate } from 'react-router-dom';

const MyEscapes = () => {
  const [escapes, setEscapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEscapes = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("No current user");
        setLoading(false);
        return;
      }

      try {
        const escapesRef = collection(db, "users", user.uid, "escapes");
        const snapshot = await getDocs(escapesRef);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEscapes(data);
      } catch (error) {
        console.error("Error fetching escapes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscapes();
  }, []);

  if (loading) {
    return <Layout><p >Loading your escapes...</p></Layout>;
  }

  if (!escapes.length) {
    return <Layout> <div className="no-escape">
      <p>You have no saved escapes yet.</p>
      <p>Login or signup to save destinations.</p>
      <div className="auth-links">
        <a href="/login">Login</a>
        <span> | </span>
        <a href="/signup">Signup</a>
      </div>  
    </div></Layout>;
  }

  return (
    <Layout>
     <div className="escape" style={{marginTop:'5rem'}}>
       <h1>🌏 My Escapes</h1>
      <div className="escapes-list">
        {escapes.map(escape => (
          <div 
            key={escape.id} 
            className="escape-card"
            onClick={() => navigate(`/escape/${escape.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={escape.imageUrl} alt={escape.location?.location} className="escape-thumb" />
            <div className="escape-info">
              <h2>{escape.location?.location}, {escape.location?.country}</h2>
              <p>{escape.mood} — “{escape.quote}”</p>
              <small>{new Date(escape.createdAt.toDate()).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
     </div>
    </Layout>
  );
};

export default MyEscapes;
