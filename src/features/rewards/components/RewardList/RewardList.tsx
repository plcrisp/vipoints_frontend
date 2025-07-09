import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../../components/common/Header/Header";
import "./RewardList.css";
import { useEffect, useMemo, useState } from "react";
import type { Reward } from "../../types/Reward";
import { createReward, getAllRewards, deleteReward, filterRewards, sortRewards } from "../../services/RewardService";
import AddReward from "../AddReward/AddReward";
import ConfirmDialog from "../../../../components/ui/ConfirmDialog/ConfirmDialog";
import AlertDialog from "../../../../components/ui/AlertDialog/AlertDialog";
import FilterDialog from "../../../../components/ui/FilterDialog/FilterDialog";

export default function RewardList() {
  const [rewards, setRewards] = useState<Reward[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortField, setSortField] = useState<keyof Reward>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("success");

  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);

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
      setAlertMessage("Recompensa adicionada!");
      setAlertType("success");
      setShowAlert(true);
    } else {
      setAlertMessage("Erro ao adicionar recompensa.");
      setAlertType("error");
      setShowAlert(true);
    }

    // Fechar o alerta automaticamente após 3 segundos
    setTimeout(() => setShowAlert(false), 3000);
  };

  const openConfirmDialog = (id: string) => {
    setSelectedRewardId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRewardId) return;

    const success = await deleteReward(selectedRewardId);
    if (success) {
      setRewards((prev) => prev.filter(r => r.id !== selectedRewardId));
      setAlertMessage("Recompensa removida!");
      setAlertType("success");
      setShowAlert(true);
    } else {
      setAlertMessage("Erro ao deletar recompensa.");
      setAlertType("error");
      setShowAlert(true);
    }

    setConfirmDialogOpen(false);
    setSelectedRewardId(null);

    // Fechar o alerta automaticamente após 3 segundos
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleUpdateReward = (updated: {
    id: string;
    name: string;
    points: number;
    description: string;
    quantity: number;
  }) => {
    setRewards((prev) =>
      prev.map((r) =>
        r.id === updated.id
          ? {
              ...r,
              name: updated.name,
              requiredPoints: updated.points,
              description: updated.description,
              availableQuantity: updated.quantity,
            }
          : r
      )
    );

    setAlertMessage("Recompensa atualizada!");
    setAlertType("success");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const visibleRewards = useMemo(() => {
    let result = filterRewards(rewards, searchTerm);
    result = sortRewards(result, sortField, sortDirection);
    return result;
  }, [rewards, searchTerm, sortField, sortDirection]);

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
              <input
                type="text"
                placeholder="Buscar…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon icon="search" className="search-icon" />
            </div>

            <button
              className="filter-button"
              onClick={() => setIsFilterOpen(true)}
            >
              <FontAwesomeIcon icon="filter" /> Filtro
            </button>
          </div>

          <div className="right-actions">
            <button className="add-reward-button" onClick={() => setisAddModalOpen(true)}>
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

        {visibleRewards.map((reward) => (
          <div key={reward.id} className="reward-row">
           <div className="reward-name">
            <FontAwesomeIcon icon="gift" className="reward-icon" />
            <span>{reward.name}</span>
           </div>
           <span>{reward.requiredPoints}</span>
           <span>{reward.description}</span>
           <span>{reward.availableQuantity}</span>
           <div className="reward-actions-row">
            <button
              className="edit-btn"
              aria-label="Editar"
              onClick={() => setEditingRewardId(reward.id)}
            >
              <FontAwesomeIcon icon="pen" />
            </button>
           	<button
              className="remove-btn"
              aria-label="Remover"
              onClick={() => openConfirmDialog(reward.id)}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
           </div>
          </div>
    ))}
      </div>

      <AddReward
        isOpen={isAddModalOpen || editingRewardId !== null}
        onClose={() => {
          setisAddModalOpen(false);
          setEditingRewardId(null);
        }}
        onSubmit={handleAddReward}
        rewardId={editingRewardId ?? undefined}
        onUpdate={handleUpdateReward}
      />

      <ConfirmDialog
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title="Confirmar exclusão"
        text="Tem certeza que deseja excluir esta recompensa?"
        onConfirm={handleConfirmDelete}
      />

      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedField={sortField}
        selectedDirection={sortDirection}
        onApply={(field, direction) => {
          setSortField(field);
          setSortDirection(direction);
          setIsFilterOpen(false);
        }}
      />

      {showAlert && (
        <AlertDialog
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}