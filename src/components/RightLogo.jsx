import React from "react";
import NoteBack from "../images/image-removebg-preview 1.png"; // Update the path as per your project structure
import Vector from "../images/Vector (3).png"; // Update the path as per your project structure

export default function RightLogo() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "10%",
        }}
      >
        {/* Image Section */}
        <div style={{ width: "55%", height: "auto" }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={NoteBack}
            alt="Pocket Notes Background"
          />
        </div>

        {/* Title Section */}
        <div style={{ width: "55%", height: "auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: "600",
              lineHeight: "2rem",
              fontSize: "2rem",
              letterSpacing: "2%",
            }}
          >
            Pocket Notes
          </h2>
        </div>

        {/* Description Section */}
        <div style={{ width: "55%", height: "auto" }}>
          <p
            style={{
              textAlign: "justify",
              fontSize: "1.2rem",
              color: "#292929",
              fontWeight: "500",
              textUnderlinePosition: "from-font",
              letterSpacing: "2%",
            }}
          >
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "auto",
          marginTop: "10%",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        <img src={Vector} alt="Encryption Icon" />
        <p
          style={{
            color: "#292929",
            fontWeight: "400",
            letterSpacing: "2%",
            fontSize: "1.2rem",
          }}
        >
          end-to-end encrypted
        </p>
      </div>
    </>
  );
}
