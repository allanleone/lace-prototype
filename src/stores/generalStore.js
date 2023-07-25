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
        addedToCardano: false,
        addedToPolygon: false,
        tokenSelectedFromTable: false,
        polygonAdded: false,
        cardanoAdded: false,
        lang: {
            en: [],
            pt_br: [],
        },
        selectedLang: 'en',
        langDoneLoading: false,
        // !
        // address book
        addressBookContacts: [
            {
                name: "Robert Smith",
                wallet: "0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6",
                ico: "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
            },
            {
                name: "Thomas Jason",
                wallet: "addr_test1qzhxwe9270lh76chk8pjmh2x8hzsjnwphm8aqkju6czlsms2hcl5vqku7atfuzgfpqhlkyec0ufv9084p8lqvthnjzcss4rvu2",
                ico: "https://seeklogo.com/images/C/cardano-ada-logo-4B6BADDB43-seeklogo.com.png",
            },
            {
                name: "Leon Barros",
                wallet: "$leon_barros",
                ico: "data:image/jpeg;base64,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",
            },
            {
                name: "Jonnas Lima",
                wallet: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
                ico: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
            },
        ],
        // !
        //tokens
        tokens: [
            {
                thumb: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/6US2A64CB5HLBDLUCVKUHVAN44.png",
                label: "Cardano",
                tokenName: "Cardano",
                address: "ADA",
                currentPrice: "0.29",
                variation: "2.43",
                balance: 1250,
                last24HoursVariation: [0.710, 0.945, 0.715, 0.556, 0.431, 0.500, 0.777, 0.406, 0.698, 0.485, 0.896, 0.453, 0.823, 0.886, 0.409, 0.701, 0.732, 0.623, 0.844, 0.597, 0.412, 0.529, 0.497, 0.723, 0.788],
                clicked: false,
                type: "token",
                policyId: "asset1kmp6nmdx5ptmjnt30vq2m2606nz35ae4xfx588",
                assetId: "addr1q9tj68etha9ml3cxza8ghmty3twqtv0hwy2jwtw5x3yxcrv7g2p37tkvfrgxepftql7rfrgue9sl83n5zjk708j9g3ms5h4umd",
                network: "CARDANO",
                thumbNetwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
            },
            {
                thumb: "https://static.vecteezy.com/system/resources/previews/005/597/229/non_2x/polygon-logo-crypto-currency-symbol-isolated-vector.jpg",
                label: "Polygon",
                tokenName: "Polygon",
                address: "MATIC",
                currentPrice: "0.74",
                variation: "-3.56",
                balance: 200,
                last24HoursVariation: [0.710, 0.945, 0.715, 0.556, 0.431, 0.500, 0.777, 0.406, 0.698, 0.485, 0.896, 0.453, 0.823, 0.886, 0.409, 0.701, 0.732, 0.623, 0.844, 0.597, 0.412, 0.529, 0.497, 0.723, 0.788],
                clicked: false,
                type: "token",
                policyId: "asset1kmp6nmdx5ptmjnt30vq2m2606nz35ae4xfx588",
                assetId: "0xe5906ADDcf045B7D0B6e882bCF311f2575961d95",
                network: "POLYGON",
                thumbNetwork: "data:image/png;base64,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",
            },
        ],
        // ""
        // activity
        activity: [
            {
                thumb: "received",
                label: "Received",
                timestamp: "12 Jul 2023 14:22:35 GMT+0100 (British Summer Time)",
                bundle: [
                    "250 ADA",
                ],
                convertedTotal: "0.2900",
                status: "Success",
                hash: "cbsdfsdf3hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
                network: "CARDANO",
                type: "transfer"
            },
            {
                thumb: "received",
                label: "Received",
                timestamp: "10 Jul 2023 14:25:33 GMT+0100 (British Summer Time)",
                bundle: [
                    "500 ADA",
                ],
                convertedTotal: "0.2900",
                status: "Success",
                hash: "12394usdiufoh9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
                network: "CARDANO",
                type: "transfer"
            },
            {
                thumb: "received",
                label: "Received",
                timestamp: "10 Jul 2023 14:22:35 GMT+0100 (British Summer Time)",
                bundle: [
                    "500 ADA",
                ],
                convertedTotal: "0.2900",
                status: "Success",
                hash: "fghfghertert9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
                network: "CARDANO",
                type: "transfer"
            },
            {
                thumb: "self",
                label: "Swap",
                timestamp: "10 Jul 2023 14:25:33 GMT+0100 (British Summer Time)",
                bundle: [
                   "20 ADA, 14 MATIC",
                ],
                convertedTotal: 0.4732,
                status: "Success",
                hash: "poi2op34i2o4i2o32fsfdsdwd98fh23049fjhs0wdrfu023ru0wdf",
                network: "CARDANO",
                type: "swap"
            }
            // {
            //     thumb: "delegation",
            //     label: "Delegation",
            //     timestamp: "15 May 2023 14:23:14 GMT+0100 (British Summer Time)",
            //     bundle: [
            //         "12.00 tADA",
            //         "0.0005 Lace1",
            //         "4.0065 Lace2",
            //     ],
            //     convertedTotal: "5.44",
            //     status: "Success",
            //     hash: "12394usdiufoh9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
            // },
            // {
            //     thumb: "received",
            //     label: "Received",
            //     timestamp: "14 May 2023 11:22:35 GMT",
            //     bundle: [
            //         "12.00 tADA",
            //         "0.0005 Lace1",
            //         "4.0065 Lace2",
            //     ],
            //     convertedTotal: "5.44",
            //     status: "Success",
            //     hash: "12394usdiufoh9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
            // },
            // {
            //     thumb: "sent",
            //     label: "Sent",
            //     timestamp: "14 May 2023 12:22:35 GMT",
            //     bundle: [
            //         "12.00 tADA",
            //         "0.0005 Lace1",
            //         "4.0065 Lace2",
            //     ],
            //     convertedTotal: "5.44",
            //     status: "Success",
            //     hash: "12394usdiufoh9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
            // },
            // {
            //     thumb: "self",
            //     label: "Self Transaction",
            //     timestamp: "14 May 2023 15:22:35 GMT",
            //     bundle: [
            //         "12.00 tADA",
            //         "0.0005 Lace1",
            //         "4.0065 Lace2",
            //     ],
            //     convertedTotal: "5.44",
            //     status: "Success",
            //     hash: "12394usdiufoh9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
            // },
        ],
        //settings
        //
        settingsPage: 1,
        wallets: [
            {
                name: "Polygon",
                type: "MATIC",
                addr: "0x329CdCBBD82c934fe32322b423bD8fBd30b4EEB6",
                icon: "https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png",
                expanded: false,
                netSelection: 1,
                active: true,
               network: "POLYGON",
            },
            {
                name: "Cardano",
                type: "ADA",
                addr: "addr11983n1c9283nc918237nc913n9182cn9812cn912cn9127nc9182cn98c2n9381",
                icon: "https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png",
                expanded: false,
                netSelection: 1,
                active: true,
                network: "CARDANO",
            },
            // {
            //     name: "Handle",
            //     type: "$handle",
            //     addr: "$allanleone",
            //     icon: "https://res.cloudinary.com/dkjdnfj7u/image/upload/c_limit,h_500,w_500/q_auto:best/v1678458230/collections/hero_image/adahandle?_a=ATCqVAA0.webp",
            //     expanded: false,
            //     netSelection: 1,
            //     active: true,
            //     network: "HANDLE",
            // },
        ],
        // !
        // trading
        storedTrading: null,
        // !
    }),
    getters: {
        currentTheme: (state) => state.theme,
        get: (state) => (val) => state[val],
        translate: (state) => (l1, l2, l3, l4, l5, l6, l7, l8, l9, l10) => {
            if(state.langDoneLoading){
                if(l10) return state.lang[state.selectedLang][l1][l2][l3][l4][l5][l6][l7][l8][l9][l10]
                else if(l9) return state.lang[state.selectedLang][l1][l2][l3][l4][l5][l6][l7][l8][l9]
                else if(l8) return state.lang[state.selectedLang][l1][l2][l3][l4][l5][l6][l7][l8]
                else if(l7) return state.lang[state.selectedLang][l1][l2][l3][l4][l5][l6][l7]
                else if(l6) return state.lang[state.selectedLang][l1][l2][l3][l4][l5][l6]
                else if(l5) return state.lang[state.selectedLang][l1][l2][l3][l4][l5]
                else if(l4) return state.lang[state.selectedLang][l1][l2][l3][l4]
                else if(l3) return state.lang[state.selectedLang][l1][l2][l3]
                else if(l2) return state.lang[state.selectedLang][l1][l2]
                else if(l1) return state.lang[state.selectedLang][l1]
                else return null
            }else{
                return "   "
            }
        },
    },
    actions: {
        async set(val) {
            this[val.key] = val.value
        },
        async setLang(val) {
            this.lang[val.key] = val.value;
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
        async increaseTokenCardano(){

            if(!this.$state.cardanoAdded){
                let currentDate = new Date();
                if(!this.$state.addedToCardano){
                    this.$state.addedToCardano = true;
                    this.$state.tokens.push({
                            thumb: "https://s2.coinmarketcap.com/static/img/coins/64x64/13769.png",
                            label: "World Mobile Token",
                            address: "WMT",
                            currentPrice: "0.1077",
                            variation: "1.43",
                            balance: 1000,
                            last24HoursVariation: [5.587, 7.654, 4.118, 6.289, 4.843, 8.568, 8.829, 4.679, 8.241, 4.452, 4.799, 4.125, 4.845, 8.888, 3.979, 7.583, 9.791, 6.046, 6.331, 4.995, 3.989, 3.481, 6.227, 6.658, 3.675],
                            clicked: false,
                            type: "token",
                            policyId: "asset1kmp6nmdx5ptmjnt30vq2m2606nz35ae4xfx588",
                            assetId: "50994cb11612b0e6ded5ad396dd49ff11a90d0e79b299c580a4f1gv2",
                            network: "CARDANO",
                        });
                        this.$state.tokens.push({
                                thumb: "https://s2.coinmarketcap.com/static/img/coins/64x64/25264.png",
                                label: "Snek",
                                address: "SNEK",
                                currentPrice: "0.0004091",
                                variation: "-6.43",
                                balance: 5000,
                                last24HoursVariation: [5.587, 7.654, 4.118, 6.289, 4.843, 8.568, 8.829, 4.679, 8.241, 4.452, 4.799, 4.125, 4.845, 8.888, 3.979, 7.583, 9.791, 6.046, 6.331, 4.995, 3.989, 3.481, 6.227, 6.658, 3.675],
                                clicked: false,
                                type: "token",
                                policyId: "asset1kmp6nmdx5ptmjnt30vq2m2606nz35ae4xfx588",
                                assetId: "50994cb11612b0e6ded5ad396dd49ff11a90d0e79b299c580a4f1gv2",
                                network: "CARDANO",
                        });
                    this.$state.activity.push({
                        thumb: "received",
                        label: "Received",
                        timestamp: currentDate,
                        bundle: [
                            "1000 SNEK",
                        ],
                        convertedTotal: "0.0004091",
                        status: "Success",
                        hash: "kksldkfjsldsdfsfdsdwd98fh23049fjhs0wdrfu023ru0wdf",
                        network: "CARDANO",
                        type: "transfer"
                    });
                    this.$state.activity.push({
                        thumb: "received",
                        label: "Received",
                        timestamp: currentDate,
                        bundle: [
                            "5000 WMT",
                        ],
                        convertedTotal: "0.1077",
                        status: "Success",
                        hash: "pppokasodpasdasdgsdadalla98fh23049fjhs0wdrfu023ru0wdf",
                        network: "CARDANO",
                        type: "transfer"
                    });
                }
            }
        },
        async increaseTokenPolygon(){
            if(!this.$state.addedToPolygon){
            let currentDate = new Date();
                this.$state.addedToPolygon = true;

                // !!!
                this.$state.tokens.push({
                    thumb: "https://s2.coinmarketcap.com/static/img/coins/64x64/3632.png",
                    label: "Opacity",
                    tokenName: "Opacity",
                    address: "OPCT",
                    currentPrice: "0.006473",
                    variation: "1.24",
                    balance: 10000,
                    last24HoursVariation: [0.710, 0.945, 0.715, 0.556, 0.431, 0.500, 0.777, 0.406, 0.698, 0.485, 0.896, 0.453, 0.823, 0.886, 0.409, 0.701, 0.732, 0.623, 0.844, 0.597, 0.412, 0.529, 0.497, 0.723, 0.788],
                    clicked: false,
                    type: "token",
                    policyId: "asset1kmp6nmdx5ptmjnt30vq2m2606nz35ae4xfx588",
                    assetId: "0xe5906ADDcf045B7D0B6e882bCF311f2575961d95",
                    network: "POLYGON",
                    thumbNetwork: "data:image/png;base64,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",
                });
                // !!!

                 this.$state.tokens.forEach((t)=>{
                    if(t.address == "MATIC"){
                        t.balance += 100;
                    }
                 });
                 if(!this.$state.polygonAdded){
                    this.$state.polygonAdded = true;
                    this.$state.nfts.push({
                        id: "3",
                        label: "Duis aute irure dolor in reprehenderit in",
                        thumb: "https://lh3.googleusercontent.com/aDukKM0MNXSgS4W_JTQC8aCDVa1pQlphr3nquDpni9rM8uaPJUKkDEgaC1HoMFdBgwEQ11MlT1H_GDCC5TGq7413FKTCgwsOD_VwNQ",
                        policyId: "habkjsh42jk3hjkawshdeajshed",
                        assetId: "habkjsh42jk3hjkawshdeajshed",
                        aproxPrice: "6394.00",
                        currentPrice: "3.376",
                        owners: "8210",
                        volume: "12.34m",
                        clicked: false,
                        type: "nft",
                        balance: 1,
                        network: "POLYGON",
                        valueSign: "MATIC",
                        networkName: "Polygon",
                        thumbNetwork: "data:image/png;base64,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",
                    });
                    this.$state.activity.push({
                        thumb: "received",
                        label: "Received",
                        timestamp: currentDate,
                        bundle: [
                            "200 MATIC",
                        ],
                        convertedTotal: "0.74",
                        status: "Success",
                        hash: "kksldkfjsldsdfsfdsdwd98fh23049fjhs0wdrfu023ru0wdf",
                        network: "POLYGON",
                        type: "transfer"
                    });
                    this.$state.activity.push({
                        thumb: "received",
                        label: "Received",
                        timestamp: currentDate,
                        bundle: [
                            "1 NFT",
                        ],
                        convertedTotal: "0.1077",
                        status: "Success",
                        hash: "pppokasodpasdasdgsdadalla98fh23049fjhs0wdrfu023ru0wdf",
                        network: "POLYGON",
                        type: "transfer"
                    });
                 }
            }
        },
        async activitySwapPush(item){

            let currentDate = new Date();
            let from = item.data.from[0];
            let to = item.data.to[0];

            let f = from.amount.toFixed(2) + " " + from.address
            let t = to.amount.toFixed(2) + " " + to.address

            this.$state.activity.push({
                thumb: "self",
                label: "Swap",
                timestamp: currentDate,
                bundle: [
                    f,
                    t
                ],
                convertedTotal: from.currentPrice,
                status: "Success",
                hash: "kksldkfjsldsdfsfdsdwd98fh23049fjhs0wdrfu023ru0wdf",
                network: from.label,
                type: "swap"
            });

        },

    },
})