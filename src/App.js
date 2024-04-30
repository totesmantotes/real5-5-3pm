import React, { useState, Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "./routes";
import Navigation from "./components/Navigation"; // Import the Navigation component

function App() {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [account, setAccount] = useState(null); // Add state for account

  const location = useLocation();

  return (
    <Suspense fallback={() => <h1>Loading...</h1>}>
      <Routes location={location}>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            exact
            path={route.path}
            element={
              route.requiresAuth && !isLogged ? (
                <Navigate replace to={"/login"} />
              ) : (
                <route.component
                  setIsLogged={setIsLogged}
                  setUsername={setUsername}
                  username={username}
                  setAccount={setAccount} // Pass setAccount to the component
                />
              )
            }
          />
        ))}
        {/* Add routes from appRoutes */}
      </Routes>
      <Navigation account={account} setAccount={setAccount} /> {/* Pass account and setAccount to Navigation */}
    </Suspense>
  );
}

export default App;
