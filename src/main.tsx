import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, 
  faLock, 
  faChevronLeft,
  faChevronRight, 
  faChartBar, 
  faShoppingCart, 
  faGift, faTicketAlt, 
  faBullhorn, faUserPlus, 
  faUsers, 
  faTrophy, 
  faHistory,
  faSliders,
  faSearch,
  faFilter,
  faSignOutAlt,
  faPlus,
  faPen,
  faTrash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faTimes, faPen, faTrash, faPlus, faLock, faChevronLeft, faChevronRight, faChartBar, faShoppingCart, faSignOutAlt, faGift, faTicketAlt, faBullhorn, faUserPlus, faUsers, faFilter, faTrophy, faSearch, faHistory, faSliders);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
