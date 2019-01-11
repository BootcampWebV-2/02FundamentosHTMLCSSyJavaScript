export class Menu {
    constructor () {

        this.oBotonMenu1 = document.querySelector('#menu-btn-1')
        this.oBotonMenu2 = document.querySelector('#menu-btn-2')
        this.oMenuTop =  document.querySelector('#menu-top')
        this.oMenuBottom = document.querySelector('#menu-bottom')
        this.aMenuItems = document.querySelectorAll("nav#menu-top a")
        this.aSections = document.querySelectorAll("section")

        this.aOffsets = []
        this.calcularOffsets()
        this.seccionActiva = 0 

        this.oBotonMenu1.addEventListener('click', this.toggleMenu.bind(this))
        this.oBotonMenu2.addEventListener('click', this.toggleMenu.bind(this))

        this.aMenuItems.forEach(
            (item) => { item.addEventListener('click', this.navegar.bind(this))}
        )
        window.addEventListener('scroll', this.scrollDetect.bind(this))
    }

    toggleMenu(oE) {
        oE.preventDefault()
        oE.target.classList.toggle('hide')

        if (oE.target.previousElementSibling) {
            oE.target.previousElementSibling.classList.toggle('hide')
        } else {
            oE.target.nextElementSibling.classList.toggle('hide')
        }
        this.oMenuTop.classList.toggle('hide')
    }

    navegar(oE) {
        let i = oE.target.dataset.index
        oE.preventDefault()
        window.scroll({
            top: this.aOffsets[i], 
            left: 0, 
            behavior: 'smooth'
        })
    }

    scrollDetect (oE) {
        let position = oE.target.scrollingElement.scrollTop
        let index
        this.aOffsets.every(
            (offset, i) => { 
                if( position >= offset) {
                    index = i
                    return true}
                else { return false}
            })
        
        if (this.seccionActiva != index) {
            this.aMenuItems.forEach(
                (nodoMenu) => {nodoMenu.classList.remove('active')}
            )
            this.aMenuItems[index].classList.add('active')   
            this.seccionActiva = index
        }

   }

    calcularOffsets() {
        this.aSections.forEach(
            (section) => {
                if (window.innerWidth>=900){
                    this.aOffsets.push( this.cumulativeOffset(section)-60)
                }
                else{
                    this.aOffsets.push( this.cumulativeOffset(section))
                } 
            }
        )
        this.aOffsets[0] = 0
    }


    cumulativeOffset (element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    };
}