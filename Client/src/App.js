import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/HomePage/Layout';
import Home from './components/HomePage/Home';
import Cursuri from './components/HomePage/Cursuri';
import SignUp from './components/HomePage/SignUp';
import SignIn from './components/HomePage/SignIn';
import UtilizatoriList from './components/UtilizatoriList';
import UtilizatorDetails from './components/UtilizatorDetails';
import UtilizatorCreate from './components/UtilizatorCreate';
import UtilizatorEdit from './components/UtilizatorEdit';
import CursuriList from './components/CursuriList';
import CursDetails from './components/CursDetails';
import CursCreate from './components/CursCreate';
import CursEdit from './components/CursEdit';
import AbonamenteList from './components/AbonamenteList';
import AbonamenteList1 from './components/AbonamenteList1';
import AbonamentCreate from './components/AbonamentCreate';
import Abonamente from './components/Student/Abonamente';
import TestHome from './components/TestHome';
import CursurileMele from './components/Student/CursurileMele';
import StudentLayout from './components/Student/StudentLayout';
import InstructorLayout from './components/Instructor/InstructorLayout';
import CursurileMeleCreate from './components/Instructor/CursurileMeleCreate';
import AdaugaCursNou from './components/Instructor/AdaugaCursNou';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import AuthProvider from './contexts/AuthContext';
import ManageUsers from './components/Admin/ManageUsers';
import ModuleManagement from './components/Instructor/ModuleManagement';
import CourseDetails from './components/Instructor/CourseDetails';
import StudentCourseDetails from './components/Student/StudentCourseDetails';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rute Publice */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/cursuri" element={<Layout><Cursuri /></Layout>} />
          <Route path="/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp /></Layout>} />

          {/* Rute pentru Utilizatori */}
          <Route path="/utilizatori" element={<UtilizatoriList />} />
          <Route path="/utilizatori/:id" element={<UtilizatorDetails />} />
          <Route path="/utilizatori/create" element={<UtilizatorCreate />} />
          <Route path="/utilizatori/:id/edit" element={<UtilizatorEdit />} />

          {/* Rute  Cursuri */}
          <Route path="/cursurilist" element={<CursuriList />} />
          <Route path="/cursuridetails/:id" element={<CursDetails />} />
          <Route path="/cursuricreate/create" element={<CursCreate />} />
          <Route path="/cursuri/:id/edit" element={<CursEdit />} />

          {/* Rute  Abonamente */}
          <Route path="/abonamente" element={<AbonamenteList />} />
          <Route path="/abonamente1" element={<AbonamenteList1 />} />
          <Route path="/abonamente/create" element={<AbonamentCreate />} />

          {/* Rute  Student*/}
          <Route
            path="/cursurile-mele"
            element={
              <PrivateRoute>
                <StudentLayout>
                  <CursurileMele />
                </StudentLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cursurile-mele/:id"
            element={
              <PrivateRoute>
                <StudentLayout>
                  <StudentCourseDetails />
                </StudentLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/abonamente2"
            element={
              <PrivateRoute>
                <StudentLayout>
                  <Abonamente />
                </StudentLayout>
              </PrivateRoute>
            }
          />

          {/* Rute  Instructor */}
          <Route
            path="/instructor"
            element={
              <RoleBasedRoute role="instructor">
                <InstructorLayout />
              </RoleBasedRoute>
            }
          >
            <Route
              path="cursurile-mele-create"
              element={<CursurileMeleCreate />}
            />
            <Route
              path="adauga-curs-nou"
              element={<AdaugaCursNou />}
            />
             <Route
              path="module-management"
              element={<ModuleManagement />}
            />
             <Route
              path="cursuri/:id"
              element={<CourseDetails />}
            />
          </Route>

          {/* Alte rute */}
          <Route path="/test" element={<TestHome />} />
          <Route path="/stersLogic" element={<ManageUsers />} />
          {/* .. */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/adaugaUtilizator" element={<UtilizatorCreate/>}/>
         
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
