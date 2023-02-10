import validator from 'validator'
export default class ContatoForm {
  constructor(formClass) {
    this.form = document.querySelector(formClass)
  }
  init() {
    this.events()
  }
  events() {
    if (!this.form) return
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      this.validade(e)
    })
  }

  validade(e) {
    const el = e.target
    const nomeInput = el.querySelector('#nomeCadastro')
    const emailInput = el.querySelector('input[name="email"]')
    const telefoneInput = el.querySelector('#telCadastro')

    let error = false
    let txtError = ''
    if (nomeInput.value.trim().length < 3) {
      txtError = 'Nome deve ter mais de 2 letras'
      error = true
    } else if (!emailInput.value.trim() && !telefoneInput.value.trim()) {
      txtError = 'No mínimo um contato: E-mail ou Telefone.'
      error = true
    } else if (emailInput.value && !validator.isEmail(emailInput.value)) {
      txtError += ' Email Invalido.'
      error = true
    }

    let msgError = el.querySelector('.error')
    let alertBack = document.querySelector('.alertBack')
    if(alertBack) {
      alertBack.remove()
    }
    if (error) {
      if (msgError) {
        msgError.innerHTML = `${txtError}`
        return
      } else {
        const firstInput = el.querySelector('.form-group')
        const notification = document.createElement('div')
       
        notification.innerHTML = `<span class='text-danger error' style="font-weight: bold; font-size:12px;">${txtError}</span>`
        firstInput.insertBefore(notification, firstInput.firstChild)
      }
    }

    if (!error) el.submit()
  }
}
