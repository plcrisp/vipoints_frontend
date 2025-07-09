import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../../components/common/Header/Header";
import "./RewardList.css";
import { useEffect, useState } from "react";
import type { Reward } from "../../types/Reward";
import { createReward, getAllRewards } from "../../services/RewardService";
import AddReward from "../AddReward/AddReward";

export default function RewardList() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRewards() {
      const data = await getAllRewards();
      setRewards(data);
    }

    fetchRewards();
  }, []);

  const handleAddReward = async (reward: {
    name: string;
    points: number;
    description: string;
    quantity: number;
  }) => {
    const newReward = await createReward({
      name: reward.name,
      requiredPoints: reward.points,
      description: reward.description,
      availableQuantity: reward.quantity,
    });

    if (newReward) {
      setRewards((prev) => [...prev, newReward]);
    } else {
      console.error('Erro ao adicionar recompensa');
    }
  };

  return (
    <div className="reward-list-container">
      <Header
        title="Recompensas"
        subtitle="Adicione recompensas para nossos queridos clientes!"
      />

      <div className="reward-list-header">
        <div className="reward-actions">
          <div className="left-actions">
            <div className="search-container">
              <input type="text" placeholder="Buscar..." />
              <FontAwesomeIcon icon="search" className="search-icon" />
            </div>

            <button className="filter-button">
              <FontAwesomeIcon icon="filter" /> Filtro
            </button>
          </div>

          <div className="right-actions">
            <button className="add-reward-button" onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon="plus" /> Adicionar Recompensa
            </button>
          </div>
        </div>
      </div>

      <div className="reward-table">
        <div className="reward-table-header">
          <div className="reward-name">Recompensa</div>
          <div>Pontos</div>
          <div>Descrição</div>
          <div className="available">Disponíveis</div>
          <div className="reward-actions-row"></div>
        </div>

        {rewards.map((reward) => (
          <div key={reward.id} className="reward-row">
            <div className="reward-name">
              <FontAwesomeIcon icon="gift" className="reward-icon" />
              <span>{reward.name}</span>
            </div>
            <span>{reward.requiredPoints}</span>
            <span>{reward.description}</span>
            <span>{reward.availableQuantity}</span>
            <div className="reward-actions-row">
              <button className="edit-btn">Editar</button>
              <button className="remove-btn">Remover</button>
            </div>
          </div>
        ))}
      </div>

      <AddReward
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReward}
      />
    </div>
  );
}