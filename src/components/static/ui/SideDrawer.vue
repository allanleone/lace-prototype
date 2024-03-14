<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import Input from '../ui/Input.vue'
import Toggle from '../ui/Toggle.vue';
import QR from './QR.vue';
import Card from '../../3d/Card.vue';
export default {
    data() {
        return {
            router: useRouter().currentRoute.value.name,
            route: useRouter(),
            //address book
            addressBookName: "",
            addressBookWalletAddress: "",
            addressBookEditing: false,
            addressBookEditingTemporaryFields: {name: null, wallet: null},
            typeOfChain: null,
            animationChainDone: true,
            insertNetworkURLSettings: "",
            sendToThisAddress: "",
            sendToThisAddressImg: null,
            globalSendFocusedAddress: false,
            netSelection: 1,
            sendNotes: "",
            confirmPassword: "",
            confirmPasswordSwap: "",
            loadingTransfer: false,
            transactionCostsSwap: false,
            gasGeeSwap: false,
            copyInProgress: false,
            statustDustToken: 0,
            activityDesign: {
                showIcon: true,
                grid: "2fr auto",
                // columns: ['', ''],
                template: 'activity',
            },
            globalSendAssets: [
                // {
                //     name: "ADA",
                //     address: "ADA",
                //     balance: this.store.get("tokens")[0].balance,
                //     amount: "0.00",
                //     cost: 0.254,
                //     thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
                //     ico: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
                //     type: "token",
                //     hotSwap: false,
                // },
                {
                    name: "Midnight",
                    address: "tDUST",
                    balance: this.store.get("tokens")[0].balance,
                    amount: "0.00",
                    cost: 0.254,
                    thumb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEVHcEwKCgoKCgoKCgoJCQkKCgoKCgoAAACCgoK6urrV1dWdnZ3////19fXi4uJycnJAQEB3i5UhAAAAB3RSTlMAJ670/69kVAZOWwAAALRJREFUeAF9koEOxRAMRQtWaGf//7Wved22Jg03iYsDWgWAEFN2SiWA6MgLHbIvLxWgrGGE7z689d0LhtXWe6uGwosGETFLM14MDzvpnCia0hFqobAhhFmaIdRCHMLEWsN38EBEXYxzoh6D+MFKOsusa6ga2Aj/fl3q1AzsjOpdnfseumMz3kbNPUhlHmRCUblQTNzPwKcvi1z69olff9n6s/dlEvNSZVua26IWhZI8SVH2/QBN5xEZL7QIwgAAAABJRU5ErkJggg==",
                    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEVHcEwKCgoKCgoKCgoJCQkKCgoKCgoAAACCgoK6urrV1dWdnZ3////19fXi4uJycnJAQEB3i5UhAAAAB3RSTlMAJ670/69kVAZOWwAAALRJREFUeAF9koEOxRAMRQtWaGf//7Wved22Jg03iYsDWgWAEFN2SiWA6MgLHbIvLxWgrGGE7z689d0LhtXWe6uGwosGETFLM14MDzvpnCia0hFqobAhhFmaIdRCHMLEWsN38EBEXYxzoh6D+MFKOsusa6ga2Aj/fl3q1AzsjOpdnfseumMz3kbNPUhlHmRCUblQTNzPwKcvi1z69olff9n6s/dlEvNSZVua26IWhZI8SVH2/QBN5xEZL7QIwgAAAABJRU5ErkJggg==",
                    type: "token",
                    hotSwap: false,
                },
                // {
                //     name: "MATIC",
                //     balance: 3000,
                //     amount: 0,
                //     cost: 150,
                //     ico: "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
                // },
            ],
            selectTokenSend: 1,
            selectedTokens: [],
            copyingProcess: false,
            transferProcess: false,
            copied: "",
            //////////////
            
        }
    },
    props: {
        store: Object,
    },
    components: {
        Input,
        QR,
        Input,
        Toggle,
        Card,
    },
    methods: {
        tokenDetailsTrade(d) {
            let r = this.route.push("trading");
            this.store.set({ key: 'storedTrading', value: d })
            this.close()
            setTimeout(() => {
                this.$forceUpdate();
            }, 1000);
        },
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        convertTimestap(d) {
            const timestamp = d;
            const dateObj = new Date(timestamp);

            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            return dateObj.toLocaleTimeString(undefined, options).toUpperCase();
        },
        dollarNumberFormat(number) {
            return "" + number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        },
        standardNumberFormat(number) {
            return "" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        tokenPriceNumberFormat(number) {
            return "" + number.toFixed(4);
        },
        percentageNumberFormat(number) {
            return "" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        tokenNumberFormat(number) {
            function toFixedIfNecessary(value, dp) {
                return +parseFloat(value).toFixed(dp);
            }
            return "" + toFixedIfNecessary(number);
        },
        close(){
             this.store.set({ key: 'sidedrawerVisible', value: false })

            // Work on this later 👍🏻
            //  window.localStorage.setItem("prototypeSaveFile", JSON.stringify(this.store.get("addressBookContacts")))

        },
        // Address Book
        addressBookAddContact(){
            this.store.pushItem({ key: 'addressBookContacts', value: {name: this.addressBookName , wallet: this.addressBookWalletAddress } })
            this.close()
        },
        addressBookEditContact(){
            this.addressBookEditingTemporaryFields.name = String(this.store.get('sidedrawerStorage').data.name);
            this.addressBookEditingTemporaryFields.wallet = String(this.store.get('sidedrawerStorage').data.wallet);
            this.addressBookEditing = true;
            this.checkTypeOfChain()
        },
        addressBookEditSaveContact() {
            this.addressBookEditing = false;
            this.store.get('sidedrawerStorage').data.name = this.addressBookEditingTemporaryFields.name;
            this.store.get('sidedrawerStorage').data.wallet = this.addressBookEditingTemporaryFields.wallet;
        },
        checkTypeOfChain(){
            this.typeOfChain = null;
            setTimeout(()=>{
                this.typeOfChain = 1;
                setTimeout(() => {
                    this.typeOfChain = 2;
                    // this.animationChainDone = true;
                }, 1000)
            }, 2000)
        },
        ///////////////
        // 
        // Settings
        insertNetworkURLSettingsFunc(){
            this.store.set({ key: 'settingsPage', value: 1 });
            this.close();
            this.store.pushItem({ key: 'wallets', value: 
                {
                    name: "Bitcoin",
                    type: "BTC",
                    addr: "addrajshdjashdjiah9a8sdua98sdu98asud9a8sud89asd",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
                    expanded: false,
                    netSelection: 1,
                    active: true,
                }
            })
        },
        ////////////////
        //
        // Send
        showSendAddress(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "send-address-book";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        showSendAddressDone(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "send";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        setAddressToSend(addr){
            this.sendToThisAddress = addr.wallet;
            this.sendToThisAddressImg = addr.ico;

            this.showSendAddressDone();
        },
        checkAddressBalance(){
            let r = false;
            if(this.sendToThisAddress.length < 3){
                r = "disabled"
            }
            this.globalSendAssets.forEach((g)=>{
                if(g.amount <= 0){
                    r = "disabled";
                }else{
                    this.store.get("tokens").forEach((t) => {
                        if(t.address == g.address) {
                            if(Number(g.amount) > Number(t.balance)) {
                                r = "disabled";
                            }
                        }
                    });
                }
            });
            return r;
        },
        setAddrFromAutoComplete(w){
            this.sendToThisAddress = w.wallet;
            this.sendToThisAddressImg = w.ico;
        },
        hideAutoCompleteSend(){
            setTimeout(()=>{
                this.globalSendFocusedAddress = false
            }, 500)
        },
        selectToken(ind) {
            this.selectedTokens.length = 0;
            let s = this.store.get("sidedrawerStorage");
            s.action = "send-add-asset";
            this.store.set({ key: 'sidedrawerStorage', value: s });

            //re-enable selected before or default
            this.globalSendAssets.forEach((ga) => {
                //it's already selected?
                let sel = false;
                this.selectedTokens.forEach((st) => {
                    if (st.address == ga.name) {
                        sel = true;
                    }
                })
                if (!sel) {
                    this.addAssetToSend(ga, ga.type);
                }
            })
        },
        addAssetToSend(asset, type, forced){


            if(forced) asset.clicked = true;

            let breakFn = false;

            if(asset.clicked){
                if (type == 'token') {
                    this.selectedTokens.forEach((st, i)=>{
                        if (st.address == asset.name || st.address == asset.address) {
                            this.store.get("tokens").forEach((t) => {
                                if (t.address == asset.name || t.address == asset.address) {
                                    breakFn = true;
                                    t.clicked = false;
                                    asset.clicked = false;
                                    return this.selectedTokens.splice(i, 1)
                                }
                            })
                        }
                    })
                }
                if (type == 'nft') {
                    this.selectedTokens.forEach((st, i)=>{
                        if (st.address == asset.name || st.address == asset.address || st.address == asset.label) {
                            this.store.get("nfts").forEach((n) => {
                                if (n.label == asset.name || n.label == asset.address || n.label == asset.label) {
                                    breakFn = true;
                                    n.clicked = false;
                                    asset.clicked = false;
                                    return this.selectedTokens.splice(i, 1)
                                }
                            })
                        }
                    })
                }
            }else if(!breakFn){
                if(type == 'token') {
                    asset.type="token";
                    this.store.get("tokens").forEach((t) => {
                        if (t.address == asset.name || t.address == asset.address) {
                            t.type = "token"
                            asset.type = "token"
                            t.clicked = true;
                            asset.clicked = true;
                        }
                    })
                }
                if(type == 'nft') {
                    asset.type="nft";
                    this.store.get("nfts").forEach((n) => {
                        if (n.label == asset.name || n.label == asset.label) {
                            n.type = "nft"
                            asset.type = "nft"
                            n.clicked = true;
                            asset.clicked = true;
                        }
                    })
                }
            }
            if (!breakFn){
                this.selectedTokens.push(asset);
            }
        },
        processSelectionAdd(){
            this.globalSendAssets.length = 0;
            this.selectedTokens.forEach((st)=>{
                let t = {};
                if(st.type == "nft"){
                    t = {
                        name: st.label ? st.label : st.address,
                        address: st.label ? st.label : st.address,
                        balance: st.balance,
                        amount: 1,
                        cost: st.aproxPrice,
                        ico: st.thumb,
                        thumb: st.thumb,
                        type: "nft",
                        hotSwap: false,
                    }
                }
                if(st.type == "token"){
                    t = {
                        name: st.address,
                        address: st.address,
                        balance: st.balance,
                        amount: "0.00",
                        cost: st.currentPrice,
                        ico: st.thumb,
                        thumb: st.thumb,
                        type: "token",
                        hotSwap: false,
                    }
                }
                this.globalSendAssets.push(t);
            });
            let s = this.store.get("sidedrawerStorage");
            s.action = "send";
            this.store.set({ key: 'sidedrawerStorage', value: s });
        },
        backFromTransaction() {
            let s = this.store.get("sidedrawerStorage");
            s.action = "send";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        reviewTransaction() {
            let s = this.store.get("sidedrawerStorage");
            s.action = "review-transaction-from-send";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        requestPassword() {
            let s = this.store.get("sidedrawerStorage");
            s.action = "request-password";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        sendTransaction(){
            this.loadingTransfer = true;
            setTimeout(()=>{
                this.loadingTransfer = false;
                this.transferProcess = true;
                let s = this.store.get("sidedrawerStorage");
                s.action = "request-password-2";
                this.store.set({ key: 'sidedrawerStorage', value: s })

                this.store.get("tokens").forEach((t)=>{
                    this.globalSendAssets.forEach((gsa)=>{
                        if(t.address == gsa.address){
                            t.balance = (gsa.balance - gsa.amount)
                            let currentDate = new Date();
                            this.store.get("activity").push({
                                thumb: "sent",
                                label: "Sent",
                                timestamp: currentDate,
                                bundle: [
                                    gsa.amount + " " + gsa.address,
                                ],
                                convertedTotal: t.variation,
                                status: "Success",
                                hash: "092834029384092384fh23049fjhs0wdrfu023ru0wdf",
                                network: t.network,
                                type: "transfer"
                            })
                        }
                    })
                })

                setTimeout(()=>{
                    this.transferProcess = false;
                    setTimeout(()=>{
                        // 
                        let s = this.store.get("sidedrawerStorage");
                        s.action = "request-password-3";
                        // 
                    }, 1000);
                }, 4000);
            }, 2000);
        },
        swapToken(a,st, type){

            let t;

            if(st){
                if(!st.type){
                    st.type = type;
                }
            }

            if (st.type == "nft") {
                t = {
                    name: st.label ? st.label : st.address,
                    address: st.label ? st.label : st.address,
                    balance: st.balance,
                    amount: "0.00",
                    cost: st.aproxPrice,
                    ico: st.thumb,
                    thumb: st.thumb,
                    type: "nft",
                    hotSwap: false,
                }
            }
            if (st.type == "token") {
                t = {
                    name: st.address,
                    address: st.address,
                    balance: st.balance,
                    amount: "0.00",
                    cost: st.currentPrice,
                    ico: st.thumb,
                    thumb: st.thumb,
                    type: "token",
                    hotSwap: false,
                }
            }

            this.globalSendAssets.forEach((g, i)=>{
                if(g.name == a.name){
                    this.globalSendAssets[i] = t
                }
            })
        },
        // Receive
        confirmCopy(w){

            if(!this.copyInProgress){
                this.copyInProgress = true;
                navigator.clipboard.writeText(w.addr);

                if(w.network == "CARDANO"){
                    this.copied = w.name;
                    this.copyingProcess = true;
                    setTimeout(()=>{
                        this.copyingProcess = false;
                        setTimeout(()=>{
                            this.store.increaseTokenCardano();
                        }, 10000);
                    }, 4000);
                }else if (w.network == "POLYGON") {
                    this.copied = w.name;
                    this.copyingProcess = true;
                    setTimeout(() => {
                        this.copyingProcess = false;
                        setTimeout(() => {
                            this.store.increaseTokenPolygon();
                        }, 10000);
                    }, 4000);
                }
                setTimeout(()=>{
                    this.copyInProgress = false;
                }, 10000)
            }

        },
        clipboardCopyAddressBook(w){
            this.copied = w.name;
            this.copyingProcess = true;
            setTimeout(() => {
                this.copyingProcess = false;
            }, 4000);
            navigator.clipboard.writeText(w.wallet);
        },
        checkNetworkIco(c) {
            let r = null;
            if(c){
                if(c.wallet){

                    if (c.wallet.substr(0, 2) == "0x") {
                        r = "pol"
                    } else if (c.wallet.substr(0, 2) == "ad") {
                        r = "car"
                    } else  if (c.wallet.substr(0, 2) == "bt") {
                        r = "car"
                    } else  if (c.wallet.substr(0, 1) == "$") {
                        r = "handle"
                    }
                }
            }
            return r;
        },
        reviewSwap(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "swap-confirm";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },  
        reviewSwapConfirmPassword(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "swap-done";
            this.store.set({ key: 'sidedrawerStorage', value: s })

            // console.log(this.store.get("sidedrawerStorage"))
            let d = this.store.get("sidedrawerStorage");
            this.store.activitySwapPush(d)
            // 
        },  
        closeSwap(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "swap";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },  
        buyAndSellBuy(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "swap-confirm-buy";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },  
        buyAndSellBuyDone(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "swap-confirm-buy-done";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },  
        setMockupNFTs(){
            this.close();
            this.store.nftsNested.active = true;
        },
        ////////////////
    },
    updated(){
        
        if(this.store.get("tokenSelectedFromTable")){
            this.store.set({ key: "tokenSelectedFromTable", value: false })
            if (this.store.get('sidedrawerStorage')) {
                if (this.store.get('sidedrawerStorage').selectedToken) {
                    let d = this.store.get('sidedrawerStorage').selectedToken;

                    //@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    this.selectTokenSend = 1;
                    d.clicked = true;
                    this.globalSendAssets.forEach((gt)=>{
                        gt.clicked = false;
                    })
                    this.store.get("tokens").forEach((tk)=>{
                        tk.clicked = false;
                    });
                    this.store.get("nfts").forEach((nf)=>{
                        nf.clicked = false;
                    });
                    this.swapToken(this.globalSendAssets[0], d, 'token')
                    // this.globalSendAssets = [
                    //     {
                    //         name: d.address,
                    //         address: d.address,
                    //         balance: d.balance,
                    //         amount: 1,
                    //         cost: d.currentPrice,
                    //         thumb: d.thumb,
                    //         ico: d.thumb,
                    //         type: d.type,
                    //         hotSwap: false,
                    //     }
                    // ]

                }
            }
        }

    },
    mounted(){

        this.statustDustToken = 0;

        switch(this.router){
            case "addressBook":
                // if(this.store.get("sidedrawerStorage").action == "add"){

                // }
                break;
                case "send":
                // if(this.store.get("sidedrawerStorage").action == "add"){
                    this.processSelectionAdd()
                // }
            break;
        }

        setTimeout(()=>{
            this.statustDustToken = 1;
            setTimeout(()=>{
                this.statustDustToken = 2;
                setTimeout(()=>{
                    this.statustDustToken = 3;
                }, 6000)
            }, 6000)
        }, 6000)

    },
}
</script>
<style lang="scss">
.sidedrawer{

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;

    .copy-feedback{
        position: fixed;
        bottom: 30px;
        left: calc(50% - 135px);
        width: 250px;
        background-color: var(--bgCard);
        padding: 20px;
        text-align: center;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        z-index: 9999999;
        .progress-bar{
            @keyframes progressBar{
                0%{width: 0;}
                100%{width: 100%;}
            }
            animation: progressBar 4s forwards ease-in-out;
            width: 75%;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 5px;
            background: var(--gradient);
        }
    } 
    .sidedrawer-underlay{
        cursor: pointer;
        background-color: var(--underlay);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .sidedrawer-window{

        width: calc(665px - 40px);
        background-color: var(--bgCard);
        margin: 20px;
        position: absolute;
        right: 0;
        height: calc(100% - 40px);
        border-radius: var(--radius);
        z-index: 2;
        .window-header {
            width: calc(100% - 60px);
            padding: 20px 30px;
            top: 0;
            position: absolute;
            border-bottom: solid 1px var(--bgCardHover);
            grid-template-columns: 1fr 50px;
            &.with-back-button{
                grid-template-columns: 50px 1fr 50px;
            }
            display: grid;
            .title{
                text-align: center;
                display: grid;
                place-content: center;
                font-weight: bold;
                color: var(--textColorPrimary);
            }
        }
        .window-content {
            width: calc(100% - 60px);
            height: calc(100% - 270px);
            &.with-2-buttons{
                height: calc(100% - 328px);
            }
            &.no-buttons{
                height: calc(100% - 155px);
            }
            padding: 30px;
            position: absolute;
            margin-top: 80px;
            overflow-x: hidden;
            overflow-y: scroll;
            display: grid;
            .middle{
                display: grid;
                place-self: center;
                justify-self: left;
                width: 100%;
            }
        }
        .window-footer {
            width: calc(100% - 60px);
            padding: 30px;
            bottom: 0;
            position: absolute;
            border-top: solid 1px var(--bgCardHover);
            button{
                width: 100%;
                margin: 10px auto;
            }
        }
        

        
        
        
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    @keyframes customrefreshicon {
        0%{transform: rotate(0deg);}
        100%{transform: rotate(-360deg);}
    }
    .custom-animation-arrow{
        animation: customrefreshicon 1s infinite linear;
        transform-origin: 12px 24px;
    }

    // Settings
    .settings{

        .description, .desc{
            color: var(--textColorSecondary);
        }

        .warning{
            background-color: var(--warning);
            border-radius: var(--radius);
            padding: 20px;
            display: grid;
            grid-template-columns: 40px 1fr;
            align-items: center;
            margin-top: 20px;
            svg{
                path{
                    stroke: var(--accentPurple);
                }
            }
        }

        .wallets{
            .wallet{
                display: grid;
                grid-template-rows: auto auto;
                border-radius: var(--radius);
                border: solid 1px var(--lightGrayPlus);
                margin: 20px auto;
                .data-wallet{
                    display: grid;
                    grid-template-columns: 50px 1fr auto auto auto auto;
                    gap: 10px;
                    padding: 15px;
                    align-items: center;
                }
                &.add-custom{
                    display: grid;
                    grid-template-columns: 50px 1fr auto;
                    padding: 15px;
                    align-items: center;
                    background-color: var(--lightGray);
                    cursor: pointer;
                    &:hover{
                        background-color: var(--lightGrayPlus);
                    }
                    .chain{
                        background-color: var(--bgCard);
                    }
                    .data {
                        display: grid;
                        grid-template-columns: auto;
                        span{
                            display: inline-block;
                            width: auto;
                            svg{
                                width: 18px;
                                height: auto;
                                position: absolute;
                                margin-left: 10px;
                                margin-top: -14px;
                            }
                        }
                    }
                    .chevron{
                        svg{
                            transform: rotate(-90deg) !important;
                        }
                    }
                }
                .chain{
                    display: inline-grid;
                    place-items: center;
                    width: 40px;
                    height: 40px;
                    margin-top: 0px;
                    background-color: var(--lightGrayPlus);
                    border: solid 1px var(--lightGrayPlus);
                    border-radius: 100px;
                    font-size: 12px;
                    overflow: hidden;
                    margin-right: -10px;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                .network{
                    .net{
                        display: grid;
                        grid-template-columns: 1fr;
                        align-items: center;
                        color: var(--textColorSecondary);
                        font-size: 14px;
                        padding: 10px;
                        border-radius: var(--radius);
                        border: solid 1px var(--lightGrayPlus);
                    }
                }
                .toggle-structure{
                    .toggle{
                        display: grid;
                        grid-template-columns: auto 1fr;
                    }
                    .toggle-label{
                        display: none;
                    }
                    .switch-bg{
                        padding: 3px 0;
                    }
                    .switch-toggle{
                        margin: 0;
                        margin-left: 2px;
                    }
                    .info{
                        svg{
                            display: none;
                        }
                    }
                }
                .status {
                    .sync{
                        display: grid;
                        grid-template-columns: 16px 1fr;
                        align-items: center;
                        color: var(--textColorSecondary);
                        font-size: 14px;
                        padding: 10px;
                        border-radius: var(--radius);
                        border: solid 1px var(--lightGrayPlus);
                        .stat{
                            width: 8px;
                            height: 8px;
                            background-color: var(--green);
                            border-radius: 100px;
                        }
                    }
                }
                .name{
                    font-weight: bold;
                }
                .net{
                    color: var(--textColorSecondary);
                }
                .chevron{
                    svg{
                        transition: all .25s ease-in-out;
                    }
                    &.expanded{
                        svg{
                            transform: rotate(-180deg);
                        }
                    }
                }
            }
        }
        .tabs{
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 5px;
            background-color: var(--lightGrayPlus);
            border-radius: 12px;
            margin: 20px auto 20px auto;
            width: calc(100% - 30px);

            .tab{
                padding: 15px 10px;
                border-radius: 12px;
                text-align: center;
                cursor: pointer;
                &.active{
                    background-color: var(--white);
                }
            }
        }
    }
    // !!!!!!!

    // Address Book
    .address-book{
        .spinner{
            @keyframes spinLoading{
                0%{transform: rotate(0deg)}
                100%{transform: rotate(360deg)}
            }
            svg{
                animation: spinLoading 2s linear infinite;
            }
        }
        .w-icon{
            input{
                padding-right: 60px;
                width: calc(100% - 80px);
            }
        }
        .chain-ico.input{
            width: 24px;
            position: absolute;
            right: 20px;
            top: -2px;
            img, svg{
                width: 100%;
                border-radius: 100px;
                overflow: hidden;
            }
        }
        .wallet-name{
            text-align: center;
            display: grid;
            grid-template-columns: 42px 1fr 100px;
            gap: 15px;
            align-items: center;
            // margin-top: 20px;
            margin-bottom: 20px;
            text-align: left;
            .chain-ico{
                width: 42px;
                img{
                    width: 100%;
                    border-radius: 100px;
                }
            }
        }
        .wallet-address{
            text-align: center;
            overflow-wrap: break-word;
            max-width: 310px;
            margin: 20px auto;
            color: var(--textColorSecondary)
        }
        .copy-wallet-address{
            max-width: 200px;
            margin: 10px auto 0 auto;
        }
        .address-qr{
            margin: 10px auto;
            max-width: 200px;
            position: relative;
            border: 2px solid transparent;
            color: var(--text-color-primary);
            padding: 5px;
            border-radius: var(--radius);
            background: linear-gradient(var(--bgCard), var(--bgCard)) padding-box,linear-gradient(to right, #ff92e1, #fdc300) border-box;
            .chain{
                display: grid;
                place-items: center;
                width: 50px;
                height: 50px;
                margin-top: 0px;
                background-color: var(--lightGrayPlus);
                border: solid 10px var(--bgCard);
                border-radius: 100px;
                overflow: hidden;
                font-size: 12px;
                position: absolute;
                top: calc(50% - 30px);
                left: calc(50% - 30px);
                border-radius: 100px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
        .delete{
            color: var(--hoverDataPink);
        }
    }
    // !!!!!!!
    
    // send (global)
    .send-global{
        .password{
            display: grid;
            place-content: center;
            height: calc(100% - 100px);
            // margin-top: -250px;
            input{
                min-width: 250px;
            }
            .icon-btn-recipient{
                margin-top: 44px;
            }
            .table-item{
                width: 100%;
                display: grid;
                place-content: center;
                grid-template-columns: 80px 170px;
                gap: 10px;
                position: relative;
                min-width: 550px;
                padding-top: 50px;
                text-align: left;
                span, h1,h2,h3,h4,h5,h6{
                    text-align: left;
                    justify-content: left;
                    justify-items: left;
                }
                .item{
                    display: grid;
                    place-items: center;
                    text-align: left;
                    justify-content: left;
                    img{
                        width: 80px;
                        height: 80px;
                        border-radius: 100px;
                    }
                    .primary{
                        text-align: left;
                        font-weight: bold;
                    }
                    .secondary{
                        text-align: left;
                        color: var(--textColorSecondary);
                    }
                    .red{
                        color: var(--orange);
                    }
                }
            }
        }

        .recipient-address{
            position: relative;
            .ico-net{
                position: absolute;
                width: 24px;
                height: 24px;
                background-size: cover;
                top: -2px;
                right: 65px;
                overflow: hidden;
                border-radius: 100px;
                img{
                    width: 100%;
                    border-radius: 100px;
                }
            }
            .icon-btn-recipient{
                position: absolute;
                display: grid;
                width: 50px;
                height: 50px;
                right: 5px;
                top: -16px;
                background: var(--bgCard);
                place-content: center;
                border-radius: calc(var(--radius) / 2);
                cursor: pointer;
                svg{
                    width: 75%;
                    margin: auto;
                }
            }
            input{
                padding-right: 100px;
                width: calc(100% - 120px);
            }
            input.empty{
                transition: border-radius .5s ease-in-out;
                &:focus{
                    border-radius: var(--radius) var(--radius) 0 0;
                }
            }
        }
        .add-note{
            position: relative;
            .icon-btn-recipient{
                position: absolute;
                display: grid;
                width: 50px;
                height: 50px;
                right: 5px;
                top: -16px;
                background: var(--bgCard);
                place-content: center;
                border-radius: calc(var(--radius) / 2);
                svg{
                    width: 75%;
                    margin: auto;
                    path{
                        stroke: var(--textColorPrimary);
                    }
                }
            }
        }
        .address-transfer{
            background-color: var(--lightGray);
            border-radius: var(--radius);
            padding: 30px;
            hr{
                opacity: .1;
            }
            .item{
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto;
                padding: 10px 0;
                border-bottom: solid 1px var(--lightGrayPlus);
                &:last-child{
                    border-bottom: none;
                }
                .coin{
                    display: grid;
                    align-content: center;
                    padding: 10px;
                    cursor: pointer;
                    &:hover{
                        background-color: var(--bgCard);
                        border-radius: var(--radius);
                    }
                    &.active{
                        background-color: var(--bgCard);
                        border-radius: var(--radius) var(--radius) 0 0;
                    }
                    .name{
                        font-size: 18px;
                        font-weight: bold;
                        align-items: center;
                        .name-long{
                            padding-left: 30px;
                        }
                        .ico{
                            margin: auto;
                            padding: 0px;
                            margin-right: 10px;
                            margin-top: 2px;
                            position: absolute;
                            width: 24px;
                            height: 24px;
                            background-size: cover;
                            border-radius: 100px;
                            overflow: hidden;
                            background-position: center center;
                            &.nft{
                                background-size: 120% !important;
                                border-radius: 5px !important;
                            }
                            img{
                                // height: auto;
                            }
                        }
                        .chevron{
                            display: inline-grid;
                            place-content: center;
                            padding: 3px 10px;
                            width: auto;
                            svg{
                                transition: transform .5s ease-in-out;
                                path{
                                    stroke: var(--textColorPrimary);
                                }
                            }
                            &.expanded{
                                svg{
                                    transform: rotate(90deg);
                                }
                            }
                        }
                    }
                    .balance{
                        color: var(--textColorSecondary);
                        font-size: 14px;
                        padding: 5px 0;
                    }
                }
                .modal-clickable{
                    grid-column: 1;
                    width: calc(200% - 40px);
                    max-height: 800px;
                    background-color: var(--white);
                    overflow-y: scroll;
                    overflow-x: hidden;
                    display: grid;
                    position: relative;
                    padding: 20px;
                    border-radius: var(--radius);
                    margin-top: -10px;
                    .list-item-tkn{
                        &:before{
                            content: 'Select';
                            font-size: 12px;
                            width: auto;
                            height: auto;
                            padding: 10px;
                            top: 23px !important;
                            left: auto;
                            right: 20px;
                            opacity: 1 !important;
                            background-color: var(--green) !important;
                        }
                    }
                    .list-item-tkn.selected{
                        opacity: .25;
                        &:before{
                            content: 'Added';
                            font-size: 12px;
                            width: auto;
                            height: auto;
                            padding: 10px;
                            top: 23px !important;
                            left: auto;
                            right: 20px;
                            background-color: var(--midGray) !important;
                            // display: none;
                        }
                        border-color: transparent !important;
                        background-color: transparent !important;
                    }
                    .list-nfts{
                        
                        .nft-card{
                            &.selected{
                                &:before{
                                    content: 'Added';
                                    font-size: 12px;
                                    width: auto;
                                    height: auto;
                                    padding: 10px;
                                    left: auto;
                                    top: calc(50% - 20px);
                                    right: calc(50% - 30px);
                                    background-color: var(--midGray) !important;
                                    display: grid;
                                }
                                border: solid 1px var(--lightGrayPlus);
                            }
                            &:before{
                                content: 'Select';
                                font-size: 12px;
                                width: auto;
                                height: auto;
                                padding: 10px;
                                left: auto;
                                top: calc(50% - 20px);
                                right: calc(50% - 30px);
                                background-color: var(--green) !important;
                                display: none;
                                opacity: 0;
                            }
                        }
                    }
                    .amount{
                        opacity: 0;
                    }
                    .conversion{
                        opacity: 0;
                    }
                }
                .value{
                    .amount{
                        input{
                            width: 100% !important;
                            font-size: 20px !important;
                            text-align: right !important;
                            margin: 0 !important;
                            padding: 5px !important;
                            border-radius: 0px;
                        }
                    }
                }
                .cost-usd{
                    text-align: right;
                    color: var(--textColorSecondary);
                    font-size: 14px;
                    padding: 5px 0;
                }
            }
            button{
                width: 100%;
                margin: 20px 0 0px 0;
                text-align: center;
                border-color: var(--lightGray);
                color: var(--textColorSecondary);
                .ico{
                    margin-right: 10px;
                }
            }
        }
        .button-bundle{
            width: 100%;
            margin: 20px 0 0px 0;
            text-align: center;
            border-color: var(--lightGray);
            color: var(--textColorPrimary);
            .ico{
                margin-right: 10px;
            }
        }
        .center{
            margin: 20px auto;
            color: var(--textColorSecondary);
        }
        .cost-breakdown{
            display: grid;
            grid-template-columns: 1fr 30px;
            h5{
                font-weight: bold;
            }
            .amount{
                color: var(--textColorSecondary);
                font-size: 16px;
                font-weight: normal;
            }
            .chevron{
                border: solid 1px var(--lightGrayPlus);
                width: 32px;
                height: 32px;
                border-radius: 10px;
                display: grid;
                place-content: center;
                svg{
                    width: 80%;
                    transform: rotate(90deg);
                    transition: transform .5s ease-in-out;
                }
                &.expanded{
                    svg{
                        transform: rotate(-90deg);
                    }
                }
            }
        }
        .ico-cost{
            margin: auto;
            padding: 0px; 
            margin-right: 10px;
            margin-top: -2px;
            // position: absolute;
            width: 24px;
            height: 24px;
            background-size: cover;
            border-radius: 100px;
            overflow: hidden;
            background-position: center center;
            &.nft{
                background-size: 120% !important;
                border-radius: 5px !important;
            }
        }
        .expanded-list{
            .items-list{
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 10px 0;
                align-items: center; 
                .detail{
                    display: grid;
                    grid-template-columns: 30px 1fr;
                    .label{
                        display: inline-grid;
                    }
                    .info{
                        width: 24px;
                        height: 24px;
                        border-radius: 100px;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                        svg{
                            width: 80%;
                        }
                    }
                    .info-detail{
                        width: 24px;
                        height: 24px;
                        border-radius: 100px;
                        overflow: hidden;
                        display: inline-grid;
                        position: absolute;
                        margin-left: 10px;
                        img{
                            width: 100%;
                        }
                        svg{
                            width: 80%;
                        }
                    }
                }
                .amount{
                    text-align: right;
                    .converted{
                        font-size: 14px;
                        color: var(--textColorSecondary);
                    }
                }
            }

        }
        .select-address-book{
            label{
                position: relative;
                .ico{
                    position: absolute;
                    top: 0px;
                    left: 20px;
                }
                input{
                    padding-left: 50px;
                }
            }
        }
        .search-by-id{
            width: calc(100% - 70px);
        }
        .list-address{
            clear: both;
            .list-item-addr{
                grid-template-columns: 50px .5fr .5fr;
                display: grid;
                align-items: center;
                padding: 20px;
                margin: 10px -0px;
                cursor: pointer;
                &:hover{
                    background-color: var(--lightGray);
                    border-radius: var(--radius);
                }
                .ico{
                    background-color: var(--accentPurpleTransparent);
                    width: 40px;
                    height: 40px;
                    border-radius: 100px;
                    place-content: center;
                    display: grid;
                    color: var(--accentPurple);
                    font-weight: bold;
                    text-transform: uppercase;
                }
                .name{
                    display: inline-grid;
                }
                .addr-data{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: grid;
                    align-items: center;
                    grid-template-columns: 30px 1fr;
                    .network{
                        width: 24px;
                        height: auto;
                        display: inline-grid;
                        img{
                            width: 100%;
                            border-radius: 100px;
                        }
                    }
                    .addr{
                        color: var(--textColorSecondary);
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .auto-complete-list{
            @keyframes introEmptyList{
                0%{height: 0; box-shadow: 0px 0px 0px transparent; opacity: 0;}
                100%{height: 200px; box-shadow: var(--tinyShadow); opacity: 1;}
            }
            animation: introEmptyList .5s ease-in-out forwards;
            background-color: var(--lightGray);
            border-radius: 0  0 var(--radius) var(--radius);
            height: 200px;
            overflow-y: auto;
            overflow-x: hidden;
            box-shadow: var(--tinyShadow);
            // position: absolute;
            margin-top: -20px;
            z-index: 1;
            margin-bottom: 30px;
            margin-left: 5px;
            width: calc(100% - 5px);
            border-top: solid 1px var(--lightGrayPlus);
            .label{
                padding: 10px 15px;
                color: var(--textColorSecondary);
            }
            .addr{
                display: grid;
                grid-template-columns: 1fr 30px;
                align-items: center;
                padding: 20px;
                margin: 10px;
                cursor: pointer;
                &:hover{
                    background-color: var(--lightGrayPlus);
                    border-radius: var(--radius);
                }
                .data{
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr 1fr;
                    .name, .wallet{
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .wallet{
                        color: var(--textColorSecondary);
                        font-size: 14px;
                    }
                }
                .logo{
                    img{
                        width: 24px;
                        border-radius: 100px;
                    }
                }
            }
        }
        .send-select-add-asset{
            .select-multiple{
                display: grid;
                grid-template-columns: 1fr 150px;
            }
            .tabs{
                display: grid;
                gap: 10px;
                grid-template-columns: 1fr 1fr;
                padding: 5px;
                background-color: var(--lightGrayPlus);
                border-radius: 12px;
                margin: 20px auto;
                width: calc(100% - 30px);

                .tab{
                    padding: 15px 10px;
                    border-radius: 12px;
                    text-align: center;
                    cursor: pointer;
                    &.active{
                        background-color: var(--white);
                    }
                }
            }
            label{
                position: relative;
                .ico{
                    position: absolute;
                    top: 0px;
                    left: 20px;
                }
                input{
                    padding-left: 50px;
                    margin: 0;
                }
            }
            .list-tokens {
                padding-top: 10px;
                .list-item-tkn{
                    display: grid;
                    grid-template-columns: 42px 1fr 1fr;
                    gap: 10px;
                    padding: 20px;
                    border-radius: var(--radius);
                    align-items: center;
                    margin: 5px 0;
                    border: solid 2px transparent;
                    transition: all .45s ease-in-out;
                    position: relative;
                    &:hover{
                        background: var(--lightGray);
                        cursor: pointer;
                    }
                    &:before{
                        content: '✔';
                        color: var(--white);
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        background-color: var(--green);
                        border-radius: 100px;
                        left: 10px;
                        top: 10px;
                        opacity: 0;
                        z-index: 1;
                        display: grid;
                        place-content: center;
                        transition: opacity .5s ease-in-out;
                    }
                    &.selected{
                        border: solid 2px var(--green);
                        background-color: #2CB67D11;
                        &:before{
                            opacity: 1;
                        }
                    }
                    .ico{
                        width: 42px;
                        img{ width: 100%; border-radius: 100px;}
                    }
                    .amount{
                        color: var(--textColorPrimary);
                    }
                    .balance{
                        text-align: right;
                        color: var(--textColorSecondary);
                    }

                }
            }
            .list-nfts{
                .cards-space{
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    text-align: center;
                    gap: 10px;
                    .nft-card{
                        &:before{
                            content: '✔';
                            color: var(--white);
                            position: absolute;
                            width: 24px;
                            height: 24px;
                            background-color: var(--green);
                            border-radius: 100px;
                            left: 10px;
                            top: 10px;
                            opacity: 0;
                            z-index: 1;
                            display: grid;
                            place-content: center;
                            transition: opacity .5s ease-in-out;
                        }
                        &.selected{
                            border: solid 2px var(--green);
                            background-color: #2CB67D11;
                            .nft-thumb-image{
                                transform: scale(1.1) !important;
                                border-radius: 15px !important;
                            }
                            .poster{
                                opacity: .25;
                            }
                            &:before{
                                opacity: 1;
                            }
                        }
                        width: auto;
                        height: auto;
                        position: relative;
                        margin-bottom: 60px;
                        cursor: pointer;
                        padding: 10px;
                        border-radius: var(--radius);
                        transition: background-color .25s ease-in-out;
                        .poster{
                            width: 100%;
                            aspect-ratio: 1 / 1;
                            position: relative;
                            transition: all .5s ease-in-out;
                            background: transparent;
                            border-radius: var(--radius);
                            .nft-thumb-image{
                                border-radius: var(--radius);
                                overflow: hidden;
                                box-shadow: var(--tinyShadow);
                                aspect-ratio: 1 / 1;
                                transition: background-size 1s ease-in-out;
                                width: 100%;
                                height: 100%;
                                background-color: transparent;
                                background-position: 50% 50%;
                                background-size: auto 120%;
                                background-repeat: no-repeat;
                            }
                        }
                        .nft-title{
                            margin-top: 20px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            width: calc(100% - 20px);
                            margin-left: 10px;
                            margin-right: 10px;
                            position: absolute;
                        }
                        &:hover{
                            // background-color: var(--bgCardHover);
                            z-index: 1;
                            .nft-title{
                                // white-space: normal;
                            }
                        }
                    }
                }
            }
        }
        .selection-asset{
            background-color: var(--bgCard);
            box-shadow: var(--shadow);
            position: absolute;
            bottom: 30px;
            left: calc(50% - 170px);
            width: 300px;
            padding: 20px;
            text-align: center;
            border-radius: var(--radius);
            grid-template-columns: auto 50px 1fr;
            gap: 10px;
            align-items: center;
            display: grid;
            z-index: 1;
            .counter {
                text-align: left;
            }
            .count{
                text-align: left;
            }
            .btn{
                text-align: right;
                float: right;
                margin: auto;
            }
        }
        .review-transaction{
            .desc{
                color: var(--textColorSecondary);
            }
            .details{
                padding-top: 40px;
                .item-detail{
                    margin: 20px auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    .data{
                        text-align: right;
                    }
                }
                .fees{
                    margin-top: 40px;
                    padding-top: 40px;
                    border-top: solid 1px var(--lightGrayPlus);
                }
                .addr{
                    word-wrap: break-word;
                    max-width: 275px;
                    color: var(--textColorSecondary);
                }
                .transact{
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                }
                .secondary{
                    color: var(--textColorSecondary);
                }
            }
        }
    }
    // !!!!!!!

    // Tokens
    .tokens-sidedrawer{
        .ico-thumb{
            width: 42px;
            height: 42px;
            background-size: cover;
            top: -2px;
            right: 65px;
            overflow: hidden;
            border-radius: 100px;
        }
        .token-details{
            grid-template-columns: 42px 1fr auto;
            display: grid;
            align-items: center;
            gap: 20px;
            width: calc(100% - 00px);
            .token-desc{
                .name{
                    font-weight: bold;
                    font-size: 24px;
                    padding-right: 10x;
                }
            }
            .network-ico{
                border-radius: 100px;
                background-color: var(--bgCardHover);
                grid-template-columns: 32px 1fr;
                display: grid;
                gap: 10px;
                padding: 10px;
                align-items: center;
                .ico-thumb{
                    width: 32px;
                    height: 32px;
                }
            }
        }
        .chart {
            margin: 30px auto;
            position: relative;
            img{
                width: calc(100% - 0px);
            }
            .value{

            }
            .variation{
                position: absolute;
                background-color: var(--white);
                z-index: 1;
                top: 10px;
                right: 10px;
                width: 100px;
                padding: 10px;
                text-align: right;
                &.positive{
                    color: var(--green);
                }
                &.negative{
                    color: var(--orange);
                }
            }
            .value{
                position: absolute;
                background-color: var(--white);
                z-index: 1;
                top: 10px;
                left: 10px;
                width: 100px;
                padding: 10px;
                text-align: left;
                &.positive{
                    color: var(--green);
                }
                &.negative{
                    color: var(--orange);
                }
            }
        }
        .token-balance{
            .label{
                span{
                    display: inline-grid;
                }
                // display: grid;
                align-items: center;
            }
            .icon-info{
                width: 10px;
                svg, img{
                    width: 100% !important;
                }
            }
            .balance{
                display: grid;
                align-items: center;
                grid-template-columns: 1fr 140px;
                font-weight: bold;
                font-size: 42px;
                .amount{
                    .value{ font-size: 42px; }
                    .name, .converted{font-size: 16px; color: var(--textColorSecondary);}
                }
                .button-trade{
                    button{
                        width: 100%;
                    }
                }
            }
        }
        .activity-list{
            padding: 30px 0;
            margin: 30px 0;
            border-top: solid 1px var(--lightGrayPlus);
            border-bottom: solid 1px var(--lightGrayPlus);
            .recent{
                display: grid;
                align-items: center;
                grid-template-columns: 1fr auto;
            }
        }
        .token-info{
            padding: 30px 0;
            .info-col {
                display: grid;
                grid-template-columns: 50% 50%;
                padding: 20px 0;
                .label{
                    font-weight: bold;
                    color: var(--textColorPrimary);
                }
                .addr{
                    color: var(--textColorSecondary);
                    word-break: break-all;
                }
            }
        }
        .table-body{
            .thumb{
                width: 48px;
                height: 48px;
                span{
                    display: grid;
                }
                span, svg{
                    width: 100%;
                    height: auto;
                }
            }
            .details{
                text-align: right;
                .primary{
                    color: var(--textColorPrimary);
                }
                .secondary{
                    color: var(--textColorSecondary);
                }
            }
            display: grid;
            grid-template-columns: 48px 2fr auto;
            gap: 10px;
            padding: 20px 0;
        }
    }
    // !!!!!!

    // Receive
    .receive-global {
        dib{
            height: auto;
        }
        hr{
            opacity: .2;
            margin: 25px 0;
        }
        .wallet-title{
            display: grid;
            grid-template-columns: 32px 1fr 30px;
            gap: 10px;
            .thumb{
                display: grid;
                place-content: center;
                font-weight: 700;
                width: 32px;
                height: 32px;
                border-radius: 100px;
                background: var(--gradient);
                color: var(--white);
            }
            .name{
                align-items: center;
                display: grid;
                font-weight: bold;
            }
        }
        .addresses{
            border: solid 1px var(--lightGrayPlus);
            border-radius: var(--radius);
            padding: 20px;
            margin: 30px auto;
            position: relative;
            .title-section{
                grid-template-columns: 1fr 20px 20px;
                display: grid;
                gap: 10px;
            }
            .label{
                color: var(--textColorSecondary);
            }
            .chevron{
                width: 24px;
                height: 24px;
                border-radius: 100px;
                padding: 0px;
                place-content: center;
                display: grid;
                cursor: pointer;
                &:hover{
                    background-color: var(--lightGray);
                }
                svg{
                    width: 16px;
                    height: auto;
                }
                &.inverted{
                    svg{
                        transform: rotate(180deg);
                    }
                }
            }
            .copy{
                position: absolute;
                bottom: 20px;
                right: 20px;
                display: none;
            }
            &:hover{
                background-color: var(--lightGray);
                cursor: pointer;
                .copy{
                    display: block;
                }
            }
        }
        .qr-section{
            display: grid;
            grid-template-columns: 33% 1fr;
            gap: 20px;
            .info{
                display: grid;
                align-items: center;
                .content{
                    width: 100%;
                    // white-space: nowrap;
                    // overflow: hidden;
                    // text-overflow: ellipsis;    
                }
                .address{
                    // white-space: nowrap;
                    // overflow: hidden;
                    // text-overflow: ellipsis;    
                    // text-overflow: ellipsis;
                    color: var(--textColorSecondary);
                    width: 100%;
                    word-break: break-all;
                }
            }
            .address-qr{
                margin: 10px auto;
                max-width: 200px;
                position: relative;
                border: 2px solid transparent;
                color: var(--text-color-primary);
                padding: 5px;
                border-radius: var(--radius);
                background: linear-gradient(var(--bgCard), var(--bgCard)) padding-box,linear-gradient(to right, #ff92e1, #fdc300) border-box;
                .chain{
                    display: grid;
                    place-items: center;
                    width: 40px;
                    height: 40px;
                    margin-top: 0px;
                    background-color: var(--lightGrayPlus);
                    border: solid 10px var(--bgCard);
                    border-radius: 100px;
                    overflow: hidden;
                    font-size: 12px;
                    position: absolute;
                    top: calc(50% - 27px);
                    left: calc(50% - 27px);
                    // border-radius: 100px;
                    // overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .staking-status{
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
    // !!!!!!!

    // Activity
    .activity-sidedrawer{
        .column-activity{
            &.hash{
                .item{
                    margin: 50px auto;
                    .value{
                        text-align: right;
                        word-wrap: break-word;
                        white-space: normal;
                    }
                }
            }
            .item{
                display: grid;
                grid-template-columns: 50% 50%;
                margin: 20px auto;
                .label{
                    font-weight: bold;
                }
                .value{
                    text-align: right;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &.hashed{
                        text-align: right;
                        word-wrap: break-word;
                        white-space: normal;
                        &.main-hashed{
                            color: var(--blue);
                        }
                    }
                    .usd{
                        color: var(--textColorSecondary);
                    }
                }
            }
        }
    }

    .nfts-sidedrawer{
        .cards-space{
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            text-align: center;
            gap: 10px;
            margin: auto;
            .nft-card{
                width: auto;
                height: auto;
                position: relative;
                margin-bottom: 60px;
                cursor: pointer;
                padding: 10px;
                border-radius: var(--radius);
                transition: background-color .25s ease-in-out;
                .network{
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    border-radius: 100px;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    border: solid 2px #ffffff66;
                    img{
                        width: 100%;
                    }
                }
                &:hover{

                }
                .poster{
                    width: 75%;
                    margin: 40px auto 0px auto;
                    aspect-ratio: 1 / 1;
                    position: relative;
                    transition: all .5s ease-in-out;
                    background: transparent;
                    border-radius: var(--radius);
                    .nft-thumb-image{
                        border-radius: var(--radius);
                        overflow: hidden;
                        box-shadow: var(--tinyShadow);
                        aspect-ratio: 1 / 1;
                        transition: background-size 1s ease-in-out;
                        width: 100%;
                        height: 100%;
                        background-color: transparent;
                        background-position: 50% 50%;
                        background-size: auto 120%;
                        background-repeat: no-repeat;
                    }
                }
                .nft-title{
                    margin-top: 20px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: calc(100% - 20px);
                    margin-left: 10px;
                    margin-right: 10px;
                    position: absolute;
                }
                &:hover{
                    // background-color: var(--bgCardHover);
                    z-index: 1;
                    .nft-title{
                        // white-space: normal;
                    }
                }
            }
        }
        .nft-stats{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            .secondary{
                color: var(--textColorSecondary);
            }
        }
        .token-details{
            grid-template-columns: 1fr auto;
            display: grid;
            align-items: center;
            gap: 20px;
            width: calc(100% - 00px);
            .token-desc{
                .name{
                    font-weight: bold;
                    font-size: 24px;
                    padding-right: 10x;
                }
            }
            .network-ico{
                border-radius: 100px;
                background-color: var(--bgCardHover);
                grid-template-columns: 32px 1fr;
                display: grid;
                gap: 10px;
                padding: 10px;
                align-items: center;
                .ico-thumb{
                    width: 32px;
                    height: 32px;
                }
            }
        }
        .ico-thumb{
            width: 42px;
            height: 42px;
            background-size: cover;
            top: -2px;
            right: 65px;
            overflow: hidden;
            border-radius: 100px;
        }
        .nft-card{
            cursor: default !important;
        }
        hr{
            opacity: .15;
            margin: 50px auto;
        }
        .items{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            padding: 20px 0;
            .item{
                word-break: break-all;
            }
            // border-bottom: solid 1px var(--lightGrayPlus);
        }
    }
    // !!!!!!!!!

    // Trade
    .trading-sidedrawer{
        .tokens{
            width: 100%;
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 1fr;
            place-content: center;
            place-items: center;
            text-align: center;
            padding: 20px;
            .data{
                display: grid;
                gap: 5px;
                grid-template-columns: auto auto;
                .ico{
                    text-align: right;
                    img{
                        width: 50px;
                        height: 50px;
                    }
                    svg{
                        width: 24px;
                    }
                }
                .name{
                    text-align: left;
                }

            }
            .token{
                border-radius: var(--radius);
                background-color: var(--lightGray);
                width: calc(100% - 40px);
                height: auto;
                padding: 20px;
            }
        }
        button.white {
            border: none;
            width: 50px;
            margin: 0px auto;
        }
        .token-detail{ 
            display: grid;
            grid-template-columns: 60px 1fr 200px;
            ga: 20px;
            padding: 20px;
            align-items: center;
            .amount{
                text-align: right;
            }
            .ico{
                img{
                    width: 50px;
                    height: 50px;
                }
                svg{
                    width: 24px;
                }
            }
        }
        .details{
             margin: 20px auto;
            .item{
                .info{
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                    gap: 20px;
                    align-items: center;
                    .chevron{
                        width: 30px;
                        height: 30px;
                        transform: rotate(90deg);
                        border: solid 1px var(--lightGrayPlus);
                        display: grid;
                        place-content: center;
                        padding: 0;
                        border-radius: 10px;
                        &.opened{
                            transform: rotate(-90deg);
                        }
                    }
                }
            }
            .more-details{
                margin-top: 20px;
                .inside{
                    display: grid;
                    grid-template-columns: 1fr auto;
                    margin: 30px auto;
                    align-items: center;
                    padding: 0 0px;
                    .converted{
                        color: var(--textColorSecondary);
                    }
                }
            }
        }
        .item-gas{
            margin: 20px auto;
            .info{
                grid-template-columns: 1fr auto auto;
                display: grid;
                gap: 20px;
                align-items: center;
            }
            .chevron{
                width: 30px;
                height: 30px;
                transform: rotate(90deg);
                border: solid 1px var(--lightGrayPlus);
                display: grid;
                place-content: center;
                padding: 0;
                border-radius: 10px;
                &.opened{
                    transform: rotate(-90deg);
                }
            }
            .tabs{
                display: grid;
                gap: 10px;
                grid-template-columns: 1fr 1fr 1fr;
                padding: 5px;
                background-color: var(--lightGrayPlus);
                border-radius: 12px;
                margin: 20px auto 20px auto;
                width: calc(100% - 30px);

                .tab{
                    padding: 15px 10px;
                    border-radius: 12px;
                    text-align: center;
                    // cursor: pointer;
                    &.active{
                        background-color: var(--white);
                    }
                }
            }
        }
        .summary-done{
            text-align: center;
            display: grid;
            height: 100%;
            place-content: center;
            h3{
                font-weight: bold;
            }
            .hash{
                font-weight: bold;
                word-break: break-all;
                max-width: 300px;
                margin: 20px auto;
            }
        }
        .payments-tabs{
            height: 50px;
            margin-top: 40px;
            .payment-tab{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                height: 70px;
                gap: 20px;
                .card{
                    padding: 20px;
                    border: solid 1px var(--lightGrayPlus);
                    border-radius: var(--radius);
                    display: grid;
                    grid-template-rows: 30px 1fr;
                    &.disabled{
                        opacity: .25;
                    }
                    &.selected{
                        background-color: var(--lightGray);
                    }
                }
            }
        }
        .form-payment{
            margin-top: 75px;
            input{
                margin: 10px auto;
            }
            .split-col{
                display: grid;
                grid-template-columns: 1fr 1fr; 
                gap: 20px;
            }
        }
        .buy-sell{
            label{
                position: relative;
            }
            .ico-card{
                position: absolute;
                width: 30px;
                right: 20px;
                top: -55px;
                z-index: 1; 
                svg{
                    width: 100%;
                }
            }
            .payment-tab{
                .ico{
                    svg{
                        width: 24px;
                    }
                    &.xl{
                        border: solid 2px var(--textColorPrimary);
                        width: 20px;
                        height: 15px;
                        border-radius: 3px;
                        padding: 2px;
                        svg{
                            width: 18px;
                        }
                    }
                }
            }
        }
    }
    // !!!!!!!!
    
}
</style>
<template lang="pug">
.sidedrawer.animated.fadeIn

    .sidedrawer-window.animated.toggleInRight.delay-0-5s
        // !

        // Settings ////////////////////////
        //- 
        span.settings(v-if="router == 'settings' && store.get('settingsPage') == 1 && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' ")
            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                 div
                    div
                        h3.bold Networks
                        .desc Select which networks you would like your wallet to operate on.
                    .tabs 
                        .tab(@click="netSelection = 1", :class="netSelection == 1 ? 'active' : ''") Mainet
                        .tab(@click="netSelection = 2", :class="netSelection == 2 ? 'active' : ''") Testnet
                        .tab(@click="netSelection = 3", :class="netSelection == 3 ? 'active' : ''") Pre-prod
                    .wallets
                        .wallet(v-for="wallet in store.get('wallets')")
                            .data-wallet
                                .chain 
                                    img(:src="wallet.icon")
                                .data 
                                    .name {{ wallet.name }}
                                    .net  {{ wallet.type }}
                                .network
                                    .net(v-if="netSelection == 1") Mainnet
                                    .net(v-if="netSelection == 2") Testnet
                                    .net(v-if="netSelection == 3") Pre-prod
                                .status 
                                    .sync 
                                        .stat
                                        span Synced
                                .toggle-structure
                                    Toggle(
                                        @click.stop="wallet.active = !wallet.active"
                                        :status="wallet.active ? true : false"
                                        labelOn=" " 
                                        labelOff=" "
                                        tooltip="Change the main theme"
                                        colorOn="var(--orange)"
                                        colorOff="var(--accentPurple)"
                                        iconSvgOn=''
                                        iconSvgOff=''
                                    )/
                                //- .chevron(:class="wallet.expanded ? 'expanded' : ''",@click="wallet.expanded = !wallet.expanded")
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 9L12 16L5 9" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            //- .tabs(v-if="wallet.expanded")
                                .tab(@click="wallet.netSelection = 1", :class="wallet.netSelection == 1 ? 'active' : ''") Mainet
                                .tab(@click="wallet.netSelection = 2", :class="wallet.netSelection == 2 ? 'active' : ''") Testnet
                                .tab(@click="wallet.netSelection = 3", :class="wallet.netSelection == 3 ? 'active' : ''") Pre-prod
                        .wallet.add-custom(@click="store.set({ key: 'settingsPage', value: 2 })")
                            .chain 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4V20M20 12L4 12" stroke="#7F5AF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .data 
                                span.name 
                                    span Add custom network 
                                    span <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .chevron
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 9L12 16L5 9" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            //- .window-footer  
                // add
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'add'"
                    @click="addressBookAddContact()"
                    :disabled="(addressBookName.length == 0 || addressBookWalletAddress == 0) || (addressBookName.length > 20) || (addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3)"
                ) Confirm
                // edit
                button.purple(
                    v-if="!addressBookEditing && store.get('sidedrawerStorage').action == 'edit'"
                    @click="addressBookEditContact()", 
                ) Send
                button.purple(
                    v-if="addressBookEditing"
                    :disabled="(addressBookEditingTemporaryFields.name.length == 0 || addressBookEditingTemporaryFields.wallet == 0) || (addressBookEditingTemporaryFields.name.length > 20) || (addressBookEditingTemporaryFields.wallet.length > 0 && addressBookEditingTemporaryFields.wallet.length < 3)"
                    @click="addressBookEditSaveContact()", 
                ) Done
                button.tertiary.delete(
                    @click="close()"
                    v-show="addressBookEditing"
                ) Delete
                button.tertiary(
                    @click="close()"
                    v-show="!addressBookEditing"
                ) Close
        //- 
        span.settings(v-if="router == 'settings' && store.get('settingsPage') == 2 && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' ")
            .window-header.with-back-button 
                .back(@click="store.set({ key: 'settingsPage', value: 1 })")
                    button.navigation
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                 
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content
                 div
                    div
                        h3.bold Custom network
                        .desc Enter the network URL you want to connect to.
                        br/
                        .desc When connecting to a custom node, Lace connects to a different backend source but functions the same as usual. By choosing this option you acknowledge you're connecting to a third-party service outside of IOGs authority.
                    .warning
                        .ico 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .label This option should only be used by advanced users who are aware of the risks.
                    .network-input
                        label
                            input(
                                type="text"
                                placeholder="Enter network URL"    
                                v-model="insertNetworkURLSettings"
                            )/                    


            .window-footer  
                button.purple(
                    v-if="store.get('settingsPage') == 2"
                    :disabled="insertNetworkURLSettings.length < 3 ? 'disabled' : false"
                    @click="insertNetworkURLSettingsFunc()"
                ) Confirm
                button.tertiary(
                    @click="close()"
                    v-show="store.get('settingsPage') == 1"
                ) Cancel
        //- 
        /////////////////////////////////////

        // Activity ////////////////////////
        span.activity-sidedrawer(v-if="store.get('sidedrawerStorage').action == 'activity' && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' ")
            //- .window-header.with-back-button
            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                
                div
                    div
                        h3.bold {{store.get('sidedrawerStorage').value.label}}
                        div Summary of your transaction
                        //- div {{store.get('sidedrawerStorage').value}}
                        //- .desc Save your favorite addressess to find then easily
                    .column-activity.hash
                        .item 
                            .label Transaction hash
                            .value.hashed.main-hashed {{store.get('sidedrawerStorage').value.hash}}
                        .item 
                            .label Network
                            .value.hashed.main-hashed
                                .network-box(style="display: flex; width: 210px; border-radius: 100px; background: #cccccccc; place-content: center; margin-left: 60px; margin-top: 0px;") 
                                    .ico(style="padding: 10px;")
                                        img(src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEVHcEwKCgoKCgoKCgoJCQkKCgoKCgoAAACCgoK6urrV1dWdnZ3////19fXi4uJycnJAQEB3i5UhAAAAB3RSTlMAJ670/69kVAZOWwAAALRJREFUeAF9koEOxRAMRQtWaGf//7Wved22Jg03iYsDWgWAEFN2SiWA6MgLHbIvLxWgrGGE7z689d0LhtXWe6uGwosGETFLM14MDzvpnCia0hFqobAhhFmaIdRCHMLEWsN38EBEXYxzoh6D+MFKOsusa6ga2Aj/fl3q1AzsjOpdnfseumMz3kbNPUhlHmRCUblQTNzPwKcvi1z69olff9n6s/dlEvNSZVua26IWhZI8SVH2/QBN5xEZL7QIwgAAAABJRU5ErkJggg==")
                                    .label(style="padding: 0px 10px; color: black;display: grid;place-content: center;") Midnight (testnet)
                    h4 Summary
                    .column-activity
                        .item 
                            .label Sent
                            .value 
                                div {{store.get('sidedrawerStorage').value.bundle[0]}}
                                .usd {{store.get('sidedrawerStorage').value.convertedTotal}} USD
                        .item 
                            .label Received
                            .value 
                                div {{store.get('sidedrawerStorage').value.bundle[0]}}
                                .usd {{store.get('sidedrawerStorage').value.convertedTotal}} USD
                        .item 
                            .label From
                            .value.hashed 
                                div {{store.get('sidedrawerStorage').value.hash}}
                        .item 
                            .label Status
                            .value  {{store.get('sidedrawerStorage').value.status}}
                        .item 
                            .label Timestamp
                            .value  {{store.get('sidedrawerStorage').value.timestamp}}
                    //- div
                        label
                            input(type="text", placeholder="Name", v-model="addressBookName", autocomplete="off")/
                            .error-feedback(v-if="addressBookName.length > 20")
                                div.animated.fadeInDown Max 20 characters
                        //- label
                        //-     input(type="text", placeholder="Address", v-model="addressBookWalletAddress", autocomplete="off")/
                        //-     .error-feedback(v-if="addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3")
                        //-         div.animated.fadeInDown Incorrect Cardano address or Alias
                        label.w-icon
                            input(
                                type="text", 
                                placeholder="Address", v-model="addressBookWalletAddress", 
                                autocomplete="off"
                                @keyup="checkTypeOfChain()"
                            )/
                            .error-feedback(v-if="addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3")
                                div.animated.fadeInDown Incorrect Cardano address or Alias
                            .chain-ico.input(v-if="addressBookWalletAddress.length > 0")
                                .spinner(v-if="typeOfChain == null && addressBookWalletAddress.length > 2")
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.1491 2.5 14.0871 3.40394 15.4545 4.85236" stroke="#6F7786" stroke-width="2" stroke-linecap="round"/></svg>
                                .checked(v-if="typeOfChain == 1 && addressBookWalletAddress.length > 2")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .error(v-if="addressBookWalletAddress.length < 3")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#E84D66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                img.animated.zoomIn(v-if="typeOfChain == 2 && addressBookWalletAddress.length > 2", src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")

        ////////////////////////////////////

        // Address Book ////////////////////
        span.address-book(v-if="router == 'addressBook' && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' ")
            //- .window-header.with-back-button
            .window-header
                //- .back
                //-     button.navigation
                //-         span
                //-             .icon
                //-                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-2-buttons
                
                // !
                // ADD
                div(v-if="store.get('sidedrawerStorage').action == 'add'")
                    div
                        h3.bold Add new address
                        //- .desc Save your favorite addressess to find then easily
                    div
                        label
                            input(type="text", placeholder="Name", v-model="addressBookName", autocomplete="off")/
                            .error-feedback(v-if="addressBookName.length > 20")
                                div.animated.fadeInDown Max 20 characters
                        //- label
                        //-     input(type="text", placeholder="Address", v-model="addressBookWalletAddress", autocomplete="off")/
                        //-     .error-feedback(v-if="addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3")
                        //-         div.animated.fadeInDown Incorrect Cardano address or Alias
                        label.w-icon
                            input(
                                type="text", 
                                placeholder="Address", v-model="addressBookWalletAddress", 
                                autocomplete="off"
                                @keyup="checkTypeOfChain()"
                            )/
                            .error-feedback(v-if="addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3")
                                div.animated.fadeInDown Incorrect Cardano address or Alias
                            .chain-ico.input(v-if="addressBookWalletAddress.length > 0")
                                .spinner(v-if="typeOfChain == null && addressBookWalletAddress.length > 2")
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.1491 2.5 14.0871 3.40394 15.4545 4.85236" stroke="#6F7786" stroke-width="2" stroke-linecap="round"/></svg>
                                .checked(v-if="typeOfChain == 1 && addressBookWalletAddress.length > 2")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .error(v-if="addressBookWalletAddress.length < 3")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#E84D66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                img.animated.zoomIn(v-if="typeOfChain == 2 && addressBookWalletAddress.length > 2", src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                // !

                // !
                // EDIT
                div(v-if="store.get('sidedrawerStorage').action == 'edit'", :class="addressBookEditing ? '' : 'middle'")
                    div(v-if="addressBookEditing")
                        h3.bold Edit Contact
                        //- .desc edit or delete this contact details
                    div(v-if="addressBookEditing")
                        label
                            input(type="text", placeholder="Name", v-model="addressBookEditingTemporaryFields.name", autocomplete="off")/
                            .error-feedback(v-if="addressBookEditingTemporaryFields.name.length > 20")
                                div.animated.fadeInDown Max 20 characters
                        label.w-icon
                            input(
                                type="text", 
                                placeholder="Address", v-model="addressBookEditingTemporaryFields.wallet", 
                                autocomplete="off"
                                @keyup="checkTypeOfChain()"
                            )/
                            .error-feedback(v-if="addressBookEditingTemporaryFields.wallet.length > 0 && addressBookEditingTemporaryFields.wallet.length < 3")
                                div.animated.fadeInDown Incorrect Cardano address or Alias
                            .chain-ico.input(v-if="addressBookEditingTemporaryFields.wallet.length > 0")
                                .spinner(v-if="typeOfChain == null && addressBookEditingTemporaryFields.wallet.length > 2")
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.1491 2.5 14.0871 3.40394 15.4545 4.85236" stroke="#6F7786" stroke-width="2" stroke-linecap="round"/></svg>
                                .checked(v-if="typeOfChain == 1 && addressBookEditingTemporaryFields.wallet.length > 2")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .error(v-if="addressBookEditingTemporaryFields.wallet.length < 3")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#E84D66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                //- img.animated.zoomIn(v-if="typeOfChain == 2 && addressBookEditingTemporaryFields.wallet.length > 2", src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                                span.animated.zoomIn(v-if="typeOfChain == 2 && addressBookEditingTemporaryFields.wallet.length > 2")
                                    //- cardano
                                    //- span {{store.get('sidedrawerStorage')}}
                                    img(
                                        v-if="checkNetworkIco(addressBookEditingTemporaryFields) == 'car'"
                                        src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png"
                                    )
                                    //- polygon
                                    img(
                                        v-if="checkNetworkIco(addressBookEditingTemporaryFields) == 'pol'"
                                        src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png")
                                    //- handle
                                    img(
                                        v-if="checkNetworkIco(addressBookEditingTemporaryFields) == 'handle'"
                                        src="data:image/jpeg;base64,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")
                                    //- bitcoin
                                    img(
                                        v-if="checkNetworkIco(addressBookEditingTemporaryFields) == 'bt'"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png")
                                    //- not detected
                                    span(v-if="checkNetworkIco(addressBookEditingTemporaryFields) == null") ?

                    .middle.address-book(v-if="!addressBookEditing")
                        .wallet-name 
                            .chain-ico
                                //- img(src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                                //- cardano
                                //- span {{store.get('sidedrawerStorage')}}
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'car'"
                                    src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png"
                                )
                                //- polygon
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'pol'"
                                    src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png")
                                //- handle
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'handle'"
                                    src="data:image/jpeg;base64,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")
                                //- bitcoin
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'bt'"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png")
                                //- not detected
                                span(v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == null") ?
                            h4.bold {{ store.get('sidedrawerStorage').data.name }}
                            button.tertiary(@click="addressBookEditContact()") Edit
                        .address-qr
                            .chain 
                                //- img(src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                                //- cardano
                                //- span {{store.get('sidedrawerStorage')}}
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'car'"
                                    src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png"
                                )
                                //- polygon
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'pol'"
                                    src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png")
                                //- handle
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'handle'"
                                    src="data:image/jpeg;base64,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")
                                //- bitcoin
                                img(
                                    v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == 'bt'"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png")
                                //- not detected
                                span(v-if="checkNetworkIco(store.get('sidedrawerStorage').data) == null") ?
                            QR/
                        .wallet-address {{ store.get('sidedrawerStorage').data.wallet }}
                        button.tertiary.copy-wallet-address(@click="clipboardCopyAddressBook(store.get('sidedrawerStorage').data)")
                            span
                                .icon <svg width="1em" height="1em" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1V7a3 3 0 0 1 3-3h5V3a1 1 0 0 0-1-1H3Zm11 2V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1ZM7 6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Z" fill="currentColor"></path></svg>
                                .label Copy
                // !

            .window-footer  
                // add
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'add'"
                    @click="addressBookAddContact()"
                    :disabled="(addressBookName.length == 0 || addressBookWalletAddress == 0) || (addressBookName.length > 20) || (addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3)"
                ) Confirm
                // edit
                button.purple(
                    v-if="!addressBookEditing && store.get('sidedrawerStorage').action == 'edit'"
                    @click="addressBookEditContact()", 
                ) Send
                button.purple(
                    v-if="addressBookEditing"
                    :disabled="(addressBookEditingTemporaryFields.name.length == 0 || addressBookEditingTemporaryFields.wallet == 0) || (addressBookEditingTemporaryFields.name.length > 20) || (addressBookEditingTemporaryFields.wallet.length > 0 && addressBookEditingTemporaryFields.wallet.length < 3)"
                    @click="addressBookEditSaveContact()", 
                ) Done
                button.tertiary.delete(
                    @click="close()"
                    v-show="addressBookEditing"
                ) Delete
                button.tertiary(
                    @click="close()"
                    v-show="!addressBookEditing"
                ) Cancel
        ////////////////////////////////////

        // Receive //////////////////////////
        span.receive-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'receive' && store.get('sidedrawerStorage').action == 'receive' ? true : false) : false")

            .window-header
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                div
                    div
                        h3.bold Your wallet address
                        p These are all your addresses, scan QR codes or copy these to receive funds.    
                    .addresses(
                        v-for="wallets in store.get('wallets')", 
                        @click="confirmCopy(wallets)"
                        v-show="wallets ? (wallets.active == true ? true : false) : false"
                    )
                        .qr-section
                            .address-qr
                                .chain 
                                    img(:src="wallets.icon")
                                QR/
                            .info
                                .content
                                    .name.bold 
                                        span {{wallets.name}}
                                    .address {{wallets.addr}}
                            .copy
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        /////////////////////////////////////

        // Send /////////////////////////////
        //- >> default
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'send' ? true : false) : false")

            .window-header
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-2-buttons
                div
                    label.recipient-address
                        input(
                            type="text", 
                            placeholder="Recipient's address", 
                            v-model="sendToThisAddress"
                            :class="sendToThisAddress ? (sendToThisAddress.length == 0 ? 'empty' : '') : ''"
                            @focus="sendToThisAddress.length == 0 ? (globalSendFocusedAddress = true) : (globalSendFocusedAddress = false)"
                            @keyup="sendToThisAddress ? (sendToThisAddress.length == 0 ? globalSendFocusedAddress = true : globalSendFocusedAddress = false) : (globalSendFocusedAddress = false)"
                            @blur="hideAutoCompleteSend()"
                        )/
                        .icon-btn-recipient(@click="showSendAddress()")
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .ico-net(
                            v-if="sendToThisAddress.length > 3 ? true : false"
                        ) 
                            //- cardano
                            img(
                                v-if="checkNetworkIco({wallet: sendToThisAddress}) == 'car'"
                                src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png"
                            )
                            //- polygon
                            img(
                                v-if="checkNetworkIco({wallet: sendToThisAddress}) == 'pol'"
                                src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png")
                            //- handle
                            img(
                                v-if="checkNetworkIco({wallet: sendToThisAddress}) == 'handle'"
                                src="data:image/jpeg;base64,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")
                            //- bitcoin
                            img(
                                v-if="checkNetworkIco({wallet: sendToThisAddress}) == 'bt'"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png")
                            //- not detected
                            span(v-if="checkNetworkIco({wallet: sendToThisAddress}) == null") ?
                                
                        .auto-complete-list(v-if="globalSendFocusedAddress") 
                            .label Recently used 
                            .addr(
                                v-for="addr in store.get('addressBookContacts')"
                                @click.stop="setAddrFromAutoComplete(addr)"    
                            )
                                .data
                                    .name {{ addr.name }}
                                    .wallet {{ addr.wallet }}
                                .logo
                                    //- cardano
                                    img(
                                        v-if="checkNetworkIco(addr) == 'car'"
                                        src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png"
                                    )
                                    //- polygon
                                    img(
                                        v-if="checkNetworkIco(addr) == 'pol'"
                                        src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png")
                                    //- handle
                                    img(
                                        v-if="checkNetworkIco(addr) == 'handle'"
                                        src="data:image/jpeg;base64,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")
                                    //- bitcoin
                                    img(
                                        v-if="checkNetworkIco(addr) == 'bt'"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png")
                                    //- not detected
                                    span(v-if="checkNetworkIco(addr) == null") ?
                    .address-transfer
                        div
                            .item(v-for="(asset, index) in globalSendAssets")
                                .coin(@click="asset.hotSwap = !asset.hotSwap; selectTokenSend = 1;", :class="asset.hotSwap ? 'active' : ''")
                                    .name 
                                        span.ico(:class="asset.type",:style="'background-image: url(' + asset.ico + ')'")
                                            //- img(:src="asset.ico")
                                        span.name-long {{ asset.address ? (asset.address.length > 20 ? asset.address.substr(0,17) + '...' : asset.address) : '' }}
                                        span.chevron(:class="asset.hotSwap ? 'expanded' : ''")
                                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    .balance 
                                        span Balance: 
                                        span   {{ asset.balance }}
                                .value
                                    .amount(style="margin-top: 15px;")
                                        label
                                            input(
                                                type="number"
                                                v-model="asset.amount"
                                                placeholder="0.00"
                                                step=".01"
                                                min="0"
                                            )/
                                    .cost-usd 
                                        //- span ≈ {{ asset.cost }}
                                //- 
                                //- 
                                //- 
                                //- 
                                //- 
                                //- 
                                // !
                                .modal-clickable.send-select-add-asset.animated.fadeIn(v-if="asset.hotSwap")
                                    .tabs 
                                        .tab(@click="selectTokenSend = 1", :class="selectTokenSend == 1 ? 'active' : ''") Tokens 
                                        .tab(@click="selectTokenSend = 2",:class="selectTokenSend == 2 ? 'active' : ''") NFTs
                                    //- label
                                        input.search-by-id(type="text", placeholder="Search by ID or name")
                                        .ico
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>       
                                    .list-tokens(v-if="selectTokenSend == 1")
                                        .list-item-tkn(
                                            v-for="t in this.store.get('tokens')"
                                            :class="t.clicked ? 'selected' : ''"
                                            @click.stop="swapToken(asset,t)"
                                        )
                                            .ico 
                                                img(:src="t.thumb")
                                            .info 
                                                .network {{ t.label }}
                                                .name {{ t.address }}
                                            .balance 
                                                .amount {{t.balance}}
                                                .conversion {{(t.currentPrice * t.balance).toFixed(2) }} USD
                                    .list-nfts(v-if="selectTokenSend == 2")
                                        .cards-space
                                            .nft-card.animated.fadeInUp(
                                                v-for="(nft, i) in store.get('nfts')", 
                                                :class="nft.clicked ? 'selected' : ''"
                                                @click.stop="swapToken(asset, nft, 'nft')"
                                            )
                                                .poster
                                                    .nft-thumb-image(:style="'background-image: url(' + nft.thumb +')'")
                                                .nft-title {{ nft.label }}
                                                Card(:expanded="true", data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=")
                                                    //- h1(slot="header") Canyons
                                                    //- p(slot="content") Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                //- 
                                //- 
                                //- 
                                //- 
                                //- 
                                //- 
                        //- button.white(@click="selectToken();")
                            span
                                .ico 
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1V7M7.5 7V13M7.5 7H13.5M7.5 7L1.5 7" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .label Add asset
                    //- button.button-bundle
                        span
                            .ico 
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 14V20M14 17H20M6 10H8C9.10457 10 10 9.10457 10 8V6C10 4.89543 9.10457 4 8 4H6C4.89543 4 4 4.89543 4 6V8C4 9.10457 4.89543 10 6 10ZM16 10H18C19.1046 10 20 9.10457 20 8V6C20 4.89543 19.1046 4 18 4H16C14.8954 4 14 4.89543 14 6V8C14 9.10457 14.8954 10 16 10ZM6 20H8C9.10457 20 10 19.1046 10 18V16C10 14.8954 9.10457 14 8 14H6C4.89543 14 4 14.8954 4 16V18C4 19.1046 4.89543 20 6 20Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .label Add bundle
                    //- .center
                        span Click ‘Add bundle’ to send assets to another recipient in this transaction. 
                    label.add-note
                        input(type="text", placeholder="Add a note (max 160 char.)", v-model="sendNotes")/
                        .icon-btn-recipient
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.24"><path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                    .cost-breakdown
                        h5 
                            span Transaction costs
                            span.amount  2 ADA
                        .chevron.expanded
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    .expanded-list
                        .items-list(v-for="fee in globalSendAssets")
                            .detail
                                .ico-cost(:class="fee.type", :style="'background-image: url(' + 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU' + ')'") 
                                    //- img(:src="fee.ico")
                                .label-detail
                                    span Transaction fee
                                    span.info-detail
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#6F7786" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .amount
                                .cost {{ 0.20.toFixed(2) }} {{ fee.name ? (fee.name.length > 10 ? 'ADA' + '...' : 'ADA') : '' }}
                                //- .converted {{ (((fee.cost / 100) * (fee.amount + 1)) / 50).toFixed(2) }} USD

                    // info
                    .info-msg(v-if="statustDustToken == 0 || statustDustToken == 2", style="background: #fcf5e3; height: 20px; padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                        .icon.custom-animation-arrow(style="margin: -15px 10px 0 0; position: absolute;")
                            <svg width="24" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="#6750A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        span(style="padding-left: 30px;")
                            span Waiting for local node...
                    // error
                    .info-msg(v-if="statustDustToken == 1", style="background: #D9D9D9; height: 20px; padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                        .icon(style="margin: -15px 10px 0 0; position: absolute;")
                            <svg width="24" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.25 17C13.25 17.6904 12.6904 18.25 12 18.25C11.3096 18.25 10.75 17.6904 10.75 17C10.75 16.3096 11.3096 15.75 12 15.75C12.6904 15.75 13.25 16.3096 13.25 17ZM12 5.75C11.3096 5.75 10.75 6.30964 10.75 7V12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12V7C13.25 6.30964 12.6904 5.75 12 5.75Z" fill="#FF5470"/></svg>
                        span(style="padding-left: 30px;")
                            span Unable to connect to the proof server, please check your settings
                    // success
                    .info-msg(v-if="statustDustToken >= 3", style="background: #DBFFE3; height: 20px; padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                        .icon(style="margin: -15px 10px 0 0; position: absolute;")
                            <svg width="24" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.6339 10.3839C17.122 9.89573 17.122 9.10427 16.6339 8.61612C16.1457 8.12796 15.3543 8.12796 14.8661 8.61612L10.75 12.7322L9.13388 11.1161C8.64573 10.628 7.85427 10.628 7.36612 11.1161C6.87796 11.6043 6.87796 12.3957 7.36612 12.8839L9.86612 15.3839C10.3543 15.872 11.1457 15.872 11.6339 15.3839L16.6339 10.3839Z" fill="#2CB67D"/></svg>
                        span(style="padding-left: 30px;")
                            span Connected to your local proof server successfully [localhost:9786]


                    
                    .info-msg(style="background: #fcf5e3; height: auto;padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                            .icon(style="margin: 0px 10px 0 0;")
                                <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 28H12V24H11M12 20H12.01M21 24C21 28.9706 16.9706 33 12 33C7.02944 33 3 28.9706 3 24C3 19.0294 7.02944 15 12 15C16.9706 15 21 19.0294 21 24Z" stroke="#7F5AF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            span 
                                span To send DUST tokens on Midnight, you must have a local proof server installed and running to execute a transaction.&nbsp;
                                span(style="text-decoration: underline; cursor: pointer;") Learn more
            
            .window-footer  
                // review
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'send'"
                    @click="reviewTransaction()"
                    :disabled="checkAddressBalance()"
                ) Review transaction
                // edit
                button.tertiary(
                    @click="close()"
                    v-if="store.get('sidedrawerStorage').action == 'send'"
                ) Cancel
            // !

            /////////////////////////////////////
        //- >> addressess
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'send-address-book' ? true : false) : false")
        
            .window-header.with-back-button
                .back
                    button.navigation(@click="showSendAddressDone()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                
                // !

                // Default
                .select-address-book
                    h4.bold Address book
                    label
                        input.search-by-id(type="text", placeholder="Search by ID or name")
                        .ico
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>       
                    .list-address 
                        .list-item-addr(
                            v-for="addr in store.get('addressBookContacts')"
                            @click="setAddressToSend(addr)"
                        )
                            .ico 
                                span {{addr.name.substr(0,1)}} 
                            .name {{addr.name}}  
                            .addr-data
                                span.network
                                    //- cardano
                                    img(
                                        v-if="checkNetworkIco(addr) == 'car'"
                                        src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png"
                                    )
                                    //- polygon
                                    img(
                                        v-if="checkNetworkIco(addr) == 'pol'"
                                        src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png")
                                    //- handle
                                    img(
                                        v-if="checkNetworkIco(addr) == 'handle'"
                                        src="data:image/jpeg;base64,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")
                                    //- bitcoin
                                    img(
                                        v-if="checkNetworkIco(addr) == 'bt'"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png")
                                    //- not detected
                                    span(v-if="checkNetworkIco(addr) == null") ?
                                span.addr {{addr.wallet}} 
        
            .window-footer
        //- 
        //- >> add asset
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'send-add-asset' ? true : false) : false")
        
            .window-header.with-back-button
                .back
                    button.navigation(@click="showSendAddressDone()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                
                // !
                .send-select-add-asset
                    .select-multiple
                        h4.bold Select tokens or NFTs
                        //- button.white Select multiple
                    .tabs 
                        .tab(@click="selectTokenSend = 1", :class="selectTokenSend == 1 ? 'active' : ''") Tokens 
                        .tab(@click="selectTokenSend = 2",:class="selectTokenSend == 2 ? 'active' : ''") NFTs
                    label
                        input.search-by-id(type="text", placeholder="Search by ID or name")
                        .ico
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>       
                    .list-tokens(v-if="selectTokenSend == 1")
                        .list-item-tkn(
                            v-for="t in this.store.get('tokens')"
                            :class="t.clicked ? 'selected' : ''"
                            @click="addAssetToSend(t, 'token');"
                        )
                            .ico 
                                img(:src="t.thumb")
                            .info 
                                .network {{ t.label }}
                                .name {{ t.address }}
                            .balance 
                                .amount {{t.balance}}
                                .conversion {{(t.currentPrice * t.balance).toFixed(2) }} USD
                        .padding(style="height: 60px;")
                    .list-nfts(v-if="selectTokenSend == 2")
                        .cards-space
                            .nft-card.animated.fadeInUp(
                                v-for="(nft, i) in store.get('nfts')", 
                                :class="nft.clicked ? 'selected' : ''"
                                @click="addAssetToSend(nft, 'nft');"
                            )
                                .poster
                                    .nft-thumb-image(:style="'background-image: url(' + nft.thumb +')'")
                                .nft-title {{ nft.label }}
                                Card(data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=")
                                    //- h1(slot="header") Canyons
                                    //- p(slot="content") Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        .padding(style="height: 60px;")
            
            .selection-asset.animated.fadeInDown(v-if="selectedTokens.length > 0")
                .counter Selected asset(s)
                .count.bold {{ selectedTokens.length }}
                .btn 
                    button.purple(@click="processSelectionAdd()") Confirm
        //- 
        //- >> review transaction
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'review-transaction-from-send' ? true : false) : false")

            .window-header.with-back-button
                .back
                    button.navigation(@click="showSendAddressDone()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-2-buttons
                .review-transaction
                    h4.bold Transaction summary 
                    .desc Breakdown of your transaction cost.

                    .details
                        .item-detail
                            .title.bold Sending
                            .data
                                .transact(v-for="t in globalSendAssets")
                                    div {{ t.amount.toFixed(2) }} {{ t.name ? (t.name.length > 10 ? t.name.substr(0, 7) + '...' : t.name) : '' }}
                                    .secondary &nbsp;{{ (t.amount * t.cost).toFixed(2) }} USD
                        
                        .item-detail
                            .title.bold Recipient address
                            .data
                                div.addr {{ sendToThisAddress }}
                        
                        .item-detail.fees
                            .title.bold Notes
                            .data
                                .notes.secondary.addr {{ sendNotes ? (sendNotes.length > 2 ? sendNotes : 'No notes added') : 'No notes added' }}

                        .item-detail.fees
                            .title.bold Transaction fee
                            .data
                                .transact(v-for="t in globalSendAssets")
                                    div 
                                        span {{ (t.amount / 50).toFixed(2) }}  
                                        span &nbsp;{{ t.address ? (t.address.length > 10 ? t.address.substr(0, 7) + '...' : 'ADA') : '' }}
                                    //- div  {{ ((t.amount * (t.cost ? t.cost : 2)) / 50).toFixed(2) }} USD

                        // info
                        .info-msg(v-if="statustDustToken == 0 || statustDustToken == 2", style="background: #fcf5e3; height: 20px; padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                            .icon.custom-animation-arrow(style="margin: -15px 10px 0 0; position: absolute;")
                                <svg width="24" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="#6750A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            span(style="padding-left: 30px;")
                                span Waiting for local node...
                        // error
                        .info-msg(v-if="statustDustToken == 1", style="background: #D9D9D9; height: 20px; padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                            .icon(style="margin: -15px 10px 0 0; position: absolute;")
                                <svg width="24" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.25 17C13.25 17.6904 12.6904 18.25 12 18.25C11.3096 18.25 10.75 17.6904 10.75 17C10.75 16.3096 11.3096 15.75 12 15.75C12.6904 15.75 13.25 16.3096 13.25 17ZM12 5.75C11.3096 5.75 10.75 6.30964 10.75 7V12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12V7C13.25 6.30964 12.6904 5.75 12 5.75Z" fill="#FF5470"/></svg>
                            span(style="padding-left: 30px;")
                                span Unable to connect to the proof server, please check your settings
                        // success
                        .info-msg(v-if="statustDustToken >= 3", style="background: #DBFFE3; height: 20px; padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                            .icon(style="margin: -15px 10px 0 0; position: absolute;")
                                <svg width="24" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.6339 10.3839C17.122 9.89573 17.122 9.10427 16.6339 8.61612C16.1457 8.12796 15.3543 8.12796 14.8661 8.61612L10.75 12.7322L9.13388 11.1161C8.64573 10.628 7.85427 10.628 7.36612 11.1161C6.87796 11.6043 6.87796 12.3957 7.36612 12.8839L9.86612 15.3839C10.3543 15.872 11.1457 15.872 11.6339 15.3839L16.6339 10.3839Z" fill="#2CB67D"/></svg>
                            span(style="padding-left: 30px;")
                                span Connected to your local proof server successfully [localhost:9786]


                        
                        .info-msg(style="background: #fcf5e3; height: auto;padding: 20px; width: calc(100% - 40px); border-radius: 16px; display: flex; margin-top: 20px;")
                                .icon(style="margin: 0px 10px 0 0;")
                                    <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 28H12V24H11M12 20H12.01M21 24C21 28.9706 16.9706 33 12 33C7.02944 33 3 28.9706 3 24C3 19.0294 7.02944 15 12 15C16.9706 15 21 19.0294 21 24Z" stroke="#7F5AF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                span 
                                    span To send DUST tokens on Midnight, you must have a local proof server installed and running to execute a transaction.&nbsp;
                                    span(style="text-decoration: underline; cursor: pointer;") Learn more
                    
            .window-footer  
                // review
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'review-transaction-from-send'"
                    @click="requestPassword()"
                ) Confirm
                // edit
                button.tertiary(
                    @click="backFromTransaction()"
                    v-if="store.get('sidedrawerStorage').action == 'review-transaction-from-send'"
                ) Cancel
            // !
        //- >> password confirmation
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'request-password' ? true : false) : false")

            .window-header.with-back-button
                .back
                    button.navigation(@click="showSendAddressDone()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-2-buttons
                div
                    .title.animated.fadeInUp
                        h3 Transaction confirmation
                        p Please sign the transaction with your password.
                    .password.animated.fadeIn.delay-0-5s
                        label.recipient-address
                            input(v-model="confirmPassword", type="password", placeholder="Type your password")/
                            .icon-btn-recipient(@click="showSendAddress()")
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9998 12C14.9998 13.6569 13.6566 15 11.9998 15C10.3429 15 8.99976 13.6569 8.99976 12C8.99976 10.3431 10.3429 9 11.9998 9C13.6566 9 14.9998 10.3431 14.9998 12Z" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            
            .window-footer  
                // review
                button.purple(
                    @click="sendTransaction()"
                    :disabled="confirmPassword.length < 5 ? 'disabled' : false"
                )
                    span(v-if="!loadingTransfer") Confirm
                    span(v-if="loadingTransfer") Please wait...
                // edit
                button.tertiary(
                    @click="backFromTransaction()"
                    v-if="store.get('sidedrawerStorage').action == 'review-transaction-from-send' || store.get('sidedrawerStorage').action == 'request-password'"
                ) Cancel
            // !
        //- 
        //- >> password confirmation [in progress/loading]
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'request-password-2' ? true : false) : false")

            .window-header.with-back-button
                .back
                    button.navigation(@click="showSendAddressDone()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                div
                    //- .title
                        h3 Please wait...
                    .password
                        .table-item(v-for="t in globalSendAssets")
                            .item 
                                img(:src="t.thumb")
                            .item.secondary 
                                h4.primary {{t.name}}
                                span.primary Current Balance
                                span.secondary
                                    h2 
                                        number(
                                            ref="walletBalance"
                                            :from="t.balance"
                                            :to="t.balance - t.amount"
                                            :format="dollarNumberFormat"
                                            :duration="2"
                                            :delay="2"
                                            easing="Power1.easeOut"
                                        )
                                        h5.red.animated.fadeInDown
                                            div.animated.fadeOutDown.delay-4s - {{t.amount}}
            
            //- .window-footer  
                // review
                button.purple(
                    disabled="disabled"
                ) 
                    span(v-if="!loadingTransfer") Confirm
                    span (v-if="loadingTransfer") Please wait...
                // edit
                button.tertiary(
                    disabled="disabled"
                ) Cancel
            // !
        //- 
        //- Send - done
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'request-password-3' ? true : false) : false")

            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-buttons
                div(style="display: grid; place-content: center; text-align: center;")
                    .summary-done.animated.fadeIn.delay-0-5s
                        .ico
                            <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 37.3333V56L70 70M98 56C98 79.196 79.196 98 56 98C32.804 98 14 79.196 14 56C14 32.804 32.804 14 56 14C79.196 14 98 32.804 98 56Z" stroke="#FDC300" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        h3 All Done
                        .desc The transaction will complete and show in your activity soon.
                        .hash 1e2818032b182204bfa18536d07bfa5c5c6bfe7870c0cb3c1c9030ca214539d5

            .window-footer  
                // swap
                //- button.purple(
                //-     v-if="store.get('sidedrawerStorage').action == 'swap-confirm'"
                //-     :disabled="confirmPasswordSwap.length > 3 ? false : 'disabled'"
                //-     @click="reviewSwapConfirmPassword()"
                //- ) Confirm
                button.tertiary(
                    v-if="store.get('sidedrawerStorage').action == 'swap-done'"
                    @click="close()"
                ) Close
        //-
        /////////////////////////////////////

        // Tokens ///////////////////////////
        // span.tokens-sidedrawer(v-if="router == 'tokens' && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' ")
            //- .window-header.with-back-button
            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content
                
                // !
                // Overview
                div(v-if="store.get('sidedrawerStorage').action == 'token'")
                    .token-details
                        .token-ico 
                            .ico-thumb(:style="'background-image: url(' + store.get('sidedrawerStorage').value.thumb + ')'")
                        .token-desc
                            span.name {{store.get('sidedrawerStorage').value.address}}
                            span  LQ
                        .network-ico
                            .ico-thumb(:style="'background-image: url(' + store.get('sidedrawerStorage').value.thumbNetwork + ')'")
                            .name {{store.get('sidedrawerStorage').value.label}}
                    .chart 
                        img(src="data:image/png;base64,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")
                        .value
                            number(
                                ref="walletBalance"
                                :from="0"
                                :to="store.get('sidedrawerStorage').value.balance * store.get('sidedrawerStorage').value.currentPrice"
                                :format="dollarNumberFormat"
                                :duration="1"
                                :delay=".5"
                                easing="Power1.easeOut"
                            )
                            span &nbsp;USD
                        .variation(:class="store.get('sidedrawerStorage').value.variation < 0 ? 'negative' : 'positive'")
                            number(
                                ref="walletBalance"
                                :from="0"
                                :to="(store.get('sidedrawerStorage').value.variation)"
                                :format="standardNumberFormat"
                                :duration="1"
                                :delay=".5"
                                easing="Power1.easeOut"
                            )
                            span %
                    .token-balance
                        .label 
                            span Token balance 
                            span.ico-info
                                 <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4306 14H10.4353V10H9.44005M10.4353 6H10.4453M19.393 10C19.393 14.9706 15.3825 19 10.4353 19C5.48818 19 1.47772 14.9706 1.47772 10C1.47772 5.02944 5.48818 1 10.4353 1C15.3825 1 19.393 5.02944 19.393 10Z" stroke="#6F7786" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .balance
                            .amount 
                                span.value 
                                    number(
                                        ref="walletBalance"
                                        :from="0"
                                        :to="store.get('sidedrawerStorage').value.balance"
                                        :format="tokenNumberFormat"
                                        :duration="1"
                                        :delay=".5"
                                        easing="Power1.easeOut"
                                    )
                                span.name {{store.get('sidedrawerStorage').value.address}}
                            .button-trade
                                button.purple(@click.stop="tokenDetailsTrade(store.get('sidedrawerStorage').value)") Trade
                        .converted 
                            number(
                                        ref="walletBalance"
                                        :from="0"
                                        :to="(store.get('sidedrawerStorage').value.balance * store.get('sidedrawerStorage').value.currentPrice)"
                                        :format="standardNumberFormat"
                                        :duration="1"
                                        :delay=".5"
                                        easing="Power1.easeOut"
                                    ) 
                            span  USD
                    .activity-list 
                        .title
                            .recent 
                                h4.bold Recent transactions 
                                .btn
                                    button.purple-link View All 
                        //- 
                        .table-body.table-row.animated.fadeInUp(
                            v-for="(d, i) in store.get('activity')"
                            v-show="d.thumb == 'received' || d.thumb == 'sent'"
                        ) 
                            .thumb
                                span(v-if="d.thumb == 'received'")
                                    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" cx="24" cy="24" r="24" fill="#2CB67D"></circle><path d="M30.364 20.464v9.9m0 0h-9.9m9.9 0L17.636 17.636" stroke="#2CB67D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                span(v-if="d.thumb == 'delegation'")
                                    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" r="24" transform="matrix(1 0 0 -1 24 24)" fill="#2CB67D"></circle><path d="m16 33 .335.67A.75.75 0 0 1 15.25 33H16Zm16 0h.75a.75.75 0 0 1-1.085.67L32 33Zm-8 0 .335.67a.75.75 0 0 1-.67 0L24 33Zm4-2-.335-.67a.75.75 0 0 1 .67 0L28 31Zm-8 0-.335-.67a.75.75 0 0 1 .67 0L20 31Zm.75-4a.75.75 0 0 1-1.5 0h1.5ZM28 22l.53-.53a.75.75 0 0 1 0 1.06L28 22Zm-2.47 3.53a.75.75 0 1 1-1.06-1.06l1.06 1.06Zm-1.06-6a.75.75 0 1 1 1.06-1.06l-1.06 1.06ZM30 15.75H18v-1.5h12v1.5ZM16.75 17v16h-1.5V17h1.5Zm14.5 16V17h1.5v16h-1.5Zm-7.585-.67 4-2 .67 1.34-4 2-.67-1.34Zm4.67-2 4 2-.67 1.34-4-2 .67-1.34Zm-12.67 2 4-2 .67 1.34-4 2-.67-1.34Zm4.67-2 4 2-.67 1.34-4-2 .67-1.34ZM18 15.75c-.69 0-1.25.56-1.25 1.25h-1.5A2.75 2.75 0 0 1 18 14.25v1.5Zm12-1.5A2.75 2.75 0 0 1 32.75 17h-1.5c0-.69-.56-1.25-1.25-1.25v-1.5ZM19.25 27v-1h1.5v1h-1.5ZM24 21.25h4v1.5h-4v-1.5ZM19.25 26A4.75 4.75 0 0 1 24 21.25v1.5A3.25 3.25 0 0 0 20.75 26h-1.5Zm5.22-1.53 3-3 1.06 1.06-3 3-1.06-1.06Zm3-1.94-3-3 1.06-1.06 3 3-1.06 1.06Z" fill="#2CB67D"></path></svg>
                                span(v-if="d.thumb == 'sent'")
                                    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" cx="24" cy="24" r="24" fill="#2CB67D"></circle><path d="M20.465 17.636h9.9m0 0v9.9m0-9.9L17.635 30.364" stroke="#2CB67D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                span(v-if="d.thumb == 'self'")
                                    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" r="24" transform="matrix(1 0 0 -1 24 24)" fill="#2CB67D"></circle><path d="M16.75 16a.75.75 0 0 0-1.5 0h1.5ZM16 21h-.75c0 .414.336.75.75.75V21Zm15.194 2.093a.75.75 0 1 0 1.488-.186l-1.488.186ZM21 21.75a.75.75 0 0 0 0-1.5v1.5ZM31.25 32a.75.75 0 0 0 1.5 0h-1.5Zm.75-5h.75a.75.75 0 0 0-.75-.75V27Zm-5-.75a.75.75 0 0 0 0 1.5v-1.5Zm-10.194-1.343a.75.75 0 1 0-1.488.186l1.488-.186ZM15.25 16v5h1.5v-5h-1.5Zm8.75.75a7.251 7.251 0 0 1 7.194 6.343l1.488-.186A8.751 8.751 0 0 0 24 15.25v1.5Zm-6.723 4.531A7.253 7.253 0 0 1 24 16.75v-1.5a8.753 8.753 0 0 0-8.114 5.469l1.39.562ZM16 21.75h.581v-1.5H16v1.5Zm.581 0H21v-1.5h-4.419v1.5ZM32.75 32v-5h-1.5v5h1.5Zm-2.027-5.281A7.253 7.253 0 0 1 24 31.25v1.5a8.753 8.753 0 0 0 8.114-5.469l-1.39-.562ZM32 26.25h-.581v1.5H32v-1.5Zm-.581 0H27v1.5h4.419v-1.5Zm-7.419 5a7.251 7.251 0 0 1-7.194-6.343l-1.488.186A8.751 8.751 0 0 0 24 32.75v-1.5Z" fill="#2CB67D"></path></svg>
                            .info
                                .label.bold {{ d.label }}
                                .address.secondary {{ convertTimestap(d.timestamp) }}
                            .details
                                div.primary.bold
                                    span(v-for="(b, bid) in d.bundle.slice(0, 2)")
                                        span {{ b }} {{ (bid + 1) < d.bundle.length ? ', ' : '' }} {{ d.bundle.length > 2 ? '+' + (d.bundle.length - 2) : '' }}
                                div.secondary {{ d.convertedTotal }} USD
                        //- 
                    .token-info
                        .title
                            .recent 
                                h4.bold Token information
                        .info-col 
                            .label Fingerprint
                            .addr {{store.get('sidedrawerStorage').value.assetId}}
                        .info-col 
                            .label Policy ID
                            .addr {{store.get('sidedrawerStorage').value.policyId}}
                // !

            .window-footer  
                // add
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'token'"
                    @click="openSidedrawer({global: 'send', action: 'send', title: 'Send', selectedToken: store.get('sidedrawerStorage').value})"
                ) Send
        /////////////////////////////////////

        // NFTs ////////////////////////////
        span.nfts-sidedrawer(v-if="router == 'nfts' && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' && store.get('sidedrawerStorage').action == 'nft' ? true : false ")
            //- .window-header.with-back-button
            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content
                
                // !
                div
                    .token-details
                        //- span {{store.get('sidedrawerStorage').value}}
                        //- .token-ico 
                        //-     .ico-thumb(:style="'background-image: url(' + store.get('sidedrawerStorage').value.thumbNetwork + ')'")
                        .token-desc
                            span.name {{store.get('sidedrawerStorage').value.label}}
                        .network-ico
                            .ico-thumb(:style="'background-image: url(' + store.get('sidedrawerStorage').value.thumbNetwork + ')'")
                            .name {{store.get('sidedrawerStorage').value.networkName}}
                    //- 
                    //- 
                    //- 
                    //- 
                    .cards-space
                        .nft-card.animated.fadeInUp
                            .poster
                                .nft-thumb-image(:style="'background-image: url(' + store.get('sidedrawerStorage').value.thumb +')'")
                        Card(:data-image="store.get('sidedrawerStorage').value.thumb")
                    //- 
                    //- 
                    //- 
                        //- 
                    h3.bold Statistics 
                    .nft-stats
                        .stat
                            .secondary Approx. Price
                            .primary {{store.get('sidedrawerStorage').value.aproxPrice}} {{store.get('sidedrawerStorage').value.valueSign}}
                        .stat
                            .secondary Collection floor
                            .primary {{store.get('sidedrawerStorage').value.aproxPrice * 100}} {{store.get('sidedrawerStorage').value.valueSign}}
                        .stat
                            .secondary Owners
                            .primary {{store.get('sidedrawerStorage').value.owners}} {{store.get('sidedrawerStorage').value.valueSign}}
                        .stat
                            .secondary Volume
                            .primary {{store.get('sidedrawerStorage').value.volume}} {{store.get('sidedrawerStorage').value.valueSign}}
                    hr/
                    h3.bold Token Information 
                    .items
                        .item Token ID
                        .item {{store.get('sidedrawerStorage').value.assetId}} 
                    .items
                        .item Policy ID
                        .item {{store.get('sidedrawerStorage').value.policyId}} 
                    .items
                        .item Media URL
                        .item {{store.get('sidedrawerStorage').value.thumb}} 

            .window-footer  
                // add
                button.purple(
                                        @click="openSidedrawer({global: 'send', action: 'send', title: 'Send', selectedToken: store.get('sidedrawerStorage').value})"
                ) Send NFT
        //- folder
        span.nfts-sidedrawer(v-if="router == 'nfts' && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive' && store.get('sidedrawerStorage').action == 'nft-create-folder' ? true : false ")
            //- .window-header.with-back-button
            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content(style="grid-template-rows: 0px 1fr;")
                h3 Create a new folder
                div(style="display: grid; place-content: center; text-align: center;")
                    .summary-done.animated.fadeIn.delay-0-5s
                        .token-details
                            label
                                input(type="text", placeholder="Folder name", style="width: 300px;")
                        div(style="width: 300px;text-align: left; padding-left: 20px;")
                            .max(class="text-align: left;") max. 20 chars
            .window-footer  
                // add
                //- button.purple(
                //-     @click="openSidedrawer({action: 'nft-folder', title: 'NFT Folder', action: 'nft-select-items'})"
                //- ) Create
                button.purple(
                    @click="setMockupNFTs()"
                ) Create
                button.tertiary(
                    @click="close()"
                ) Cancel
                    //- 
                    //- 
                    //- 
                    //- 
        /////////////////////////////////////
        
        // Trading /////////////////////////
        //- 
        span.trading-sidedrawer(v-if="router == 'trading' && store.get('sidedrawerStorage').global !== 'send' && store.get('sidedrawerStorage').global !== 'receive'")

            //- Swap
            span.send-global(v-if="store.get('sidedrawerStorage').action == 'swap' ? true : false")

                .window-header
                    .title
                        //- span Address Book
                        span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                        span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                    .close
                        button.navigation(@click="close()")
                            span
                                .icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-content.with-buttons
                    div
                        .header
                            h3 Review swap
                            div Confirm the tokens and amounts for your trade.
                        .tokens 
                            .token(v-for="from in store.get('sidedrawerStorage').data.from")
                                .data
                                    .ico
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.21072 5.61515L14.2107 5.61515M14.2107 5.61515L11.5441 2.94849M14.2107 5.61515L11.5441 8.28182M11.5441 12.2818L3.54406 12.2818M3.54406 12.2818L6.21072 14.9485M3.54406 12.2818L6.21072 9.61515" stroke="#FF8E3C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>

                                    .name {{from.name}} / LQ rate
                                .amount
                                    span.bold {{from.amount.toFixed(2)}}
                                    span &nbsp; {{from.address}}
                            .token(v-for="to in store.get('sidedrawerStorage').data.to")
                                .data
                                    .ico
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.21143 10.457C6.93996 10.1441 6.46628 10.1105 6.15342 10.382C5.84056 10.6535 5.80701 11.1272 6.07848 11.44L7.21143 10.457ZM9.54333 7.44002C9.8148 7.75287 10.2885 7.78643 10.6013 7.51496C10.9142 7.2435 10.9478 6.76981 10.6763 6.45695L9.54333 7.44002ZM7.62739 12.2818C7.62739 12.696 7.96317 13.0318 8.37739 13.0318C8.7916 13.0318 9.12739 12.696 9.12739 12.2818L7.62739 12.2818ZM9.12739 5.61517C9.1274 5.20095 8.79162 4.86516 8.3774 4.86515C7.96319 4.86514 7.6274 5.20092 7.62739 5.61514L9.12739 5.61517ZM3.12739 8.94849C3.12739 6.04899 5.47789 3.69849 8.37739 3.69849L8.37739 2.19849C4.64947 2.19849 1.62739 5.22056 1.62739 8.94849L3.12739 8.94849ZM8.37739 3.69849C11.2769 3.69849 13.6274 6.04899 13.6274 8.94849L15.1274 8.94849C15.1274 5.22056 12.1053 2.19849 8.37739 2.19849L8.37739 3.69849ZM13.6274 8.94849C13.6274 11.848 11.2769 14.1985 8.37739 14.1985L8.37739 15.6985C12.1053 15.6985 15.1274 12.6764 15.1274 8.94849L13.6274 8.94849ZM8.37739 14.1985C5.47789 14.1985 3.12739 11.848 3.12739 8.94849L1.62739 8.94849C1.62739 12.6764 4.64947 15.6985 8.37739 15.6985L8.37739 14.1985ZM8.37739 9.69849C8.80226 9.69849 9.15298 9.81465 9.37558 9.96305C9.60342 10.1149 9.62739 10.2424 9.62739 10.2818L11.1274 10.2818C11.1274 9.58484 10.7036 9.04565 10.2076 8.71497C9.70637 8.3808 9.05709 8.19849 8.37739 8.19849L8.37739 9.69849ZM9.62739 10.2818C9.62739 10.3212 9.60342 10.4487 9.37558 10.6006C9.15298 10.749 8.80226 10.8652 8.37739 10.8652L8.37739 12.3652C9.05709 12.3652 9.70637 12.1828 10.2076 11.8487C10.7036 11.518 11.1274 10.9788 11.1274 10.2818L9.62739 10.2818ZM8.37739 10.8652C7.79209 10.8652 7.37845 10.6494 7.21143 10.457L6.07848 11.44C6.60308 12.0446 7.48212 12.3652 8.37739 12.3652L8.37739 10.8652ZM8.37739 8.19849C7.95252 8.19849 7.60179 8.08232 7.37919 7.93392C7.15134 7.78202 7.12737 7.65455 7.12737 7.61515L5.62737 7.61515C5.62737 8.31213 6.05113 8.85133 6.54715 9.182C7.04841 9.51617 7.69769 9.69849 8.37739 9.69849L8.37739 8.19849ZM9.12739 12.2818L9.12739 11.6152L7.62739 11.6152L7.62739 12.2818L9.12739 12.2818ZM9.12737 6.28183L9.12739 5.61517L7.62739 5.61514L7.62737 6.2818L9.12737 6.28183ZM8.37737 7.03182C8.96267 7.03182 9.37632 7.24754 9.54333 7.44002L10.6763 6.45695C10.1517 5.85237 9.27263 5.53182 8.37738 5.53182L8.37737 7.03182ZM7.12737 7.61515C7.12737 7.57575 7.15134 7.44827 7.37919 7.29638C7.60178 7.14798 7.95251 7.03182 8.37737 7.03182L8.37737 5.53182C7.69767 5.53182 7.04839 5.71413 6.54714 6.04831C6.05112 6.37898 5.62737 6.91818 5.62737 7.61515L7.12737 7.61515ZM9.12739 11.6152L9.12737 6.28182L7.62737 6.28182L7.62739 11.6152L9.12739 11.6152Z" fill="#FF8E3C"/></svg>
                                    .name Flat amount
                                .amount
                                    span.bold {{(to.amount * (to.currentPrice ? to.currentPrice : 1.24)).toFixed(2)}}
                                    span &nbsp; USD
                        
                        //- 
                        
                        .token-detail(v-for="from in store.get('sidedrawerStorage').data.from")
                            .ico
                                img(:src="from.thumb")/
                            .data
                                .network {{from.label}}
                                .name {{from.name}}
                            .amount
                                span.bold {{from.amount.toFixed(2)}} {{from.name}}
                        .transfer-btn 
                        button.white 
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 14L12.5 21M12.5 21L5.5 14M12.5 21L12.5 3" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .token-detail(v-for="to in store.get('sidedrawerStorage').data.to")
                            .ico
                                img(:src="to.thumb")/
                            .data
                                .network {{to.label}}
                                .name {{to.name}}
                            .amount
                                span.bold {{((store.get('sidedrawerStorage').data.from[0].amount * 1.38) - (store.get('sidedrawerStorage').data.from[0].amount)).toFixed(2)}} {{to.name}}

                        //- 


                        .details
                            .item 
                                .info
                                    .label.bold Transaction costs
                                    .amount
                                        span {{(store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice).toFixed(2)}} {{store.get('sidedrawerStorage').data.from[0].address}}
                                    .chevron(:class="transactionCostsSwap ? 'opened' : ''", @click="transactionCostsSwap = !transactionCostsSwap")
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .more-details(v-if="transactionCostsSwap")
                                    .inside 
                                        .label Transaction fee
                                        .amount
                                            .value {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 50).toFixed(2)}} {{store.get('sidedrawerStorage').data.from[0].name}}
                                            .converted {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 75).toFixed(2)}} USD
                                    .inside 
                                        .label Service fee
                                        .amount
                                            .value {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 89).toFixed(2)}} {{store.get('sidedrawerStorage').data.from[0].name}}
                                            .converted {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 96).toFixed(2)}} USD
                                    .inside 
                                        .label Liquidity provider fee
                                        .amount
                                            .value {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 95).toFixed(2)}} {{store.get('sidedrawerStorage').data.from[0].name}}
                                            .converted {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 98).toFixed(2)}} USD
                            .item-gas 
                                .info
                                    .label Gas fee
                                    .amount
                                        .amount
                                            .value {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 99).toFixed(2)}} {{store.get('sidedrawerStorage').data.from[0].name}}
                                            //- .converted {{((store.get('sidedrawerStorage').data.from[0].amount * store.get('sidedrawerStorage').data.from[0].currentPrice) / 98).toFixed(2)}} USD
                                    .chevron(:class="gasGeeSwap ? 'opened' : ''", @click="gasGeeSwap = !gasGeeSwap")
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .details(v-if="gasGeeSwap")
                                    .tabs
                                        .tab.active Cheap
                                        .tab Fast
                                        .tab Super fast
                                .padding(style="height: 0px;")

                .window-footer  
                    // swap
                    button.purple(
                        v-if="store.get('sidedrawerStorage').action == 'swap'"
                        @click="reviewSwap()"
                    ) Confirm
            //-
            //- Swap - confirm with password
            span.send-global(v-if="store.get('sidedrawerStorage').action == 'swap-confirm' ? true : false")

                .window-header
                    .title
                        //- span Address Book
                        span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                        span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                    .close
                        button.navigation(@click="close()")
                            span
                                .icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-content.with-2-buttons
                    div
                        .title.animated.fadeInUp
                            h3 Transaction confirmation
                            p Please sign the transaction with your password.
                        .password.animated.fadeIn.delay-0-5s
                            label.recipient-address
                                input(v-model="confirmPasswordSwap", type="password", placeholder="Type your password")/
                                .icon-btn-recipient
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9998 12C14.9998 13.6569 13.6566 15 11.9998 15C10.3429 15 8.99976 13.6569 8.99976 12C8.99976 10.3431 10.3429 9 11.9998 9C13.6566 9 14.9998 10.3431 14.9998 12Z" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-footer  
                    // swap
                    button.purple(
                        v-if="store.get('sidedrawerStorage').action == 'swap-confirm'"
                        :disabled="confirmPasswordSwap.length > 3 ? false : 'disabled'"
                        @click="reviewSwapConfirmPassword()"
                    ) Confirm
                    button.tertiary(
                        v-if="store.get('sidedrawerStorage').action == 'swap-confirm'"
                        @click="closeSwap()"
                    ) Close
            //-
            //- Swap -done
            span.send-global(v-if="store.get('sidedrawerStorage').action == 'swap-done' ? true : false")

                .window-header
                    .title
                        //- span Address Book
                        span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                        span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                    .close
                        button.navigation(@click="close()")
                            span
                                .icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-content.with-buttons
                    div
                        .summary-done.animated.fadeIn.delay-0-5s
                            .ico
                                <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 37.3333V56L70 70M98 56C98 79.196 79.196 98 56 98C32.804 98 14 79.196 14 56C14 32.804 32.804 14 56 14C79.196 14 98 32.804 98 56Z" stroke="#FDC300" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            h3 All Done
                            .desc The transaction will complete and show in your activity soon.
                            .hash 1e2818032b182204bfa18536d07bfa5c5c6bfe7870c0cb3c1c9030ca214539d5

                .window-footer  
                    // swap
                    //- button.purple(
                    //-     v-if="store.get('sidedrawerStorage').action == 'swap-confirm'"
                    //-     :disabled="confirmPasswordSwap.length > 3 ? false : 'disabled'"
                    //-     @click="reviewSwapConfirmPassword()"
                    //- ) Confirm
                    button.tertiary(
                        v-if="store.get('sidedrawerStorage').action == 'swap-done'"
                        @click="close()"
                    ) Close
            //-


            //---------------------

            //- Buy
            span.send-global.buy-sell(v-if="store.get('sidedrawerStorage').action == 'swap-buy-and-sell' ? true : false")

                .window-header
                    .title
                        //- span Address Book
                        span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                        span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                    .close
                        button.navigation(@click="close()")
                            span
                                .icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-content.with-buttons
                    div
                        .header
                            h3 Payment method
                            p Select a payment method to proceed
                        div
                            .payments-tabs
                                .payment-tab
                                    .card.selected
                                        .ico
                                            <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 32h-448c-35.35 0-64 28.65-64 64v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM48.13 96c0-8.838 7.164-16 16-16h447.8c8.836 0 16 7.162 16 16v32H48.13V96zM527.9 416c0 8.836-7.164 16-16 16H64.13c-8.836 0-16-7.164-16-16L48 224h480L527.9 416zM120 384h48c13.25 0 23.1-10.75 23.1-24S181.3 336 168 336h-48C106.8 336 96 346.8 96 360S106.8 384 120 384zM248 384h112c13.25 0 24-10.75 24-24c0-13.26-10.75-24-24-24h-112C234.7 336 224 346.7 224 360C224 373.3 234.7 384 248 384z"/></svg>
                                        .label Card
                                    .card.disabled
                                        .ico.xl
                                            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z"/></svg>
                                        .label Apple Pay
                                    .card.disabled
                                        .ico.xl
                                            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M105.72,215v41.25h57.1a49.66,49.66,0,0,1-21.14,32.6c-9.54,6.55-21.72,10.28-36,10.28-27.6,0-50.93-18.91-59.3-44.22a65.61,65.61,0,0,1,0-41l0,0c8.37-25.46,31.7-44.37,59.3-44.37a56.43,56.43,0,0,1,40.51,16.08L176.47,155a101.24,101.24,0,0,0-70.75-27.84,105.55,105.55,0,0,0-94.38,59.11,107.64,107.64,0,0,0,0,96.18v.15a105.41,105.41,0,0,0,94.38,59c28.47,0,52.55-9.53,70-25.91,20-18.61,31.41-46.15,31.41-78.91A133.76,133.76,0,0,0,205.38,215Zm389.41-4c-10.13-9.38-23.93-14.14-41.39-14.14-22.46,0-39.34,8.34-50.5,24.86l20.85,13.26q11.45-17,31.26-17a34.05,34.05,0,0,1,22.75,8.79A28.14,28.14,0,0,1,487.79,248v5.51c-9.1-5.07-20.55-7.75-34.64-7.75-16.44,0-29.65,3.88-39.49,11.77s-14.82,18.31-14.82,31.56a39.74,39.74,0,0,0,13.94,31.27c9.25,8.34,21,12.51,34.79,12.51,16.29,0,29.21-7.3,39-21.89h1v17.72h22.61V250C510.25,233.45,505.26,220.34,495.13,211ZM475.9,300.3a37.32,37.32,0,0,1-26.57,11.16A28.61,28.61,0,0,1,431,305.21a19.41,19.41,0,0,1-7.77-15.63c0-7,3.22-12.81,9.54-17.42s14.53-7,24.07-7C470,265,480.3,268,487.64,273.94,487.64,284.07,483.68,292.85,475.9,300.3Zm-93.65-142A55.71,55.71,0,0,0,341.74,142H279.07V328.74H302.7V253.1h39c16,0,29.5-5.36,40.51-15.93.88-.89,1.76-1.79,2.65-2.68A54.45,54.45,0,0,0,382.25,158.26Zm-16.58,62.23a30.65,30.65,0,0,1-23.34,9.68H302.7V165h39.63a32,32,0,0,1,22.6,9.23A33.18,33.18,0,0,1,365.67,220.49ZM614.31,201,577.77,292.7h-.45L539.9,201H514.21L566,320.55l-29.35,64.32H561L640,201Z"/></svg>
                                        .label Google Pay
                                    .card.disabled
                                        .ico
                                            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" fill="currentColor"/><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor"/><path d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z" fill="currentColor"/><path clip-rule="evenodd" d="M0 5C0 3.34315 1.34315 2 3 2H21C22.6569 2 24 3.34315 24 5V19C24 20.6569 22.6569 22 21 22H3C1.34315 22 0 20.6569 0 19V5ZM3 4H21C21.5523 4 22 4.44772 22 5V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V5C2 4.44772 2.44771 4 3 4Z" fill="currentColor" fill-rule="evenodd"/></svg>
                                        .label Other 
                            .form-payment 
                                label
                                    input(type="text", placeholder="Your Name", value="Lorem Ipsum")
                                label
                                    input(type="text", placeholder="Card Number", value="1234 5678 9123 4567")
                                    .ico-card
                                        <svg enable-background="new 0 0 128 128" height="128px" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="128px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M112,16H16C7.164,16,0,23.164,0,32v64c0,8.836,7.164,16,16,16h96c8.836,0,16-7.164,16-16V32    C128,23.164,120.836,16,112,16z M120,96c0,4.414-3.59,8-8,8H16c-4.412,0-8-3.586-8-8V32c0-4.414,3.588-8,8-8h96    c4.41,0,8,3.586,8,8V96z" fill="#B0BEC5"/></g></g><path d="M104,64c0,13.254-10.746,24-24,24S56,77.254,56,64s10.746-24,24-24S104,50.746,104,64z" fill="#FFA000"/><path d="M72,64c0,13.254-10.746,24-24,24S24,77.254,24,64s10.746-24,24-24S72,50.746,72,64z" fill="#D32F2F"/></svg>
                                .split-col 
                                    label
                                        input(type="text", placeholder="Expiration", value="01/2024")
                                    label
                                        input(type="text", placeholder="CVV", value="001")
                        //- input(type="text", placeholder="Country")
                        //- 

                .window-footer  
                    // swap
                    button.purple(
                        @click="buyAndSellBuy()"
                    ) Confirm
            //-
            //- Swap buy & sell - confirm with password
            span.send-global(v-if="store.get('sidedrawerStorage').action == 'swap-confirm-buy' ? true : false")

                .window-header
                    .title
                        //- span Address Book
                        span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                        span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                    .close
                        button.navigation(@click="close()")
                            span
                                .icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-content.with-2-buttons
                    div
                        .title.animated.fadeInUp
                            h3 Transaction confirmation
                            p Please sign the transaction with your password.
                        .password.animated.fadeIn.delay-0-5s
                            label.recipient-address
                                input(v-model="confirmPasswordSwap", type="password", placeholder="Type your password")/
                                .icon-btn-recipient
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9998 12C14.9998 13.6569 13.6566 15 11.9998 15C10.3429 15 8.99976 13.6569 8.99976 12C8.99976 10.3431 10.3429 9 11.9998 9C13.6566 9 14.9998 10.3431 14.9998 12Z" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-footer  
                    // swap
                    button.purple(
                        v-if="store.get('sidedrawerStorage').action == 'swap-confirm-buy'"
                        :disabled="confirmPasswordSwap.length > 3 ? false : 'disabled'"
                        @click="buyAndSellBuyDone()"
                    ) Confirm
                    button.tertiary(
                        v-if="store.get('sidedrawerStorage').action == 'swap-confirm-buy'"
                        @click="close()"
                    ) Close
            //-
             //- Swap - buy & sell - done
            span.send-global(v-if="store.get('sidedrawerStorage').action == 'swap-confirm-buy-done' ? true : false")

                .window-header
                    .title
                        //- span Address Book
                        span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                        span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                    .close
                        button.navigation(@click="close()")
                            span
                                .icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

                .window-content.with-buttons
                    div
                        .summary-done.animated.fadeIn.delay-0-5s
                            .ico
                                <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 37.3333V56L70 70M98 56C98 79.196 79.196 98 56 98C32.804 98 14 79.196 14 56C14 32.804 32.804 14 56 14C79.196 14 98 32.804 98 56Z" stroke="#FDC300" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            h3 All Done
                            .desc The transaction will complete and show in your activity soon.
                            .hash 1e2818032b182204bfa18536d07bfa5c5c6bfe7870c0cb3c1c9030ca214539d5

                .window-footer  
                    // swap
                    //- button.purple(
                    //-     v-if="store.get('sidedrawerStorage').action == 'swap-confirm'"
                    //-     :disabled="confirmPasswordSwap.length > 3 ? false : 'disabled'"
                    //-     @click="reviewSwapConfirmPassword()"
                    //- ) Confirm
                    button.tertiary(
                        v-if="store.get('sidedrawerStorage').action == 'swap-confirm-buy-done'"
                        @click="close()"
                    ) Close
            //-
        /////////////////////////////////////
        // !

    //- 

    .sidedrawer-underlay(@click="close()")

    .copy-feedback.animated.fadeInUp(v-if="copyingProcess")
        .animated.fadeOut.delay-4s
            div
                span Address of 
                span.bold  {{copied}} 
                span  Copied!
                .progress-bar

    .copy-feedback.animated.fadeInUp(v-if="transferProcess")
        .animated.fadeOut.delay-4s
            div
                span Transfer successful!
                .progress-bar

    //- 
</template>