import React, { useState } from "react";
import "../components/DiolougeBox.css";
export default function DiolougeBox({ notes, setNotes,setShowDialog }) {
  const [groupName, setGroupName] = useState(""); // State to track the group name
  const [selectedColor, setSelectedColor] = useState(""); // State to track the selected color

  // Handler for the "Create" button
  const handleCreate = () => {

    if (!groupName.trim() || !selectedColor) {
      alert("Please enter a group name and select a color.");
      return;
    }

    // Create a new group object
    const newGroup = {
      name: groupName,
      color: selectedColor,
    };

    // Update the notes array with the new group
    setNotes([...notes, newGroup]);

    // Reset the fields
    setGroupName("");
    setSelectedColor("");
    setShowDialog(false); // Close the dialog box
  };

  return (
    <div
      className="diolougebox-div"
    >
      <p className="create-new-group">Create New Group</p>
      <div
        style={{
          display: "flex",
          gap: "5%",
          marginTop: "2%",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            className="grp-name-label"
            htmlFor="Grp-input"
          >
            Group Name
          </label>
        </div>
        <div style={{ width: "60%", height: "31px" }}>
          <input
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              border: "2px solid #CCCCCC",
              paddingLeft: "10px",
              fontSize: "0.9rem",
              fontWeight: "400",
              cursor:"auto",
            }}
            placeholder="Enter group name"
            id="Grp-input"
            type="text"
            value={groupName} // Bind to state
            onChange={(e) => setGroupName(e.target.value)} // Update state on change
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "3.5%", marginTop: "5%" }}>
        <div>
          <label
           className="color-label"
            htmlFor=""
          >
            Choose Colour
          </label>
        </div>
        {/* Color buttons */}
        {["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"].map(
          (color) => (
            <button
              key={color}
              style={{
                background: color,
                border: selectedColor === color ? "2px solid black" : "none",
              }}
              className="color-btn"
              onClick={() => setSelectedColor(color)} // Set selected color
            ></button>
          )
        )}
      </div>
      <button
       className="create-btn"
        onClick={handleCreate} // Handle button click
      >
        Create
      </button>
    </div>
  );
}
