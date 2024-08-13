import { useState, useEffect} from 'react';

import { useFormik } from "formik"; 
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import { assistStore } from './store/assistStore'; 

import AssistModal from './AssistModal/AssistModal';

//style
import app from './App.module.scss';

function App() {

  const [ contentToggle, setContentToggle] = useState(false);

  const assist = assistStore(state => state);

  useEffect(()=> {
    if(assist.assistant_id) assist.addThread();
  }, [assist.assistant_id])

  useEffect(()=> {
    if(assist.thread_id) assist.addMessage(assist.question);
  }, [assist.thread_id])

  useEffect(()=> {
    if(assist.message_id) assist.addReq();
  }, [assist.message_id])

  useEffect(()=> {
    if(assist.run_id) {assist.getMessagesList();
    assist.reset('message_id');}
  }, [assist.run_id])

  const driveContent = () => {
   
    // toggle modal window
    setContentToggle(state => !state);
     
  };

  const formik = useFormik({

    //yup stored own validate functions (for email, password...etc)
    validationSchema: Yup.object({
      question: Yup.string().required('Must not be emptyas'),
    }),
    initialValues: {
      question: '',
    },
    onSubmit: (values, { resetForm }) => {
  
      assist.addAssist();
      assist.setQuestion(values.question);
   
      resetForm();

    },
  });
 
  return (
    <>
 
      <AssistModal modalContent={driveContent}>

        {
          contentToggle && 
          <div className={app.container}>
            <p className={app.title}><span>{'Can I help you?'}</span></p>

            <form onSubmit={formik.handleSubmit}>
              <input
                id="question"
                name="question"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.question}
              />

              <button type='submit'><span>{'Go'}</span></button>
            </form>

            <div className={app.infoField}>
              <ul>
                {
                  assist.messagesList.map(element => 
                    {
                      return <li key={nanoid()}>{element.content[element.content.length - 1].text.value}</li>
                    }
                  )
                }
                
              </ul>
              <p>{assist.messagesList.toString()}</p>
            </div>
          </div>
        }

      </AssistModal>
    </>
  )
}

export default App