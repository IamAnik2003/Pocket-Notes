import React, { useState, useContext } from "react";
import "../components/DiolougeBox.css";
import { ThemeContext } from "../contexts/ThemeContext";
import { use } from "react";

export default function DiolougeBox({ notes, setNotes, setShowDialog }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { dark } = useContext(ThemeContext);

  const handleCreate = () => {
    if (!groupName.trim() || !selectedColor) {
      alert("Please enter a group name and select a color.");
      return;
    }

    const isDuplicate = notes.some(
      (group) => group.name.toLowerCase() === groupName.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert(
        "A group with this name already exists. Please choose a different name."
      );
      return;
    }

    const newGroup = {
      name: groupName,
      color: selectedColor,
    };

    setNotes([...notes, newGroup]);

    setGroupName("");
    setSelectedColor("");
    setShowDialog(false);
  };

  return (
    <div
      className={`${"diolougebox-div"} ${
        dark ? "darkDiolouge" : "lightDiolouge"
      }`}
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
          <label className="grp-name-label" htmlFor="Grp-input">
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
              fontSize: "0.8rem",
              fontWeight: "400",
              cursor: "auto",
            }}
            placeholder="Enter group name"
            id="Grp-input"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "3.5%", marginTop: "5%" }}>
        <div>
          <label className="color-label" htmlFor="">
            Choose Colour
          </label>
        </div>

        {["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"].map(
          (color) => (
            <button
              key={color}
              style={{
                background: color,
                border:
                  selectedColor === color
                    ? dark
                      ? "2px solid white"
                      : "2px solid black"
                    : "none",
              }}
              className="color-btn"
              onClick={() => setSelectedColor(color)}
            ></button>
          )
        )}
      </div>
      <button className="create-btn" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}
