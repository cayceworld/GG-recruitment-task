// popup
function bindModal(open, modal, close) {
  open = document.querySelector(open),
    modal = document.querySelector(modal),
    close = document.querySelector(close)


  open.addEventListener('click', e => {
    e.preventDefault()
    modal.style.display = 'flex'
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none'
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  })
}

// first argument - button class, that open popup on click.
// second argument - popup class.
// third argument - button class, that close popup on click.
bindModal('.modal__btn', '.modal__wrapper', '.modal__close')
