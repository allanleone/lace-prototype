<script>

export default {
    props: {
        dataImage: String,
        expanded: Boolean,
        store: Object,
    },
    data() {
        return{
          hoverInAction: false,
        }
    },
    computed() {
        
    },
    methods: {

    },
    mounted() {

      let angle = this.store.get('tempAngle')
      let zoom = this.store.get('tempZoom')
      let parallax = this.store.get('tempParallax')
      let shadowSize = this.store.get('tempShadow')
      let shadowOpc = this.store.get('tempShadowOpc')
      let shadowBlur = this.store.get('tempShadowBlur')
        
      //////////////////////
      let logica = (e) => {

        angle = this.store.get('tempAngle')
        zoom = this.store.get('tempZoom')
        parallax = this.store.get('tempParallax')
        shadowSize = this.store.get('tempShadow')
        shadowOpc = this.store.get('tempShadowOpc')
        shadowBlur = this.store.get('tempShadowBlur')

        let rect = e.target.getBoundingClientRect();
        let x = ((rect.width / 2 - (e.clientX - rect.left)) / angle) * -1;
        let y = (-(rect.height / 2 - (e.clientY - rect.top)) / angle) * -1;
        let [xShadow, yShadow] = [(-x * 60) / shadowSize, -(-y * 60) / shadowSize];

        if(this.expanded){
          x = ((rect.width / 2 - (e.clientX - rect.left)) / 100) * -1;
          y = (-(rect.height / 2 - (e.clientY - rect.top)) / 100) * -1;
        }

        if (this.hoverInAction) {
          e.target.style.transiton = `none`;
        }
        e.target.style.boxShadow = `${xShadow}px ${yShadow}px ${shadowBlur}px rgba(150,150,150,${shadowOpc})`;
        e.target.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(${zoom})`;
        e.target.style.backgroundPosition = `calc(50% - calc(${x}% / ${parallax})) calc(50% + calc(${y}% / (${parallax} / 2)))`;
      };

      const elemento = document.querySelectorAll('.nft-card');
      
      elemento.forEach((elm) => {
        elm.querySelector(".poster").addEventListener('mouseenter', (e)=>{
          if(!this.hoverInAction){
            this.hoverInAction = true;
            elm.querySelector(".poster .nft-thumb-image").style.transition = `transform .25s ease-out, box-shadow .25s ease-out, background-position .25s ease-out`;
            elm.querySelector(".poster .nft-thumb-image").style.transform = `scale(${zoom})`;
            setTimeout(()=>{
              elm.querySelector(".poster .nft-thumb-image").style.transition = `none`;
            }, 500)
          }
        });
        elm.querySelector(".poster").addEventListener('mousemove', (e)=>{
          if (this.hoverInAction) {
            logica(e)
          }
        });
        elm.querySelector(".poster").addEventListener('mouseleave', () => {
          elm.querySelector(".poster").style.transform = `rotateX(0deg) rotateY(0deg)`;
          elm.querySelector(".poster").style.boxShadow = `0px 0px 0px transparent`;
          elm.querySelector(".poster").style.transition = `all .5s ease-in-out`;

          elm.querySelector(".poster .nft-thumb-image").style.transition = `all .5s ease-in-out`;
          elm.querySelector(".poster .nft-thumb-image").style.transform = `rotateX(0deg) rotateY(0deg)`;
          elm.querySelector(".poster .nft-thumb-image").style.boxShadow = `0px 0px 0px transparent`;
          this.hoverInAction = false;
        });
        elm.querySelector(".poster").addEventListener('mousedown', () => {
          elm.querySelector(".poster").style.transform = `rotateX(0deg) rotateY(0deg)`;
          elm.querySelector(".poster").style.boxShadow = `0px 0px 0px transparent`;
          elm.querySelector(".poster").style.transition = `all .5s ease-in-out`;

          elm.querySelector(".poster .nft-thumb-image").style.transition = `all .5s ease-in-out`;
          elm.querySelector(".poster .nft-thumb-image").style.transform = `rotateX(0deg) rotateY(0deg)`;
          elm.querySelector(".poster .nft-thumb-image").style.boxShadow = `0px 0px 0px transparent`;
          this.hoverInAction = false;
        });
      });
      //////////////////////
      
    },
    
}

</script>
<template lang="pug">
div
</template>
<style lang="scss" scoped>

.card{
  width: 300px;
  height: 350px; 
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color:#3e1404;
  box-shadow: -10px 0px 20px rgba(0,0,0,0.219), 0px 150px 1px #DBC1AC inset;
  padding-bottom: 2%;
  border-radius: 5% 5% 0px 0px;
  cursor: pointer;
  transition: transform 100ms;

  img,.carta, .carta h1, .carta p{
    transform-style: preserve-3d;
    transform: translateZ(20px);
  }

  .carta h1, .carta p{
    text-align: center;
    color: #ffff;
    font-family: 'Roboto',sans-serif;
  }

  .carta p{
    text-align: justify;
    text-align-last: center;
  }
  .info {
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 90%;
  }
}
</style>