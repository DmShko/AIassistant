import { useState } from 'react';

import AssistModal from './AssistModal/AssistModal';

//style
import app from './App.module.scss';

function App() {

  const [ contentToggle, setContentToggle] = useState(false);

  const driveContent = () => {
   
    // toggle modal window
    setContentToggle(state => !state);
     
  };
 
  return (
    <>
 
      <AssistModal modalContent={driveContent}>
 
        <h1>Hello AI</h1>
    
        {
          contentToggle && <div className={app.container}></div>
        }

      </AssistModal>
    </>
  )
}

export default App