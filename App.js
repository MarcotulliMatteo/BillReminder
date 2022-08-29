import React from 'react';

import AppStack from './navigation/AppStack';

import Store from './providers/reduxProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const {reduxStore, persister} = Store()

  return (
    <PersistGate loading={null} persistor={persister}>
      <Provider store={reduxStore}>
        <AppStack/>
      </Provider>
    </PersistGate>
    
  );
}

export default App;