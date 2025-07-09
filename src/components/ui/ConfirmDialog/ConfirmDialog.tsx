import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, text, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        <div className="modal-body">
          <p>{text}</p>
        </div>

        <div className="modal-footer">
          <button className="modal-btn close" onClick={onClose}>
            Fechar
          </button>

          {onConfirm && (
            <button className="modal-btn confirm" onClick={onConfirm}>
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;