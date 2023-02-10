import validator from 'validator'
export default class Login {
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
    const emailInput = el.querySelector('input[name="email"]')
    const passwordInput = el.querySelector('input[name="password"]')
    let error = false
    

    if (!validator.isEmail(emailInput.value)) error = true
    if (passwordInput.value.length < 3 || passwordInput.value.length > 50)
      error = true


      let msgError=el.querySelector('.error')
    if(error&&!msgError){
      const firstInput = el.querySelector('.form-group')
      const notification = document.createElement("div");
      
      notification.innerHTML = `<span class='text-danger error' style="font-weight: bold; font-size:12px;">Email ou Senha invalido<br>Senha deve esta entre 3 ou 50 caracteres </span>`;
      firstInput.insertBefore(notification, firstInput.firstChild);
    }




    
    if (!error) el.submit()
  }
}
