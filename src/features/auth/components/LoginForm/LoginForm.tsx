import { useState } from "react";
import type { FormEvent } from "react";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertDialog from "../../../../components/ui/AlertDialog/AlertDialog";
import { useAuth } from "../../../../contexts/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | null>(null);

  const showAlert = (message: string, type: "success" | "error" | "info") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType(null);
    }, 4000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      showAlert("Login realizado com sucesso!", "success");
    } catch (err: any) {
      if (err.response?.status === 401) {
        showAlert("Credenciais inválidas.", "error");
      } else {
        console.log(err)
        showAlert("Erro ao fazer login. Tente novamente.", "error");
      }
    }
  };

  return (
    <>
      {alertMessage && alertType && (
        <AlertDialog
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertMessage("");
            setAlertType(null);
          }}
        />
      )}

      <div className="login-container">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="icon">
              <FontAwesomeIcon icon="user" />
            </span>
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="icon">
              <FontAwesomeIcon icon="lock" />
            </span>
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Entrar
          </button>

          <p className="register-text">
            Ainda não possui uma conta?{" "}
            <a href="#" className="link">Cadastre-se</a>
          </p>

          <div className="separator">- OU -</div>

          <button type="button" className="btn-google">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="google-icon"
            />
            Entrar com Google
          </button>
        </form>
      </div>
    </>
  );
}