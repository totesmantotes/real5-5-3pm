import React, { useState, Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "./routes";
import Navigation from "./components/Navigation";

function App() {
  const [account, setAccount] = useState(null);
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
              route.requiresAuth && !account ? (
                <Navigate replace to={"/login"} />
              ) : (
                <route.component
                  {...{
                    account,
                    setAccount,
                  }}
                />
              )
            }
          />
        ))}
      </Routes>
      <Navigation account={account} setAccount={setAccount} />
    </Suspense>
  );
}

export default App;
