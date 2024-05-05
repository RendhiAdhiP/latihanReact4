import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobValidation from './pages/JobValidation';
import JobVacancy from './pages/JobVacancy';
import JobVacancyDetail from './pages/JobVacancyDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/job-validation' element={<JobValidation/>} />
        <Route path='/job-vacancy' element={<JobVacancy/>} />
        {/* <Route path='/job-vacancy-detail/id:' element={<JobVacancyDetail/>} /> */}
        <Route path='/job-vacancy-detail/:id' element={<JobVacancyDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
