import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import {ProjectsProvider} from './context/ProjectsProvider';
import AuthLayout from './layouts/AuthLayout';
import PrivateLayout from './layouts/PrivateLayout';
import AddCollaborator from './pages/AddCollaborator';
import ConfirmAccount from './pages/ConfirmAccount';
import {EditProject} from './pages/EditProject';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import NewProject from './pages/NewProject';
import {ProjectDetail} from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/projects" element={<PrivateLayout />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route path=":id" element={<ProjectDetail />} />
              <Route path="add-collaborator/:id" element={<AddCollaborator />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
