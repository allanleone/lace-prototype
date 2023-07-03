
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
                wallet: "addr_test1qzhxwe9270lh76chk8pjmh2x8hzsjnwphm8aqkju6czlsms2hcl5vqku7atfuzgfpqhlkyec0ufv9084p8lqvthnjzcss4rvu2",
                ico: "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
            },
            {
                name: "Lorem Ipsum",
                wallet: "addr_test1qzhxwe9270lh76chk8pjmh2x8hzsjnwphm8aqkju6czlsms2hcl5vqku7atfuzgfpqhlkyec0ufv9084p8lqvthnjzcss4rvu2",
                ico: "https://seeklogo.com/images/C/cardano-ada-logo-4B6BADDB43-seeklogo.com.png",
            },
        ],
        //
        // !
        //settings
        settingsPage: 1,
        wallets: [
            {
                name: "Polygon",
                type: "MATIC",
                addr: "addr1hc89yh87h87hsd78fhs87dfh78sgdf78asgdf78sgf7s8gdf7s8dgf87sdgfh87",
                icon: "https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png",
                expanded: false,
                netSelection: 1,
                active: true,
            },
            {
                name: "Cardano",
                type: "ADA",
                addr: "addr11983n1c9283nc918237nc913n9182cn9812cn912cn9127nc9182cn98c2n9381",
                icon: "https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png",
                expanded: false,
                netSelection: 1,
                active: true,
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