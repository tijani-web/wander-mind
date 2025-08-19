import React, { useEffect, useRef, useState } from "react";
import { sendMessageToAI } from "../api/chatapi";
import { FaShareAlt, FaPen, FaArchive, FaTrashAlt } from "react-icons/fa";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { Layout } from "./Layout";
import './companion.css'

const Companion = () => {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const messagesEndRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const menuButtonStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  color: "inherit",
  textAlign: "left",
  padding: "10px 20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  fontWeight: "500",
  fontSize: "14px",
  transition: "background-color 0.15s ease",
};

 useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const toggleButton = document.querySelector('.sidebar-toggle');
      
      if (sidebar && toggleButton && 
          !sidebar.contains(event.target) && 
          !toggleButton.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Close menu on click outside
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      loadChats();
    }
  }, [user, loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loadingAI]);

  const generateTitle = (text) =>
    text ? (text.length > 25 ? text.slice(0, 25) + "..." : text) : "Chat";

  const saveMessage = async (msgObj, chatId) => {
    if (!chatId) return;
    if (user) {
      const chatRef = doc(db, "users", user.uid, "chats", chatId);
      const existing = await getDoc(chatRef);
      if (!existing.exists()) {
        await setDoc(chatRef, {
          title: generateTitle(msgObj.text),
          createdAt: serverTimestamp(),
        });
      }
      await addDoc(collection(db, "users", user.uid, "chats", chatId, "messages"), {
        ...msgObj,
        timestamp: serverTimestamp(),
      });
    } else {
      const raw = localStorage.getItem("guestChats") || "{}";
      let saved = {};
      try {
        saved = JSON.parse(raw);
      } catch {
        saved = {};
      }
      const chatArray = saved[chatId] || [];
      saved[chatId] = [...chatArray, { ...msgObj, timestamp: Date.now() }];
      localStorage.setItem("guestChats", JSON.stringify(saved));
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const chatId = activeChatId || `chat-${Date.now()}`;
    if (!activeChatId) setActiveChatId(chatId);

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoadingAI(true);
    saveMessage(userMsg, chatId).catch(console.error);

    try {
      const aiReplyText = await sendMessageToAI(input);
      const aiMsg = { sender: "ai", text: aiReplyText };
      setMessages((prev) => [...prev, aiMsg]);
      saveMessage(aiMsg, chatId).catch(console.error);
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  const loadChats = async () => {
    if (user) {
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "chats"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setChats(data);
      } catch (err) {
        console.error("Failed loading chats:", err);
        setChats([]);
      }
    } else {
      try {
        const raw = localStorage.getItem("guestChats") || "{}";
        const saved = JSON.parse(raw);
        const list = Object.entries(saved).map(([key, arr]) => ({
          id: key,
          title: generateTitle(arr?.[0]?.text || "Chat"),
        }));
        setChats(list);
      } catch {
        setChats([]);
      }
    }
  };

  const loadChatMessages = async (id) => {
    setActiveChatId(id);
    setMenuOpenId(null);
    if (user) {
      try {
        const msgsSnap = await getDocs(
          query(collection(db, "users", user.uid, "chats", id, "messages"), orderBy("timestamp", "asc"))
        );
        const msgs = msgsSnap.docs.map((d) => {
          const data = d.data();
          return {
            ...data,
            timestamp: data.timestamp?.toDate
              ? data.timestamp.toDate().toISOString()
              : data.timestamp || new Date().toISOString(),
          };
        });
        setMessages(msgs);
      } catch (err) {
        console.error("Failed to load messages:", err);
        setMessages([]);
      }
    } else {
      try {
        const raw = localStorage.getItem("guestChats") || "{}";
        const saved = JSON.parse(raw);
        setMessages(saved[id] || []);
      } catch {
        setMessages([]);
      }
    }
  };

  const startNewChat = async () => {
    setMessages([]);
    const newId = `chat-${Date.now()}`;
    setActiveChatId(newId);
    await loadChats();
  };

  // Rename chat handlers
  const startEditingTitle = (chat) => {
    setEditingTitleId(chat.id);
    setNewTitle(chat.title);
    setMenuOpenId(null);
  };

  const saveNewTitle = async (chatId) => {
    if (!newTitle.trim()) return;
    if (!user) {
      // Guest mode - no saved title, so just close editor and reload
      setEditingTitleId(null);
      await loadChats();
      return;
    }

    try {
      const chatRef = doc(db, "users", user.uid, "chats", chatId);
      await updateDoc(chatRef, { title: newTitle.trim() });
      setEditingTitleId(null);
      await loadChats();
    } catch (err) {
      console.error("Failed to rename chat:", err);
      setEditingTitleId(null);
    }
  };

  // Delete chat
  const deleteChat = async (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;

    if (!user) {
      try {
        const raw = localStorage.getItem("guestChats") || "{}";
        const saved = JSON.parse(raw);
        delete saved[chatId];
        localStorage.setItem("guestChats", JSON.stringify(saved));
        if (activeChatId === chatId) {
          setActiveChatId(null);
          setMessages([]);
        }
        await loadChats();
      } catch (err) {
        console.error("Failed to delete guest chat:", err);
      }
      return;
    }

    try {
      const chatRef = doc(db, "users", user.uid, "chats", chatId);
      const messagesCol = collection(db, "users", user.uid, "chats", chatId, "messages");
      const msgsSnap = await getDocs(messagesCol);

      const batch = writeBatch(db);
      msgsSnap.forEach((docSnap) => {
        batch.delete(doc(db, "users", user.uid, "chats", chatId, "messages", docSnap.id));
      });
      batch.delete(chatRef);

      await batch.commit();

      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([]);
      }
      await loadChats();
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };
  

  return (
    <Layout>
<div className="companion-wrapper">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
        <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
             onClick={() => setSidebarOpen(false)} />
        <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
          <button className="new-chat-btn" onClick={startNewChat}>➕ New Chat</button>
          <div className="chat-history" ref={menuRef}>
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className={`chat-title ${chat.id === activeChatId ? "active" : ""}`}
              >
                {editingTitleId === chat.id ? (
                  <div className="edit-title-container">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveNewTitle(chat.id);
                        if (e.key === "Escape") setEditingTitleId(null);
                      }}
                      autoFocus
                    />
                    <div className="edit-title-buttons">
                      <button onClick={() => saveNewTitle(chat.id)}>Save</button>
                      <button onClick={() => setEditingTitleId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      className="chat-title-content"
                      onClick={() => loadChatMessages(chat.id)}
                    >
                      {chat.title}
                    </span>

                    <div className={`chat-menu-container ${menuOpenId === chat.id ? 'active' : ''}`}>
                      <button
                        className="chat-menu-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
                        }}
                      >
                        ⋮
                      </button>

                      <div className="chat-menu-dropdown">
                        <button
                          onClick={() => {
                            startEditingTitle(chat);
                            setMenuOpenId(null);
                          }}
                          className="chat-menu-item"
                        >
                          <FaPen className="menu-icon" />
                          Rename
                        </button>
                        <button
                          onClick={() => {
                            setMenuOpenId(null);
                            deleteChat(chat.id);
                          }}
                          className="chat-menu-item delete"
                        >
                          <FaTrashAlt className="menu-icon" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </aside>

  <main className="chat-container">
    <header className="chat-header">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
        alt="avatar"
        className="avatar"
      />
      <div>
        <h2>Menta</h2>
        <p>Your emotional wellness buddy</p>
        {!user && (
          <small style={{ color: '#6b7280', fontWeight: 'bold' }}>* Your chats are saved in this browser. Log in to save your history.</small>
        )}
      </div>
    </header>

    <div className="chat-box">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat-bubble ${
            msg.sender === "user" ? "user-bubble" : "ai-bubble"
          }`}
        >
          {msg.text}
        </div>
      ))}
      {loadingAI && (
        <div className="typing" style={{ color: '#6b7280', fontWeight: 'bold' }}>
          Menta is typing
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      )}
      <div style={{fontFamily: 'Manrope, sans-serif'}} ref={messagesEndRef} />
    </div>

    <div className="chat-input">
      <input
        value={input}
        placeholder="Type here..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>↑</button>
    </div>
  </main>
</div>
    </Layout>
  );
};

export default Companion;
