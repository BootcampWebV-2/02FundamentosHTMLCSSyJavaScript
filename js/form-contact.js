export class FormContact {
    constructor() {

        this.oFormContact =  document.querySelector('#contact')
        this.oInputName = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oInputPhone = document.querySelector('#phone')
        this.oTextMessage = document.querySelector('#message')
        this.oInputOtros = document.querySelector('#selection-otro')
        this.oSelectSeleccion = document.querySelector('#selection')

        this.oData = {
            name: '',
            email: '',
            phone: '',
            message: '',
            seleccionOtro: '',
            seleccion: ''
        }

        this.oFormContact.addEventListener('submit', this.leerContact.bind(this)) 
        this.oSelectSeleccion.addEventListener('change', this.watchSelect.bind(this))
        this.definirValidaciones()

    }

    leerContact(oE) {
        oE.preventDefault()
            this.guardarDatos()
            window.alert("Se enviaran estos datos: " 
            + "\n" + this.oData.name 
            + "\n" + this.oData.email 
            + "\n" + this.oData.phone 
            + "\n" + this.oData.message 
            + "\n" + this.oData.seleccion
            + "\n" + this.oData.seleccionOtro)
    }

    guardarDatos() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value ,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            seleccionOtro: this.oInputOtros.value,
            seleccion: this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value
        }
    }


    watchSelect() {
        if (this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value === "otros") {
            this.oInputOtros.parentElement.classList.remove('oculto')
        } else {
            this.oInputOtros.parentElement.classList.add('oculto')
        }
    }

    definirValidaciones() {

        this.validaNombre()
        this.oInputName.addEventListener('input', this.validaNombre.bind(this) )

        this.validaTexto()
        this.oTextMessage.addEventListener('input', this.validaTexto.bind(this) )

        this.validaTelefono()
        this.oInputPhone.addEventListener('input', this.validaTelefono.bind(this) )

    }

    validaNombre() {
        let msg = ''
        this.oInputName.setCustomValidity(msg)
        if(!this.oInputName.checkValidity()){
            msg = 'Es necesario indicar el nombre'
        } 
        this.oInputName.setCustomValidity(msg)
    }

    validaTexto() {
        let msg = ''
        this.oTextMessage.setCustomValidity(msg)

        if (!this.oTextMessage.value) {
            msg = 'Es necesario incluir algún texto en el mensaje'
        } else if (this.oTextMessage.value.split(' ').length > 150) {
            msg = 'El texto no debe sobrepasar 150 palabras'
        } 
        this.oTextMessage.setCustomValidity(msg)
    }

    validate(value){
        var str = value.toString().replace(/\s/g, '');
        return str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str);
    }

    validaTelefono() {
        let msg = ''
        this.oInputPhone.setCustomValidity(msg)

        if (!this.validate(this.oInputPhone.value)) {
            msg = 'El numero de telefono no tiene el formato correcto'
        } 
        this.oInputPhone.setCustomValidity(msg)
    }
}