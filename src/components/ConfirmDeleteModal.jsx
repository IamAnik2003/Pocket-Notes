// components/ConfirmDeleteModal.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDeleteModal({ open, onClose, onConfirm, groupName }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <AlertTriangle color="red" size={22} style={{ marginRight: "8px" }} />
          <h2 style={styles.title}>Delete Group</h2>
        </div>

        <p style={styles.text}>
          Are you sure you want to delete <b>{groupName}</b>?
        </p>

        <div style={styles.actions}>
          <button style={{ ...styles.button, ...styles.cancelBtn }} onClick={onClose}>
            Cancel
          </button>
          <button style={{ ...styles.button, ...styles.deleteBtn }} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    width: "320px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.2s ease-in-out",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  text: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  button: {
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  cancelBtn: {
    background: "#f1f1f1",
    color: "#333",
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "#fff",
  },
};
