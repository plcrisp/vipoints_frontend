import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <FontAwesomeIcon icon="triangle-exclamation" className="notfound-icon" />
        <h1>404</h1>
        <p>Página não encontrada</p>
        <button className="notfound-btn" onClick={() => navigate('/')}>
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}