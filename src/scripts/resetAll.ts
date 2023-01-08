const resetBtn = document.querySelector('.reset_all_item') as HTMLButtonElement;
const clickEvent = new MouseEvent('click');

const rangeSlider = document.getElementById('range-slider')
const rangeSlider2 = document.getElementById('range-slider2')
const submitBtn1 = document.querySelector('.submBtn') as HTMLButtonElement;
const submitBtn2 = document.querySelector('.submBtn2') as HTMLButtonElement;

const resetAll = (inputs?: HTMLInputElement[]) => {
  const clickEvent = new MouseEvent('click');
  resetBtn?.addEventListener('click', () => {
    inputs!.forEach(checkbox => {
      if(checkbox.checked == true) {
        checkbox.dispatchEvent(clickEvent); // reset filter category
      }
      checkbox.checked = false
      resetBtn.classList.remove('show_reset')
    })
    resetRangeSlider(rangeSlider, rangeSlider2, [400, 69960], [2, 150], submitBtn1, submitBtn2, resetBtn) // reset slider filter
  })
}

const resetRangeSlider = (slider: any, slider2: any, values: number[], values2: number[], submit: HTMLButtonElement, submit2: HTMLButtonElement, resetBtn: HTMLButtonElement) => {
  slider.noUiSlider.set(values)
  submit.dispatchEvent(clickEvent);

  slider2.noUiSlider.set(values2)
  submit2.dispatchEvent(clickEvent);

  resetBtn.classList.remove('show_reset')
}

export default resetAll