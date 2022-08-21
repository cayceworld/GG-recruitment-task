let myStorage = window.localStorage;
let counter;

if (myStorage.length == 0) {
  counter = 0;
} else {
  counter = myStorage.counter;
}



function counterDisplay(button, result, reset) {
  button = document.querySelector(button);
  result = document.querySelector(result);
  reset = document.querySelector(reset);

  button.addEventListener('click', () => {
    ++counter;
    result.innerHTML = counter;
    localStorage.setItem('counter', counter);

    if (counter > 5) {
      reset.style.display = 'block'
    } else {
      reset.style.display = 'none'
    }
  })

  reset.addEventListener('click', () => {
    counter = 0;
    result.innerHTML = counter;
    localStorage.setItem('counter', counter);
  })


}

// first argument - button class, that add 1 to counter, on click.
// second argument - class of element that display result.
// third argument - reset button class.

counterDisplay('.modal__btn', '.count-result', '.count-reset')
