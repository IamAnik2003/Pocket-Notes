import React, { useState, useEffect, useRef,useContext } from "react";
import Vector2 from "../images/Vector (4).png";
import Vector3 from "../images/Vector (5).png";
import Vector4 from "../images/Vector (6).png";
import "../components/NoteChats.css";
import { ThemeContext } from "../contexts/ThemeContext";

export default function NoteChats({
  notes,
  index,
  addChatToGroup,
  isMobile,
  setShowLeftChild,
  setShowChatSection,
}) {
  const [chatInput, setChatInput] = useState(""); // To handle textarea input
  const [isDisable, setIsDisable] = useState(true); // To handle button state
  const chatSectionRef = useRef(null); // Reference to the chat section container
  const {dark}=useContext(ThemeContext);

  const note = notes[index];

  const handleSend = () => {
    if (!isDisable) {
      addChatToGroup(chatInput);
      setChatInput(""); // Clear input after sending
      setIsDisable(true); // Disable the button after sending
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setChatInput(value);
    setIsDisable(value.trim().length === 0); // Enable/disable based on input
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isDisable) {
      e.preventDefault(); // Prevent the default newline behavior of textarea
      handleSend();
    }
  };

  // Auto-scroll to the latest chat
  useEffect(() => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
    }
  }, [note.chats]); // Runs whenever chats are updated

  return (
    <>
      {/* Header Section */}
      <div className={`${"chat-header-div"}`}>
        {isMobile && (
          <div>
            <button
              style={{ border: "none", background: "transparent", zIndex: "2000" }}
              onClick={() => {
                setShowLeftChild(true);
                setShowChatSection(false);
              }}
            >
              <img src={Vector4} alt="" />
            </button>
          </div>
        )}
        <div
          style={{
            background: note.color,
          }}
          className="profile-photo"
        >
          {note.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")}
        </div>
        <p className="grp-name">{note.name}</p>
      </div>

      {/* Chats Section */}
      <div ref={chatSectionRef} className="scrollable-div chat-section">
        {note.chats && note.chats.length > 0 ? (
          note.chats.map((chat, i) => (
            <div key={i} className={`${"chat-card"} ${dark?"darkChat":"lightChat"}`}>
              <div className="message-div">{chat.message}</div>
              <span className="time-stamp-span">{chat.timestamp}</span>
            </div>
          ))
        ) : (
          <p style={{ marginLeft: "3%", color: "gray" }}>No chats yet...</p>
        )}
      </div>

      {/* Input Section */}
      <div className="chat-input-div">
        <textarea
          value={chatInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter your text here..........."
          className="scrollable-div textarea-style"
        />
        <button
          onClick={handleSend}
          className="sent-btn"
          style={{
            cursor: isDisable ? "not-allowed" : "pointer",
          }}
          disabled={isDisable}
        >
          <img src={isDisable ? Vector3 : Vector2} alt="Send" />
        </button>
      </div>
    </>
  );
}
