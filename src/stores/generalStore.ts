
import { defineStore } from 'pinia'

export const generalStore = defineStore('general', {
    state: () => ({ 
        theme: "light",
        userMenu: "closed",
        sidebarVisible: false,
        widgetTransition: true,
        sidedrawerVisible: false,
        sidedrawerStorage: null,
        sidedrawerValid: false,
        // !
        // address book
        addressBookContacts: [
            {
                name: "Allan Leone",
                wallet: "addr_test1qzhxwe9270lh76chk8pjmh2x8hzsjnwphm8aqkju6czlsms2hcl5vqku7atfuzgfpqhlkyec0ufv9084p8lqvthnjzcss4rvu2"
            },
        ],
        //
    }),
    getters: {
        currentTheme: (state) => state.theme,
        get: (state) => (val) => state[val],
    },
    actions: {
        async set(val) {
            this[val.key] = val.value
        },
        async pushItem(val) {
            console.log(this[val.key], val.value)
            this[val.key].push(val.value);
        },
        setDelayed(val) {
            setTimeout(()=>{
                this[val.key] = val.value
            }, 1000) 
        },
    },
})