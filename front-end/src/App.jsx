import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { CreateUserPage } from './pages/CreateUser';
import { EditUserPage } from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/users" component={() => <h1>Manage Users</h1>} />
            <Route exact path="/users/create" component={CreateUserPage} />
            <Route exact path="/users/edit/:id" component={EditUserPage} />
            <Route exact path="/assets" component={() => <h1>Manage Assets</h1>} />
            <Route exact path="/assets/create" component={() => <h1>Create Assets</h1>} />
            <Route exact path="/assets/edit/:id" component={() => <h1>Edit Assets</h1>} />
            <Route exact path="/assignments" component={() => <h1>Manage Assignments</h1>} />
            <Route exact path="/assignments/create" component={() => <h1>Create Assignments</h1>} />
            <Route exact path="/assignments/edit/:id" component={() => <h1>Edit Assignments</h1>} />
            <Route exact path="/report" component={() => <h1>Report Page</h1>} />
            <Route exact path="/requests" component={() => <h1>Requests for Returning Page</h1>} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
