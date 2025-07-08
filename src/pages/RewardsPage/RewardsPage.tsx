import Sidebar from '../../components/common/Sidebar/Sidebar';
import RewardList from '../../features/rewards/components/RewardList/RewardList';
import './RewardsPage.css';

function RewardsPage() {
  return (
    <div className="rewards-page-container">
      <Sidebar />

      <div className="rewards-list">
        <RewardList />
      </div>
      
    </div>
  );
}

export default RewardsPage;