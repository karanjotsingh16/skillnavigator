import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Study from './pages/Study';
import UnitDetail from './pages/UnitDetail';
import CareerFinder from './pages/CareerFinder';
import QuizList from './pages/QuizList';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="study" element={<Study />} />
          <Route path="study/:slug" element={<UnitDetail />} />
          <Route path="career-finder" element={<CareerFinder />} />
          <Route path="quiz" element={<QuizList />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
