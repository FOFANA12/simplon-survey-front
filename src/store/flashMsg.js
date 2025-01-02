
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFlashMsgStore = defineStore({
  id: 'flashMessage',
  state: () => ({
    message: reactive({
      type: null,
      text: null
    }),
  }),

  actions: {
    resetMessage(){
      this.updateMessage()
    },
    updateMessage(type = null, text = null){
      Object.assign(this.message, {
        type: type,
        text: text,
      })
    },
  }
})