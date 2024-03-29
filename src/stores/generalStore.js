import { defineStore } from 'pinia'

import JSONen from '@/assets/lang/en.json';
import JSONpt_br from '@/assets/lang/pt_br.json';
import JSONjp from '@/assets/lang/jp.json';
import JSONit from '@/assets/lang/it.json';
import JSONes from '@/assets/lang/es.json';
import JSONru from '@/assets/lang/ru.json';
import JSONfr from '@/assets/lang/fr.json';

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
        //
        tempAngle: 10,
        tempZoom: .95,
        tempParallax: 2,
        tempShadow: 40,
        tempShadowOpc: .5,
        tempShadowBlur: 15,
        //
        selectedLang: 'en',
        langLoaded: false,
        langLoadedFirstRun: false,
        lang: {},
        baseLangForPreloading: {},
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
        // NFTs
         nfts: [
            {
                id: "1",
                label: "Lorem ipsum dolor",
                thumb: "https://public.nftstatic.com/static/nft/res/c10afbb0984f44379d835050ef6c1c6a.jpeg",
                policyId: "habkjsh42jk3hjkawshdeajshed",
                assetId: "habkjsh42jk3hjkawshdeajshed",
                aproxPrice: "5387.00",
                currentPrice: "3.376",
                owners: "8210",
                volume: "12.34m",
                clicked: false,
                type: "nft",
                balance: 1,
                network: "CARDANO",
                valueSign: "ADA",
                networkName: "Cardano",
                thumbNetwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
            },
            {
                id: "2",
                label: "Consectetur adipiscing elit, sed do eiusmod tempor",
                thumb: "https://makerradar.com/wp-content/uploads/2022/03/Nyan-Flying-Cat-Gif.gif",
                policyId: "habkjsh42jk3hjkawshdeajshed",
                assetId: "habkjsh42jk3hjkawshdeajshed",
                aproxPrice: "6394.00",
                currentPrice: "3.376",
                owners: "8210",
                volume: "12.34m",
                clicked: false,
                type: "nft",
                balance: 1,
                network: "CARDANO",
                valueSign: "ADA",
                networkName: "Cardano",
                thumbNetwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",

            },
        ],
        // !
        // NFTs (nested)
         nftsNested: {
            active: false,
            name: "Favourites",
            items: [
                {
                    id: "1",
                    label: "Lorem ipsum dolor",
                    thumb: "https://mintspace-media.fra1.digitaloceanspaces.com/wp-content/uploads/2021/12/18082819/NFT-CBC-DEE-TV.png",
                    policyId: "habkjsh42jk3hjkawshdeajshed",
                    assetId: "habkjsh42jk3hjkawshdeajshed",
                    aproxPrice: "5387.00",
                    currentPrice: "3.376",
                    owners: "8210",
                    volume: "12.34m",
                    clicked: false,
                    type: "nft",
                    balance: 1,
                    network: "CARDANO",
                    valueSign: "ADA",
                    networkName: "Cardano",
                    thumbNetwork: "data:image/png;base64,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",
                },
                {
                    id: "2",
                    label: "Consectetur adipiscing elit, sed do eiusmod tempor",
                    thumb: "https://nftnewswire.com/wp-content/uploads/2021/08/When-Square-Meets-Circle-Day-5201314-scaled-1-1024x1024.jpeg",
                    policyId: "habkjsh42jk3hjkawshdeajshed",
                    assetId: "habkjsh42jk3hjkawshdeajshed",
                    aproxPrice: "6394.00",
                    currentPrice: "3.376",
                    owners: "8210",
                    volume: "12.34m",
                    clicked: false,
                    type: "nft",
                    balance: 1,
                    network: "CARDANO",
                    valueSign: "ADA",
                    networkName: "Cardano",
                    thumbNetwork: "data:image/png;base64,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",

                },
                {
                    id: "3",
                    label: "Consectetur adipiscing elit, sed do eiusmod tempor",
                    thumb: "https://nftdroppers.io/wp-content/uploads/2022/11/download-19-2.png",
                    policyId: "habkjsh42jk3hjkawshdeajshed",
                    assetId: "habkjsh42jk3hjkawshdeajshed",
                    aproxPrice: "6394.00",
                    currentPrice: "3.376",
                    owners: "8210",
                    volume: "12.34m",
                    clicked: false,
                    type: "nft",
                    balance: 1,
                    network: "CARDANO",
                    valueSign: "ADA",
                    networkName: "Cardano",
                    thumbNetwork: "data:image/png;base64,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",

                },
                {
                    id: "4",
                    label: "Consectetur adipiscing elit, sed do eiusmod tempor",
                    thumb: "https://pbs.twimg.com/media/FQLDQskVIAEg0fj.jpg",
                    policyId: "habkjsh42jk3hjkawshdeajshed",
                    assetId: "habkjsh42jk3hjkawshdeajshed",
                    aproxPrice: "6394.00",
                    currentPrice: "3.376",
                    owners: "8210",
                    volume: "12.34m",
                    clicked: false,
                    type: "nft",
                    balance: 1,
                    network: "CARDANO",
                    valueSign: "ADA",
                    networkName: "Cardano",
                    thumbNetwork: "data:image/png;base64,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",

                },
            ],
        },
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
            },
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
            {
                thumb: "sent",
                label: "Sent",
                timestamp: "14 May 2023 12:22:35 GMT",
                bundle: [
                    "12.00 ADA",
                ],
                convertedTotal: "5.44",
                status: "Success",
                hash: "12394usdiufoh9823hr9wshfdu9w2h39ruhwd98fh23049fjhs0wdrfu023ru0wdf",
            },
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
        // DApp Store
        dappCategories: [
            {
                name: "Featured",
                url: "/featured",
                active: true,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.66347 17H14.3364M11.9999 3V4M18.3639 5.63604L17.6568 6.34315M21 11.9999H20M4 11.9999H3M6.34309 6.34315L5.63599 5.63604M8.46441 15.5356C6.51179 13.5829 6.51179 10.4171 8.46441 8.46449C10.417 6.51187 13.5829 6.51187 15.5355 8.46449C17.4881 10.4171 17.4881 13.5829 15.5355 15.5356L14.9884 16.0827C14.3555 16.7155 13.9999 17.5739 13.9999 18.469V19C13.9999 20.1046 13.1045 21 11.9999 21C10.8954 21 9.99995 20.1046 9.99995 19V18.469C9.99995 17.5739 9.6444 16.7155 9.01151 16.0827L8.46441 15.5356Z" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Favourites",
                url: "/favourites",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Development",
                url: "/development",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "NFTs",
                url: "/nfts",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 16L8.15901 11.4142C9.03769 10.6332 10.4623 10.6332 11.341 11.4142L16.5 16M14.25 14L16.034 12.4142C16.9127 11.6332 18.3373 11.6332 19.216 12.4142L21 14M14.25 8H14.2613M5.25 20H18.75C19.9926 20 21 19.1046 21 18V6C21 4.89543 19.9926 4 18.75 4L5.25 4C4.00736 4 3 4.89543 3 6L3 18C3 19.1046 4.00736 20 5.25 20Z" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "DeFi",
                url: "/defi",
                active: false,
                icon: '<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17 9v-2c0-1.1046-0.8954-2-2-2h-10c-1.1046 0-2 0.89543-2 2v6c0 1.1046 0.89543 2 2 2h2m2 4h10c1.1046 0 2-0.8954 2-2v-6c0-1.1046-0.8954-2-2-2h-10c-1.1046 0-2 0.89543-2 2v6c0 1.1046 0.89543 2 2 2zm7-5c0 1.1046-0.8954 2-2 2s-2-0.8954-2-2 0.8954-2 2-2 2 0.8954 2 2z" stroke="#3D3B39" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
            },
            {
                name: "Identity",
                url: "/identity",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9999 11C11.9999 14.5172 10.9911 17.7988 9.24707 20.5712M5.80688 18.5304C5.82459 18.5005 5.84273 18.4709 5.8613 18.4413C7.2158 16.2881 7.99991 13.7418 7.99991 11C7.99991 8.79086 9.79077 7 11.9999 7C14.209 7 15.9999 8.79086 15.9999 11C15.9999 12.017 15.9307 13.0186 15.7966 14M13.6792 20.8436C14.2909 19.6226 14.7924 18.3369 15.1707 17M19.0097 18.132C19.6547 15.8657 20 13.4732 20 11C20 6.58172 16.4183 3 12 3C10.5429 3 9.17669 3.38958 8 4.07026M3 15.3641C3.64066 14.0454 4 12.5646 4 11C4 9.54285 4.38958 8.17669 5.07026 7" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Security",
                url: "/security",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Social",
                url: "/social",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 20H22L22 18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Marketplace",
                url: "/marketplace",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L5 3L5.4 5M7 13L17 13L21 5L5.4 5M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Education",
                url: "/education",
                active: false,

                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14L21 9L12 4L3 9L12 14ZM12 14L18.1591 10.5783C18.7017 11.9466 19 13.4384 19 14.9999C19 15.7013 18.9398 16.3885 18.8244 17.0569C16.2143 17.3106 13.849 18.4006 12 20.0555C10.151 18.4006 7.78571 17.3106 5.17562 17.0569C5.06017 16.3885 5 15.7012 5 14.9999C5 13.4384 5.29824 11.9466 5.84088 10.5782L12 14ZM8 19.9999L8 12.5L12 10.2778" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            {
                name: "Games",
                url: "/games",
                active: false,
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7L4 17L12 21" stroke="#3D3B39" stroke-width="2" stroke-linejoin="round"/></svg>',
            },

        ],
        dappFeature: [
            {
                "name": "Artano",
                "desc": "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                "image": "/assets/dappstore/highlight-1.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "Blockfrost",
                "desc": "Your gateway to the Cardano ecosystem",
                "image": "/assets/dappstore/highlight-3.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "JPG.store",
                "desc": "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit.",
                "image": "/assets/dappstore/highlight-4.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "Sunday Swap",
                "desc": "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                "image": "/assets/dappstore/highlight-2.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "NFTStudio",
                "desc": "Create, mint, and trade NFTs on Cardano",
                "image": "https://example.com/nftstudio.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "CardanoGovernance",
                "desc": "Participate in Cardano's decentralized governance",
                "image": "https://example.com/cardano-governance.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "CardanoNFTMarket",
                "desc": "Marketplace for Cardano NFTs",
                "image": "https://example.com/cardano-nft-market.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "CardanoDex",
                "desc": "Decentralized exchange for Cardano",
                "image": "https://example.com/cardano-dex.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "CardanoMint",
                "desc": "Mint your own tokens on Cardano",
                "image": "https://example.com/cardano-mint.png",
                "ico": "/assets/dappstore/not-found.png",
                "url": "",
                "status": "live",
                "certification": {
                "l1": false,
                "l2": false,
                "l3": false
                },
                "hover": false,
                "promoted": true
            }
        ],
        dappHighlights: [
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: true,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
        ],
        dappFavorites: [
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
        ],
        dappPromoted: [
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
        ],
        dapps: [
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: true,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: true,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: true,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Sunday Swap",
                desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                image: "/assets/dappstore/highlight-2.png",
                ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Blockfrost",
                desc: "Your gateway to the Cardano ecosystem",
                image: "/assets/dappstore/highlight-3.png",
                ico: "/assets/dappstore/not-found.png",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "JPG.store",
                desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                image: "/assets/dappstore/highlight-4.png",
                ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                url: "",
                status: "live",
                certification: {
                    l1: true,
                    l2: false,
                    l3: true,
                },
                hover: false,
                promoted: false,
            },
            {
                name: "Artano",
                desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                image: "/assets/dappstore/highlight-1.png",
                ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                url: "",
                status: "live",
                certification: {
                    l1: false,
                    l2: false,
                    l3: false,
                },
                hover: false,
                promoted: false,
            },
        ],
        dappsDevelopment: [
            {
                "name": "Blockfrost",
                "desc": "We provide an instant and scalable Cardano API for free.",
                "image": "/assets/dappstore/development/01.png",
                "ico": "/assets/dappstore/development/01.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "API3",
                "desc": "The Web3 API Economy. Create trustless applications that interact with Web APIs.",
                "image": "/assets/dappstore/development/02.png",
                "ico": "/assets/dappstore/development/02.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Charli3",
                "desc": "The first decentralized oracle network for the Cardano network that interacts with resources on and off of the blockchain.",
                "image": "/assets/dappstore/development/03.png",
                "ico": "/assets/dappstore/development/03.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": false,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Cardano Stack Exchange",
                "desc": "Cardano Stack Exchange is a question and answer site for users and developers of the Cardano cryptocurrency ecosystem.",
                "image": "/assets/dappstore/development/04.png",
                "ico": "/assets/dappstore/development/04.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": false,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Tangocrypto",
                "desc": "We provide a suite of high-availability APIs and developer tools (SDKs).",
                "image": "/assets/dappstore/development/05.png",
                "ico": "/assets/dappstore/development/05.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Wolfram Alpha",
                "desc": "Wolfram Alpha, a major computational knowledge engine providing technology for major services such as Apple’s Siri assistant.",
                "image": "/assets/dappstore/development/06.png",
                "ico": "/assets/dappstore/development/06.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": true
            },
            {
                "name": "Koios",
                "desc": "Decentralized and Elastic RESTful query layer for exploring data on Cardano blockchain.",
                "image": "/assets/dappstore/development/07.png",
                "ico": "/assets/dappstore/development/07.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Cardano Tx Submit Service",
                "desc": "An open-source Cardano Tx Submission Service that provides some stats and customizability. It hooks directly to cardano-submit-tx and cardano-node.",
                "image": "/assets/dappstore/development/08.png",
                "ico": "/assets/dappstore/development/08.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "PyCardano",
                "desc": "A lightweight Cardano library in Python.",
                "image": "/assets/dappstore/development/09.png",
                "ico": "/assets/dappstore/development/09.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Logosphere",
                "desc": "Web3 protocol of interoperable metadata represented as a semantic knowledge graph, providing a framework for building interoperable decentralized applications.",
                "image": "/assets/dappstore/development/10.png",
                "ico": "/assets/dappstore/development/10.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Chainlink",
                "desc": "Chainlink provides the largest collection of decentralized services powering the world’s hybrid smart contracts.",
                "image": "/assets/dappstore/development/11.png",
                "ico": "/assets/dappstore/development/11.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Clear Contracts",
                "desc": "We democratize smart contracts by turning Plutus code into simple online forms.",
                "image": "/assets/dappstore/development/12.png",
                "ico": "/assets/dappstore/development/12.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Smart Contract Made Easy",
                "desc": "SCEZ is a friendly tool to create Smart Contracts, NFT, Native Tokens and Blockchain Transactions.",
                "image": "/assets/dappstore/development/13.png",
                "ico": "/assets/dappstore/development/13.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Orcfax",
                "desc": "Orcfax is a decentralized Cardano oracle. Oracles publish data about the real world to blockchain smart contracts.",
                "image": "/assets/dappstore/development/14.png",
                "ico": "/assets/dappstore/development/14.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "CardanoSharp",
                "desc": "CardanoSharp is a .NET/C# Cryptographic and Serialization Library.",
                "image": "/assets/dappstore/development/15.png",
                "ico": "/assets/dappstore/development/15.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Fluree",
                "desc": "Open source semantic graph database that guarantees data integrity, facilitates secure data sharing, and powers data insights",
                "image": "/assets/dappstore/development/16.png",
                "ico": "/assets/dappstore/development/16.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Aiken",
                "desc": "Cardano smart contract language and toolchain.",
                "image": "/assets/dappstore/development/17.png",
                "ico": "/assets/dappstore/development/17.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "tx-submit-api",
                "desc": "Cardano Transaction Submission API.",
                "image": "/assets/dappstore/development/18.png",
                "ico": "/assets/dappstore/development/18.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Sign With Wallet",
                "desc": "Sign with Wallet lets users log into apps with their wallet credentials instead of using traditional social media accounts.",
                "image": "/assets/dappstore/development/19.png",
                "ico": "/assets/dappstore/development/19.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "BloxBean",
                "desc": "List of OpenSource projects aimed at solving tooling issues and development challenges on blockchain protocols.",
                "image": "/assets/dappstore/development/20.png",
                "ico": "/assets/dappstore/development/20.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Lucid",
                "desc": "Build on Cardano the easy way.",
                "image": "/assets/dappstore/development/21.png",
                "ico": "/assets/dappstore/development/21.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Blockery.io",
                "desc": "Our mission is to provide the cheapest, most secure, and easy to use platform for businesses integrating with the blockchain.",
                "image": "/assets/dappstore/development/22.png",
                "ico": "/assets/dappstore/development/22.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "ADANATOR",
                "desc": "A publicly available GraphQL instance for Cardano data",
                "image": "/assets/dappstore/development/23.png",
                "ico": "/assets/dappstore/development/23.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "TxPipe",
                "desc": "Open-source software for a decentralized world.",
                "image": "/assets/dappstore/development/24.png",
                "ico": "/assets/dappstore/development/24.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Demeter",
                "desc": "Build and deploy dApps on a single platform with Demeter – effortlessly scale to support millions of users.",
                "image": "/assets/dappstore/development/25.png",
                "ico": "/assets/dappstore/development/25.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "blockrockZ",
                "desc": "blockrockZ is a project that provides a powerful GraphQL and REST API for seamless integration between the Cardano Blockchain and various applications.",
                "image": "/assets/dappstore/development/26.png",
                "ico": "/assets/dappstore/development/26.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Opshin",
                "desc": "Community Cardano Smart Contract programming language with 100% valid but restricted Python3 compiling to Untyped Plutus Core",
                "image": "/assets/dappstore/development/27.png",
                "ico": "/assets/dappstore/development/27.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "Blink Labs",
                "desc": "Open Source software and custom solutions for the Cardano Blockchain.",
                "image": "/assets/dappstore/development/28.png",
                "ico": "/assets/dappstore/development/28.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            },
            {
                "name": "MESH",
                "desc": "Mesh is an open-source library that provides everything you need to build Web3 apps, with ease.",
                "image": "/assets/dappstore/development/29.png",
                "ico": "/assets/dappstore/development/29.png",
                "url": "",
                "status": "live",
                "certification": {
                    "l1": true,
                    "l2": false,
                    "l3": false
                },
                "hover": false,
                "promoted": false
            }
        ]
        // !
    }),
    getters: {
        currentTheme: (state) => state.theme,
        get: (state) => (val) => state[val],
        translate: (state) => (wordKey, placeholder) => {
            if(state.langLoaded){
                // 
                if(wordKey){
                    if(state.lang[wordKey]){
                        return state.lang[wordKey]
                    }else{
                        return "⚠"
                    }
                }else{
                    return "..."
                }
                // 
            }else{

                
                if(state.baseLangForPreloading[wordKey]){
                    //                     
                    if(!placeholder){
                        // -----------------
                        const shuffleText = (chars) =>{
                            //- no shuffle active
                            return chars
                            if(chars){
                                const shuffledCharacters = chars.split('').slice();
                                for (let i = 0; i < chars.split('').slice().length; i++) {
                                    const randomIndex = Math.floor(Math.random() * shuffledCharacters.length);
                                    const temp = shuffledCharacters[i];
                                    shuffledCharacters[i] = shuffledCharacters[randomIndex];
                                    shuffledCharacters[randomIndex] = temp;
                                }
                                return shuffledCharacters.join('');
                            }
                        }
                        const timer = setInterval(() => {
                            document.querySelectorAll(".text-pre-loading").forEach((t)=>{
                                t.innerHTML = shuffleText(t.innerHTML);
                            })
                        }, 200)
                        setTimeout(()=>{clearInterval(timer)}, 5000)
                        // -----------------
                        return "<span class='text-pre-loading'>" + state.baseLangForPreloading[wordKey] + "</span>"
                    }else{
                        return "..."
                    }
                    // 
                }

            }
        },
    },
    actions: {
        async set(val) {
            this[val.key] = val.value
        },
        async pushItem(val) {
            // console.log(this[val.key], val.value)
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
        async LoadTranslationAPI(val){

            // set as loading
            this.langLoaded = false;
            this.lang = {};

            // check if it's the first run
            if(val == 'en' && !this.langLoadedFirstRun){
                this.langLoadedFirstRun = true;
                let baseLang = JSONen;
                this.baseLangForPreloading = baseLang;
            }

            // apply the lang w/ a delay (on purprose)
            setTimeout(()=>{
                let r;
                if(val == 'en') r = JSONen;
                if(val == 'pt_br') r = JSONpt_br;
                if(val == 'jp') r = JSONjp;
                if(val == 'it') r = JSONit;
                if(val == 'ru') r = JSONru;
                if(val == 'es') r = JSONes;
                if(val == 'fr') r = JSONfr;
                this.lang = r;
                this.selectedLang = val;
                this.langLoaded = true;
                this.baseLangForPreloading = r;

                // debug
                // console.log(val, this.selectedLang, this.lang,)
            }, 3000)

            return;

                
            //  -----------------------
            let url = 'assets/lang'; //'https://api.dittowords.com';
            let params = '/' + val + '.json'; //"/v1/components?format=flat&variant=" + val + "&includeRichText=true";
            let myHeaders = new Headers();
                // myHeaders.append("Authorization", "token 63445dc3-dab4-4f1d-879d-b7d23a8bc60d.6a8b80b981feecfa40149f4a04aba82c7a3d5721");
                // myHeaders.append("Access-Control-Allow-Origin", "*");

            // if (location.host.indexOf('localhost') != -1) {
            //     url = 'assets/lang';
            //     params = '/' + val + '.json';
            // }

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            //  -----------------------
            fetch(url + params, requestOptions)
                .then(response => response.text())
                .then(result => {
                    
                    if(val == 'en' && !this.langLoadedFirstRun){
                        this.langLoadedFirstRun = true;
                        let baseLang = JSON.parse(result);
                        this.baseLangForPreloading = baseLang;
                    }
                    
                    setTimeout(()=>{
                        let r = JSON.parse(result);
                        this.lang = r;
                        this.selectedLang = val;
                        this.langLoaded = true;
                        this.baseLangForPreloading = JSON.parse(result);
                    }, 3000)
                    
                }
            )
            .catch(error => console.log('error', error));
            //  -----------------------


        },

    },
})