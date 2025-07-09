import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddReward.css';
import { getRewardById, updateReward } from '../../services/RewardService';

interface AddRewardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reward: {
    name: string;
    points: number;
    description: string;
    quantity: number;
  }) => void;
  rewardId?: string;
  onUpdate?: (reward: {
    id: string;
    name: string;
    points: number;
    description: string;
    quantity: number;
  }) => void;
}

function AddReward({ isOpen, onClose, onSubmit, rewardId, onUpdate }: AddRewardProps) {
  const [formData, setFormData] = useState({
    name: '',
    points: 1,
    description: '',
    quantity: 1,
  });

  useEffect(() => {
    if (rewardId) {
      (async () => {
        const existing = await getRewardById(rewardId);
        if (existing) {
          setFormData({
            name: existing.name,
            points: existing.requiredPoints,
            description: existing.description,
            quantity: existing.availableQuantity,
          });
        }
      })();
    } else {
      // Reset ao abrir para criação
      setFormData({
        name: '',
        points: 0,
        description: '',
        quantity: 0,
      });
    }
  }, [rewardId, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'points' || name === 'quantity' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rewardId && onUpdate) {
      const updated = await updateReward(rewardId, {
        name: formData.name,
        requiredPoints: formData.points,
        description: formData.description,
        availableQuantity: formData.quantity,
      });

      if (updated) {
        onUpdate({
          id: rewardId,
          name: updated.name,
          points: updated.requiredPoints,
          description: updated.description,
          quantity: updated.availableQuantity,
        });
        onClose();
      }
    } else {
      onSubmit({
        name: formData.name,
        points: formData.points,
        description: formData.description,
        quantity: formData.quantity,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <FontAwesomeIcon icon="gift" className="modal-icon" />
          <h2>{rewardId ? 'Editar Recompensa' : 'Adicionar Recompensa'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="points">Pontos Necessários</label>
            <input
              id="points"
              name="points"
              type="number"
              min="1"
              required
              value={formData.points}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Disponíveis</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-confirm">
              {rewardId ? 'Salvar Alterações' : 'Adicionar'}
            </button>
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