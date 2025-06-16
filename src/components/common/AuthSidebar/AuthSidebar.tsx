import './AuthSidebar.css';

function AuthSidebar() {
  return (
    <div className="auth-sidebar">

      <div className="logo-section">
        <img src="src\assets\images\logos\logo_dark.png" alt="VIPoints" />
      </div>

      <div className="content-section">
        <h2 className="subtitle">
          Ganhe <span className="highlight">PONTOS</span>
        </h2>
        <p className="subtitle">
          Troque por vantagens
        </p>
        <p className="subtitle">
          <span className="highlight">VIVA</span> a recompensa
        </p>
      </div>

      <div className="slogan-section">
        <p>VIPoints: sua jornada vale mais do que você imagina.</p>
      </div>
    </div>
  );
}

export default AuthSidebar;