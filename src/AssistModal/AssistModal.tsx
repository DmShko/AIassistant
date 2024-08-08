import { createPortal } from "react-dom";
import { FC, PropsWithChildren } from "react";

const modalRoot = document.querySelector('#root-modal') as HTMLElement;

// style
import mo from './AssistModal.module.scss';

// types 
import { AssistModalProps } from '../types/assistTypes'

const AssistModal: FC<PropsWithChildren<AssistModalProps>> = ({ children, modalContent }) => {

  const clickButton = (evt: React.MouseEvent<HTMLButtonElement>) => {

      if (evt.target === evt.currentTarget){
    
        //close modal window
        modalContent();
      } 
  };

  return createPortal(

    <div className={mo.modalContainer}>
        <button type='button' onClick={clickButton}>{'Open/Close'}</button>
        { children }
    </div>, modalRoot
  )
}

export default AssistModal