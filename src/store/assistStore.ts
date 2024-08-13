import { create } from 'zustand';
// import axios from 'axios'; 

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_AI_ASSYSTANT_API_KEY,
    dangerouslyAllowBrowser: true
});

// types 
import { Store } from '../types/assistTypes';

export const assistStore = create<Store>((set, get) => ({

   question: '',
   thread_id: '',
   assistant_id: '',
   message_id: '',
   run_id: '',
   error: '',
   messagesList: [],
   setQuestion: (data: string) => set((state) => ({question: state.question = data})),
   reset: (data: string) => set(() => ({[data]: ''})),
   addAssist: async ()=> {

    await openai.beta.assistants.create({
        instructions:
          "You are an bot, and you have access to files to answer employee questions weather.",
        name: "Weather Helper",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-3.5-turbo-0125"
    }).then( res => 

        set((state) => ({assistant_id: state.assistant_id = res.id}))

    ).catch(error =>
        
        set((state) => ({error: state.error = error}))
    );

  },

  addThread: async ()=> {

    await openai.beta.threads.create()
    .then( res => 

        set((state) => ({thread_id: state.thread_id = res.id}))
    
      ).catch(error =>
    
        set((state) => ({error: state.error = error}))
      );
 
  },

  addMessage: async (content: string)=> {

    await openai.beta.threads.messages.create(
        get().thread_id,
        { role: "user", 
          content: content })
        .then( res => 

          set((state) => ({message_id: state.message_id = res.id}))
        
        ).catch(error =>
        
          set((state) => ({error: state.error = error}))
        );
  },

  addReq: async ()=> {

    await openai.beta.threads.runs.create(
    get().thread_id,
    { assistant_id: get().assistant_id }
    ).then( res => 
       
        set((state) => ({run_id: state.run_id = res.id}))
    
      ).catch(error =>
    
        set((state) => ({error: state.error = error}))
      );
  },

  getMessagesList: async ()=> {

    await openai.beta.threads.messages.list(
        get().thread_id,
    ).then( res => {
       
        set((state) => ({messagesList: state.messagesList = res.data}))
      }
      ).catch(error =>
    
        set((state) => ({error: state.error = error}))
      );
  },

}))