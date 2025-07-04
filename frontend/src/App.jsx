import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import RegisterPage from './register/register';
import LoginPage from './login/login';
import QuizFlow from './components/quiz/QuizFlow';
import OpportunityList from './components/opportunities/OpportunityList';
import ChatInterface from './components/chatbot/ChatInterface';
import ProjectsPage from './dashboard/projects/project_page';
import DashboardLayout from './dashboard/layout';
import OverviewPage from './dashboard/overview/overview_page';
import Opportunity from './dashboard/opportunities/opportunity_page';
import ChatBot from './dashboard/chatbot/Chatbot_page'
import Quiz from './dashboard/quiz/quiz_page';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quizflow" element={<QuizFlow />} />
          <Route path="/opportunities" element={<OpportunityList />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="opportunity" element={<Opportunity />} />
            <Route path="chatbot" element={<ChatBot />} />
            <Route path="quiz" element={<Quiz />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;