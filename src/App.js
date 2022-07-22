import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import UnderRoot from './component/UnderRoot';

function App() {
  return (
    <Router>
      <UnderRoot />
    </Router>
  );
}

export default App;
