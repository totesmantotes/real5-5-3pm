// ParentComponent.js
import React, { useState } from 'react';
import Navigation from './Navigation';

const ParentComponent = () => {
  const [account, setAccount] = useState(null);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      {/* Other content */}
    </div>
  );
};

export default ParentComponent;
