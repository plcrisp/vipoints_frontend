import Sidebar from '../../components/common/Sidebar/Sidebar';
import DashboardSummary from '../../features/dashboard/components/Dashboard/DashboardSummary';
import './DasboardPage.css';

function DashboardPage() {
  return (
    <div className="dashboard-page-container">
      <Sidebar />

      <div className="dashboard-summary">
        <DashboardSummary />
      </div>
      
    </div>
  );
}

export default DashboardPage;