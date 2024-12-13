import React, { useState } from "react";
import Vector2 from "../images/Vector (4).png";
import Vector3 from "../images/Vector (5).png";

export default function NoteChats({ notes, index, addChatToGroup }) {
  const [chatInput, setChatInput] = useState(""); // To handle textarea input
  const [isDisable, setIsDisable] = useState(true); // To handle button state

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

  return (
    <>
      {/* Header Section */}
      <div
        style={{
          background: "#001F8B",
          width: "100%",
          height: "13%",
          display: "flex",
          gap: "3%",
          alignItems: "center",
          paddingLeft: "3%",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            color: "white",
            background: note.color,
            fontWeight: "500",
            fontSize: "1.1rem",
            letterSpacing: "3px",
          }}
        >
          {note.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")}
        </div>
        <p style={{ fontWeight: "500", fontSize: "1.4rem", color: "white" }}>
          {note.name}
        </p>
      </div>

      {/* Chats Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          overflowY: "scroll",
          maxHeight: "calc(100vh - 300px)",
        }}
      >
        {note.chats && note.chats.length > 0 ? (
          note.chats.map((chat, i) => (
            <div
              key={i}
              style={{
                background: "white",
                width: "94.2%",
                padding: "3%",
                marginLeft: "3%",
                marginRight: "3%",
                marginTop: "3%",
                fontWeight: "400",
                fontSize: "1.1rem",
                letterSpacing: "1.5px",
                borderRadius: "5px",
                lineHeight: "1.8rem",
                position: "relative",
              }}
            >
              {chat.message}
              <span
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "10px",
                  fontSize: "0.8rem",
                  color: "gray",
                }}
              >
                {chat.timestamp}
              </span>
            </div>
          ))
        ) : (
          <p style={{ marginLeft: "3%", color: "gray" }}>No chats yet...</p>
        )}
      </div>

      {/* Input Section */}
      <div
        style={{
          width: "68.1%",
          height: "26%",
          background: "#001F8B",
          padding: "23px",
          boxSizing: "border-box",
          position: "absolute",
          top: "73%",
        }}
      >
        <textarea
          value={chatInput}
          onChange={handleInputChange}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "9px",
            border: "none",
            padding: "2%",
            fontSize: "1.6rem",
            fontWeight: "400",
            boxSizing: "border-box",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          placeholder="Enter your text here..........."
        />
        <button
          onClick={handleSend}
          style={{
            position: "absolute",
            left: "93%",
            top: "65%",
            border: "none",
            background: "white",
            zIndex: 1000,
            cursor: "auto"
          }}
          disabled={isDisable}
        >
          <img src={isDisable ? Vector3 : Vector2} alt="Send" />
        </button>
      </div>
    </>
  );
}
