import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Layout } from './Layout';

const EscapeDetails = () => {
  const { id } = useParams();
  const [escape, setEscape] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscape = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("No current user");
        setLoading(false);
        return;
      }

      try {
        const escapeRef = doc(db, "users", user.uid, "escapes", id);
        const docSnap = await getDoc(escapeRef);

        if (docSnap.exists()) {
          setEscape({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn("No such escape!");
        }
      } catch (error) {
        console.error("Error fetching escape:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscape();
  }, [id]);

  if (loading) {
    return <Layout><p>Loading escape...</p></Layout>;
  }

  if (!escape) {
    return <Layout><p>Escape not found.</p></Layout>;
  }

  return (
    <Layout>
      <div className="escape-details">
        <img src={escape.imageUrl} alt={escape.location?.location} className="escape-full-image" />
        <h1>{escape.location?.location}, {escape.location?.country}</h1>
        <p><strong>Mood:</strong> {escape.mood}</p>
        <p><strong>Vibe:</strong> {escape.location?.vibe}</p>
        <blockquote>“{escape.quote}”</blockquote>
        <small>Created at: {new Date(escape.createdAt.toDate()).toLocaleString()}</small>
      </div>
    </Layout>
  );
};

export default EscapeDetails;
