export interface AssistModalProps {
    modalContent: Function
};

export interface Store {
    question: string
    thread_id: string
    assistant_id: string
    message_id: string
    run_id: string
    error: string
    retrieve_status: string
    messagesList: any[]
    getMessagesList: Function
    reset: Function
    addAssist: Function
    addThread: Function
    addMessage: Function
    addReq: Function
    setQuestion: Function
    runRetrieve: Function
};