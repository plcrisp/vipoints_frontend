import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddReward.css';

interface AddRewardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reward: { name: string; points: number; description: string; quantity: number }) => void;
}

function AddReward({ isOpen, onClose, onSubmit }: AddRewardProps) {
  if (!isOpen) return null;

interface RewardFormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    points: HTMLInputElement;
    description: HTMLInputElement;
    quantity: HTMLInputElement;
}

interface RewardForm extends HTMLFormElement {
    elements: RewardFormElements;
}

interface NewReward {
    name: string;
    points: number;
    description: string;
    quantity: number;
}

const handleSubmit = (e: React.FormEvent<RewardForm>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newReward: NewReward = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        points: parseInt((form.elements.namedItem('points') as HTMLInputElement).value),
        description: (form.elements.namedItem('description') as HTMLInputElement).value,
        quantity: parseInt((form.elements.namedItem('quantity') as HTMLInputElement).value),
    };
    onSubmit(newReward);
    onClose();
};

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <FontAwesomeIcon icon="gift" className="modal-icon" />
          <h2>Adicionar Recompensa</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="points">Pontos Necessários</label>
            <input id="points" name="points" type="number" min="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input id="description" name="description" required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Disponíveis</label>
            <input id="quantity" name="quantity" type="number" min="1" required />
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-confirm">Adicionar</button>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReward;