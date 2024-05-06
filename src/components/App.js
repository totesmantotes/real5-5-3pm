import React, { lazy, Suspense, useState } from 'react'; // Import useState
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const Users = lazy(() => import('./components/Users'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const SearchUser = lazy(() => import('./components/SearchUser'));
const Login = lazy(() => import('./components/login'));
const AuthProfile = lazy(() => import('./components/AuthProfile'));
const AboutUs = lazy(() => import('./components/About'));
const RepoDetail = lazy(() => import('./components/RepoDetail'));
const Dappcord = lazy(() => import('./components/Dappcord'));
const NotFound = lazy(() => import('./components/NotFound'));
const Payment = lazy(() => import('./components/Payment')); // Import the Payment component using lazy loading

function App() {
  const [account, setAccount] = useState(null);
  const [githubUsername, setGitHubUsername] = useState(null); // Add state for GitHub username

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={(props) => <Login {...props} setAccount={setAccount} setGitHubUsername={setGitHubUsername} />} />
          <Route path="/users" component={Users} />
          <Route path="/authProfile" render={() => <AuthProfile username={githubUsername} />} />
          <Route path="/search" component={SearchUser} />
          <Route path="/users/user/:username" component={UserProfile} />
          <Route path="/about" component={AboutUs} />
          <Route path="/repo-detail/:name/:username" component={RepoDetail} />
          <Route path="/dappcord" component={Dappcord} />
          <Route path="/payment" component={Payment} /> {/* Add route for the Payment component */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;