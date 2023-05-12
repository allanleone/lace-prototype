
import { defineStore } from 'pinia'

export const generalStore = defineStore('general', {
    state: () => ({ 
        theme: "light",
        userMenu: "closed",
        sidebarVisible: false,
        widgetTransition: true,
    }),
    getters: {
        currentTheme: (state) => state.theme,
        get: (state) => (val) => state[val],
    },
    actions: {
        async set(val) {
            this[val.key] = val.value
        },
        setDelayed(val) {
            setTimeout(()=>{
                this[val.key] = val.value
            }, 1000) 
        },
    },
})