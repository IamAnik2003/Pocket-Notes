import React, { useState } from "react";

export default function DiolougeBox({ notes, setNotes }) {
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
  };

  return (
    <div
      style={{
        background: "white",
        position: "absolute",
        width: "33%",
        height: "32%",
        top: "35%",
        left: "28%",
        padding: "1.5%",
        borderRadius: "6px",
        zIndex: "1000",
      }}
    >
      <p style={{ fontWeight: "500", fontSize: "1.3rem" }}>Create New Group</p>
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
            style={{ fontWeight: "500", fontSize: "1.1rem" }}
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
            style={{ fontWeight: "500", fontSize: "1.1rem" }}
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
                width: "30px",
                height: "30px",
                borderRadius: "50px",
                border: selectedColor === color ? "2px solid black" : "none",
              }}
              onClick={() => setSelectedColor(color)} // Set selected color
            ></button>
          )
        )}
      </div>
      <button
        style={{
          fontWeight: "400",
          color: "white",
          textAlign: "center",
          background: "#001F8B",
          borderRadius: "11px",
          width: "20%",
          height: "15%",
          position: "absolute",
          top: "78%",
          left: "77.5%",
          fontSize: "1rem",
          letterSpacing: "0.1rem",
        }}
        onClick={handleCreate} // Handle button click
      >
        Create
      </button>
    </div>
  );
}
