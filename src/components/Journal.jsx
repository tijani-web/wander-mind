import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const Journal = () => {
  const { user, loading } = useAuth();

  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [error, setError] = useState("");
  const [loadingEntries, setLoadingEntries] = useState(false);

  useEffect(() => {
    if (!loading) {
      fetchEntries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  // Fetch entries from Firestore or localStorage
  const fetchEntries = async () => {
    setError("");
    setLoadingEntries(true);

    if (!user) {
      // Guest: load from localStorage
      try {
        const saved = localStorage.getItem("journal_entries");
        const parsed = saved ? JSON.parse(saved) : [];
        setEntries(parsed.slice().reverse()); // newest first
      } catch (err) {
        console.error("Error parsing journal entries:", err);
        setEntries([]);
      }
      setLoadingEntries(false);
      return;
    }

    // Logged in: fetch from Firestore
    try {
      const q = query(
        collection(db, "journal_entries"),
        where("uid", "==", user.uid),
        orderBy("date", "desc")
      );
      const snapshot = await getDocs(q);
      const loaded = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        let isoDate = "";
        if (data.date?.toDate) {
          isoDate = data.date.toDate().toISOString();
        } else if (typeof data.date === "string") {
          isoDate = data.date;
        } else {
          isoDate = new Date().toISOString();
        }
        return {
          id: docSnap.id,
          text: data.text,
          date: isoDate,
        };
      });
      setEntries(loaded);
    } catch (err) {
      console.error("Error loading from Firestore:", err);
      setError(
        "⚠ Unable to load from cloud. Check your Firestore security rules."
      );
    }
    setLoadingEntries(false);
  };

  // Handle save for new or edited entry
  const handleSave = async () => {
    if (!entryText.trim()) return;
    setError("");

    // If editing an existing entry
    if (editingEntryId) {
      if (!user) {
        // Guest: update localStorage
        try {
          const existingRaw = localStorage.getItem("journal_entries");
          let existing = existingRaw ? JSON.parse(existingRaw) : [];
          existing = existing.map((e) =>
            e.id === editingEntryId ? { ...e, text: entryText.trim() } : e
          );
          localStorage.setItem("journal_entries", JSON.stringify(existing));
          setEntries(existing.slice().reverse());
        } catch (err) {
          console.error("Failed to update localStorage:", err);
          setError("Failed to update entry locally.");
        }
        setEditingEntryId(null);
        setEntryText("");
        return;
      }

      // Logged in: update Firestore doc
      try {
        const entryRef = doc(db, "journal_entries", editingEntryId);
        await updateDoc(entryRef, { text: entryText.trim() });
        fetchEntries();
      } catch (err) {
        console.error("Error updating Firestore:", err);
        setError("⚠ Failed to update entry in cloud.");
      }
      setEditingEntryId(null);
      setEntryText("");
      return;
    }

    // Creating a new entry
    const newEntryLocal = {
      id: Date.now().toString(), // temporary id for UI
      text: entryText.trim(),
      date: new Date().toISOString(),
    };

    // Optimistic UI update
    setEntries((prev) => [newEntryLocal, ...prev]);

    if (user) {
      try {
        await addDoc(collection(db, "journal_entries"), {
          text: newEntryLocal.text,
          uid: user.uid,
          date: serverTimestamp(),
        });
        fetchEntries();
      } catch (err) {
        console.error("Error saving to Firestore:", err);
        setError("⚠ Failed to save to cloud. Check your Firestore rules.");
      }
    } else {
      // Guest mode: save to localStorage
      try {
        const existingRaw = localStorage.getItem("journal_entries");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [...existing, newEntryLocal];
        localStorage.setItem("journal_entries", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to write localStorage:", err);
        setError("Failed to save entry locally.");
      }
    }

    setEntryText("");
  };

  // Start editing an existing entry
  const handleEdit = (entry) => {
    setEditingEntryId(entry.id);
    setEntryText(entry.text);
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingEntryId(null);
    setEntryText("");
    setError("");
  };

  // Delete an entry
  const handleDelete = async (entry) => {
    setError("");

    if (!user) {
      // Guest: remove from localStorage
      try {
        const existingRaw = localStorage.getItem("journal_entries");
        let existing = existingRaw ? JSON.parse(existingRaw) : [];
        existing = existing.filter((e) => e.id !== entry.id);
        localStorage.setItem("journal_entries", JSON.stringify(existing));
        setEntries(existing.slice().reverse());
      } catch (err) {
        console.error("Failed to delete from localStorage:", err);
        setError("Failed to delete entry locally.");
      }
      return;
    }

    // Logged in: delete from Firestore
    try {
      const entryRef = doc(db, "journal_entries", entry.id);
      await deleteDoc(entryRef);
      fetchEntries();
    } catch (err) {
      console.error("Error deleting Firestore doc:", err);
      setError("⚠ Failed to delete entry in cloud.");
    }
  };

  return (
    <div className="journal-wrapper">
      <div className="journal-editor">
        <div className="editor-heading">
          <h1>
            🖊️{" "}
            {user
              ? `Hey ${user.displayName || "there"}, your space is ready`
              : "My Journal"}
          </h1>
          <p>A safe space to pour it all out.</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={6}
        />
        <div style={{ marginTop: "0.5rem" }}>
          {editingEntryId ? (
            <>
              <button onClick={handleSave}>Update Entry</button>{" "}
              <button onClick={handleCancelEdit} style={{ marginLeft: "1rem" }}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleSave}>Save Entry</button>
          )}
        </div>

        {!user ? (
          <p className="save-note" style={{ marginTop: "1rem" }}>
            Note: Your entries are saved in your browser. To save them
            permanently across devices,{" "}
            <strong>
              <NavLink to="/sign-up">create an account</NavLink>
            </strong>
            .
          </p>
        ) : (
          <p className="save-note" style={{ marginTop: "1rem" }}>
            You're signed in as{" "}
            <strong>{user.displayName || user.email}</strong>. Your journal is
            saved to the cloud.
          </p>
        )}
      </div>

      <div className="journal-sidebar">
        <h2>Your Entries</h2>
        {loadingEntries ? (
          <p>Loading entries...</p>
        ) : entries.length === 0 ? (
          <p className="no-entries">No entries yet</p>
        ) : (
          <ul className="entry-list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <strong>{new Date(entry.date).toLocaleString()}</strong>
                <p>{entry.text.slice(0, 100)}
                  {entry.text.length > 100 ? "..." : ""}
                </p>
                <div style={{ marginTop: "0.3rem" }}>
                  <button onClick={() => handleEdit(entry)}>Edit</button>{" "}
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this entry?"
                        )
                      ) {
                        handleDelete(entry);
                      }
                    }}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Journal;
