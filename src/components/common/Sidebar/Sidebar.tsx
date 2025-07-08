import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidebar.css';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isForcedCollapsed, setIsForcedCollapsed] = useState(false);

  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) {
        setIsCollapsed(true);
        setIsForcedCollapsed(true);
      } else {
        setIsCollapsed(false);
        setIsForcedCollapsed(false);
      }
    };

    handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
    try {
      logout();
    } catch (err: any) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="header-section">
        {!isCollapsed && (
          <img src="src/assets/images/logos/logo_dark.png" alt="VIPoints" />
        )}
        <span className={`icon ${isForcedCollapsed ? "disabled" : ""}`} onClick={() => {
          if (!isForcedCollapsed) toggleSidebar();
        }}>
          <FontAwesomeIcon icon={isCollapsed ? 'chevron-right' : 'chevron-left'} />
        </span>
      </div>

      <nav className="sidebar-nav">
        <SidebarSection label="PRINCIPAL" isCollapsed={isCollapsed}>
          <SidebarItem icon="chart-bar" label="Central VIP" path="/dashboard" isCollapsed={isCollapsed} />
        </SidebarSection>

        <SidebarSection label="MINHAS ATIVIDADES" isCollapsed={isCollapsed}>
          <SidebarItem icon="shopping-cart" label="Compras" path="/compras" isCollapsed={isCollapsed} />
          <SidebarItem icon="gift" label="Recompensas" path="/recompensas" isCollapsed={isCollapsed} />
          <SidebarItem icon="ticket-alt" label="Cupons" path="/cupons" isCollapsed={isCollapsed} />
          <SidebarItem icon="bullhorn" label="Promoções" path="/promocoes" badge isCollapsed={isCollapsed} />
        </SidebarSection>

        <SidebarSection label="INDICAÇÕES" isCollapsed={isCollapsed}>
          <SidebarItem icon="user-plus" label="Convidar Amigos" path="/convidar" isCollapsed={isCollapsed} />
          <SidebarItem icon="users" label="Minhas Indicações" path="/indicacoes" isCollapsed={isCollapsed} />
        </SidebarSection>

        <SidebarSection label="DESEMPENHO" isCollapsed={isCollapsed}>
          <SidebarItem icon="trophy" label="Ranking" path="/ranking" isCollapsed={isCollapsed} />
          <SidebarItem icon="history" label="Histórico" path="/historico" isCollapsed={isCollapsed} />
        </SidebarSection>

        <SidebarSection label="CONFIGURAÇÕES" isCollapsed={isCollapsed}>
          <SidebarItem icon="user" label="Meu Perfil" path="/perfil" isCollapsed={isCollapsed} />
          <SidebarItem icon="sign-out-alt" label="Sair" onClick={handleLogout} isCollapsed={isCollapsed} />
        </SidebarSection>
      </nav>
    </aside>
  );
}

function SidebarSection({ label, children, isCollapsed }: any) {
  return (
    <div className="sidebar-section">
      {!isCollapsed && <p className="sidebar-label">{label}</p>}
      {children}
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  badge = false,
  isCollapsed = false,
  path = "/",
  onClick,
}: {
  icon: any;
  label: string;
  badge?: boolean;
  isCollapsed?: boolean;
  path?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname === path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`sidebar-item ${active ? 'active' : ''}`} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} className="sidebar-icon" />
      {!isCollapsed && <span>{label}</span>}
      {!isCollapsed && badge && <span className="badge">1</span>}
    </div>
  );
}

export default Sidebar;