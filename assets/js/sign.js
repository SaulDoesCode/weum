function signupForm() {
  const inps = inputs('moniker email password'),
    finish = button.onclick(async e => {
      const msg = d.p.css({color: '#000'})(await Sign.up(...inps.map(vlclr)))
      setTimeout(() => {
        msg.remove()
        signidge.enside()
        if (form.parentNode.closeModal) form.parentNode.closeModal()
      }, 4000)
      form.append(msg)
    })('finish'),
    form = section.signup.form(header('sign up'), div.inputs(...inps), finish)
  return form
}
function signinForm() {
  const inps = inputs('email password'),
    finish = button.onclick(async _=> {
      const msg = d.p.css({color: '#000'})((await Sign.in(...inps.map(vlclr))))
      signidge.enside()
      setTimeout(() => {
        msg.remove()
        if (form.parentNode.closeModal) form.parentNode.closeModal()
      }, 5000)
      form.append(msg)
    })('finish'),
    form = section.signup.form(header('sign in'), div.inputs(...inps), finish)
  return form
}
function modal(...args) {
  const rm = () => {
    m.style.animation = '140ms modal-exit'
    setTimeout(_=> m.remove(), 140)
    document.body.removeEventListener('click', exitModal)
  }, m = section.modal(button.close.onclick(rm)('X'), ...args),
  exitModal = e => e.target != m && !m.contains(e.target) && rm()
  m.closeModal = rm
  setTimeout(() => document.body.addEventListener('click', exitModal), 500)
  return m
}
function signinFormModal() { document.body.append(modal(signinForm())) }
function signupFormModal() { document.body.append(modal(signupForm())) }
async function signout() {
  const msg = d.p((await (await fetch('/signout')).text()))
  localStorage.removeItem('signedin')
  signidge.innerHTML = ''
  signidge.append(msg)
  setTimeout(() => {
    msg.remove()
    signidge.enside()
  }, 4000)
}
const inputs = inps => inps.split(' ').map(inp => input.attr({type: inp == 'password' ? inp : 'text', placeholder: inp})()),
vlclr = i => {
  const v = i.value.trim()
  i.value = ''
  return v
}, signidge = (() => {
  const sgn = span('sign:'), itm = (fn, tx) => span.use.onclick(fn)(tx), idge = section.signidge()
  ;(idge.enside = () => (idge.innerHTML = '',
      localStorage.getItem('signedin') == 1 ?
        idge.append(span('sign: '), itm(signout, 'out')) :
        idge.append(span('sign: '), itm(signinFormModal, 'in'), span('/'), itm(signupFormModal, 'up'))
  ))()
  return idge
})()
nav.mainnav.$body(signidge)
d.style.$body().innerHTML = `@import url('/css/sign.css');`
