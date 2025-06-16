import AuthSidebar from '../../components/common/AuthSidebar/AuthSidebar';
import LoginForm from '../../features/auth/components/LoginForm/LoginForm';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page-container">
      <AuthSidebar />

      <LoginForm />
    </div>
  );
}

export default LoginPage;