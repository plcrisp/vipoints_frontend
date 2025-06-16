import React from "react";
import "./AlertDialog.css";

type AlertType = "success" | "error" | "info";

interface AlertDialogProps {
  message: string;
  type: AlertType;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ message, type, onClose }) => {
  return (
    <div className={`alert-dialog ${type}`}>
      <div className="alert-content">
        <span>{message}</span>
        <button onClick={onClose} className="alert-close">×</button>
      </div>
    </div>
  );
};

export default AlertDialog;