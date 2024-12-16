import React, { useState, useEffect } from "react";
import "./Home.css";

import BtnImage from "../images/Group 24.png";
import DiolougeBox from "../components/DiolougeBox";
import RightLogo from "../components/RightLogo";
import NoteChats from "../components/NoteChats";
import useIsMobile from "../components/useIsMobile";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false); 
  const [showRightLogo, setRightShowLogo] = useState(true); 
  const [showChatSection, setShowChatSection] = useState(false); 
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []); 
  const [selectedIndex, setSelectedIndex] = useState(undefined); 
  const isMobile = useIsMobile(455); 
  const [showLeftChild,setShowLeftChild]= useState(true); 
  

  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addGroup = () => {
    setShowDialog(true); 
  };

  const handleGroupClick = (index) => {
    setRightShowLogo(false);
    setShowChatSection(true);
    setSelectedIndex(index); 
    setShowLeftChild(false);
  };

  const addChatToGroup = (message) => {
    if (selectedIndex !== undefined && message.trim() !== "") {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('en-US', { month: 'short' }); 
      const year = now.getFullYear();
      const formattedDate = `${day} ${month} ${year}`; 
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }); 
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

      {showDialog && <DiolougeBox notes={notes} setNotes={setNotes} setShowDialog={setShowDialog} />}
    </>
  );
}
