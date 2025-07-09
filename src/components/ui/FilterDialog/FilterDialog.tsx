import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./FilterDialog.css";
import type { Reward } from "../../../features/rewards/types/Reward";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (field: keyof Reward, direction: "asc" | "desc") => void;
  selectedField: keyof Reward;
  selectedDirection: "asc" | "desc";
}

const fields: { key: keyof Reward; label: string }[] = [
  { key: "name", label: "Nome" },
  { key: "requiredPoints", label: "Pontos" },
  { key: "description", label: "Descrição" },
  { key: "availableQuantity", label: "Disponíveis" },
];

export default function FilterDialog({
  isOpen,
  onClose,
  onApply,
  selectedField,
  selectedDirection,
}: FilterDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Ordenar recompensas</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="modal-body">
          <label className="modal-label">
            Campo
            <select
              value={String(selectedField)}
              onChange={(e) =>
                onApply(e.target.value as keyof Reward, selectedDirection)
              }
            >
              {fields.map((f) => (
                <option key={String(f.key)} value={String(f.key)}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-label">
            Direção
            <select
              value={selectedDirection}
              onChange={(e) =>
                onApply(selectedField, e.target.value as "asc" | "desc")
              }
            >
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </label>
        </div>

        <div className="modal-footer">
          <button className="modal-btn close" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="modal-btn confirm"
            onClick={() => onApply(selectedField, selectedDirection)}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}