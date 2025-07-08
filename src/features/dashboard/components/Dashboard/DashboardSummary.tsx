import Header from "../../../../components/common/Header/Header";
import { useAuth } from "../../../../contexts/AuthContext";

import "./DashboardSummary.css";

const DashboardSummary = () => {
  const { user } = useAuth();

  return (
    <div className="user-banner">
      <Header
        title="Central VIP"
        subtitle="Bem-vindo à melhor plataforma de benefícios do Brasil"
      />

      <div className="user-banner-body">
        <div className="welcome-message">
          <h2>Olá, {user?.name?.split(" ")[0] || "usuário"} Crisp</h2>
          <p>
            Você está no Top {user?.rank} do Ranking Mensal, além disso há uma promoção
            acontecendo. Acompanhe tudo navegando pelas sessões do VIPoints.
          </p>
        </div>
        <button className="rescue-button">+ Novo resgate</button>
      </div>
    </div>
  );
};

export default DashboardSummary;