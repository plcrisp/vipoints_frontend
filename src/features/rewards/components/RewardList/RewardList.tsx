import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../../components/common/Header/Header";
import "./RewardList.css";
import { useEffect, useState } from "react";
import type { Reward } from "../../types/Reward";
import { getAllRewards } from "../../services/RewardService";

export default function RewardList() {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    async function fetchRewards() {
      const data = await getAllRewards();
      setRewards(data);
    }

    fetchRewards();
  }, []);

  return (
    <div className="reward-list-container">
      <Header
        title="Recompensas"
        subtitle="Adicione recompensas para nossos queridos clientes!"
      />

      <div className="reward-list-header">
        <div className="reward-actions">
          <button className="icon-button">
            <FontAwesomeIcon icon="sliders" />
          </button>

          <div className="search-container">
            <input type="text" placeholder="Buscar..." />
            <FontAwesomeIcon icon="search" className="search-icon" />
          </div>

          <button className="filter-button">
            <FontAwesomeIcon icon="filter" /> Filtro
          </button>
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
    </div>
  );
}