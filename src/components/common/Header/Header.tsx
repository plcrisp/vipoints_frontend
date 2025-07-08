import "./Header.css";
import { useAuth } from "../../../contexts/AuthContext";

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header = ({ title, subtitle }: HeaderProps) => {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  let tipo = "Usuário";
  switch (user?.user_type) {
    case "ADMIN":
      tipo = "Administrador";
      break;
    case "CLIENT":
      tipo = "Cliente";
      break;
    case "SELLER":
      tipo = "Vendedor";
      break;
  }

  return (
    <div className="header-container">
      <div className="header-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-profile">
        <div className="avatar-circle">{initials}</div>
        <div className="user-info">
          <p className="user-name">{user?.name || "Usuário"}</p>
          <p className="user-role">{tipo} VIP</p>
        </div>
      </div>
    </div>
  );
};

export default Header;