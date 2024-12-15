import React, { useState, useEffect } from "react";
import "./Home.css";

import BtnImage from "../images/Group 24.png";
import DiolougeBox from "../components/DiolougeBox";
import RightLogo from "../components/RightLogo";
import NoteChats from "../components/NoteChats";
import useIsMobile from "../components/useIsMobile";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false); // State to control the dialog box visibility
  const [showRightLogo, setRightShowLogo] = useState(true); // State to control the logo visibility
  const [showChatSection, setShowChatSection] = useState(false); // State to control the chat section visibility
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []); // State to store notes
  const [selectedIndex, setSelectedIndex] = useState(undefined); // State to store selected index
  const isMobile = useIsMobile(455); // Hook to detect mobile device
  const [showLeftChild,setShowLeftChild]= useState(true); 
  

  // Sync notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addGroup = () => {
    setShowDialog(true); // Show the dialog box
  };

  const handleGroupClick = (index) => {
    setRightShowLogo(false);
    setShowChatSection(true);
    setSelectedIndex(index); // Update the selected index
    setShowLeftChild(false);
  };

  const addChatToGroup = (message) => {
    if (selectedIndex !== undefined && message.trim() !== "") {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('en-US', { month: 'short' }); // Short month name
      const year = now.getFullYear();
      const formattedDate = `${day} ${month} ${year}`; // Concatenates without a comma
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }); // Includes time in 12-hour format
      const formattedTimestamp = `${formattedDate} · ${formattedTime}`;
  
      const updatedNotes = [...notes];
      const selectedGroup = updatedNotes[selectedIndex];
  
      selectedGroup.chats = selectedGroup.chats || []; // Initialize chats array if undefined
      selectedGroup.chats.push({ message, timestamp: formattedTimestamp });
  
      setNotes(updatedNotes);
    }
  };
  

  return (
    <>
     <div
  className={`${!isMobile ? "home-container" : "home-container-mobile"} ${!isMobile&&showDialog ? "op" : undefined} ${isMobile&&showDialog ? "op-for-mobile" : undefined}`}
  onClick={showDialog ? () => setShowDialog(false) : undefined}
  style={{
    ...(showLeftChild && isMobile? { paddingLeft: "6%", paddingTop: "6%" } : {}),
    background: isMobile &&!showLeftChild ? "#DAE5F5" : "white",
  }}
>

        {/* Left Child Section */}
        {isMobile&&<div>
          {showChatSection && selectedIndex !== undefined && (
            <NoteChats
              notes={notes}
              index={selectedIndex}
              addChatToGroup={addChatToGroup}
              isMobile={isMobile}
              setShowChatSection={setShowChatSection}
              setShowLeftChild={setShowLeftChild}
            />
          )}
          {!isMobile && showRightLogo && <RightLogo />}
        </div>}
        
        <div className={!isMobile?"left-child":undefined} style={isMobile&&!showLeftChild ? { display: "none" } : undefined}>

          <h3 className="pocket-notes">Pocket Notes</h3>
          <div
            className="scrollable-div group-parent-div"
          >
            {notes.map((note, index) => (
              <div
                key={index}
                className="Note-List grp-card"
                style={isMobile ? undefined : { background: selectedIndex === index ? "#2F2F2F2B" : "transparent" }}

                onClick={() => handleGroupClick(index)} // Handle click event
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
                <p style={{ fontWeight: "500", fontSize: "1.4rem" }}>{note.name}</p>
              </div>
            ))}

          </div>
          <div className="btn-div">
            <button 
              onClick={addGroup}
              style={{ borderRadius: "50px",border:"none"}}
              className="grp-add-btn"
            >
              <img style={{}} src={BtnImage} alt="" />
            </button>
          </div>
        </div>

        {/* Right Child Section */}
        {!isMobile&&<div className="right-child">
          {showChatSection && selectedIndex !== undefined && (
            <NoteChats
              notes={notes}
              index={selectedIndex}
              addChatToGroup={addChatToGroup}
              isMobile={isMobile}
              setShowLeftChild={setShowLeftChild}
              setShowChatSection={setShowChatSection}
            />
          )}
          {!isMobile && showRightLogo && <RightLogo />}
        </div>}
      </div>

      {/* Conditionally Render the Dialog Box */}
      {showDialog && <DiolougeBox notes={notes} setNotes={setNotes} setShowDialog={setShowDialog} />}
    </>
  );
}
