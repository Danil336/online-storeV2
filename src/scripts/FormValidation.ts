
class FormValidation {
  openForm() {
    openPopup()
    correctAvalible()
    validator()

    function openPopup() {
      const buyBtn = document.querySelector('.buy_btn')
      const confirmWindow = document.querySelector('.form_background')

      buyBtn?.addEventListener('click', () => {
        confirmWindow?.classList.add('show_form')

        confirmWindow?.addEventListener('click', event => {
          if((event.target as HTMLElement).classList.contains('show_form')) {
            confirmWindow?.classList.remove('show_form')
          }
        })
      })
    }

    function validation<F extends Element>(form: F) {

      function removeError(input: HTMLInputElement) {

        if(input.classList.contains('input_field')) {
  
          if(input.classList.contains('error_field')) {
            const errorDiv = input.parentElement?.children[1]
            errorDiv!.classList.remove('show_error')
            input.classList.remove('error_field')
          }
        } else {
          const errorDiv = document.querySelector('.card_error')
          errorDiv!.classList.remove('show_error')
          input.classList.remove('error_field')
        }

      }

      function showError(input: HTMLInputElement) {
        let errorDiv
        if(input.classList.contains('input_field')) {
          errorDiv = input.parentElement?.children[1]
          errorDiv?.classList.add('show_error')
          input.classList.add('error_field')
        } else if(input.classList.contains('input_field_card')) {
          errorDiv = document.querySelector('.card_error')
          errorDiv?.classList.add('show_error')
          input.classList.add('error_field')
        }
      }

      let result = true

      const inputs = form.querySelectorAll('.input_field') as NodeListOf<HTMLInputElement>;
      const cardInputs = form.querySelectorAll('.input_field_card') as NodeListOf<HTMLInputElement>;

      cardInputs.forEach(cardInput => {
        removeError(cardInput)

        if(cardInput.hasAttribute('card-number')) {
          standatdValid()
          if(cardInput.value.length < 19 || isNaN(+cardInput.value.slice(0,3))) {
            showError(cardInput)
            result = false
          }
        }

        if(cardInput.hasAttribute('avalible')) {
          standatdValid()
          if(cardInput.value.length < 5 || isNaN(+cardInput.value.slice(0,2)) || isNaN(+cardInput.value.slice(3, 6)) || +cardInput.value.slice(0,2) > 12) {
            showError(cardInput)
            result = false
          } 
        }

        if(cardInput.hasAttribute('cvv')) {
          standatdValid()
          if(cardInput.value.length < 3 || !/^\d+$/.test(cardInput.value)) {
            showError(cardInput)
            result = false
          }
        }

        function standatdValid() {
          if(cardInput.value === '') {
            showError(cardInput)
            result = false
          }
        }
      })

      inputs.forEach(input => {
        removeError(input)

        if(input.hasAttribute('name')) {
          standatdValid()
          if(input.value.length < 3) {
            showError(input)
            result = false
          }
        }

        if(input.hasAttribute('surname')) {
          standatdValid()
          if(input.value.length < 3) {
            showError(input)
            result = false
          }
        }

        if(input.hasAttribute('phone')) {
          standatdValid()
          if(((input.value.length < 10) || (input.value.slice(0, 1) !== '+')) || !/^\d+$/.test(input.value.slice(1))) {
            showError(input)
            result = false
          }
        }

        if(input.hasAttribute('email')) {
          standatdValid()
          if(!/^[^@]+@[^@]+\.[^@]+$/.test(input.value)) {
            showError(input)
            result = false
          }
        }

        function standatdValid() {
          if(input.value === '') {
            showError(input)
            result = false
          }
        }
      })

      return result
    }

    function validator() {
      const form = document.querySelector('.validation_form')
      const successPopup = document.querySelector('.success')
      form?.addEventListener('submit', (event) => {
        event.preventDefault()

        if (validation(form) === true) {
          successPopup?.classList.add('show_saccess')
          localStorage.clear()
          setTimeout(() => {
            successPopup?.classList.remove('show_saccess')
            location.reload()
          }, 2000);
        }
      })
    }

    function correctAvalible() {
      const inputAvalible = document.querySelector('.input_avalible') as HTMLInputElement

      inputAvalible?.addEventListener('input', () => {
        if(inputAvalible.value.length > 2) {
          inputAvalible.setAttribute('allow_less', 'true')
        }
        if(inputAvalible.value.length === 2) {
          if(inputAvalible.hasAttribute('allow_less')) {
            inputAvalible.removeAttribute('allow_less')
            return
          } else {
            inputAvalible.value = inputAvalible.value + '/'
          }
        }
      })

      const cardNumber = document.querySelector('.input_number') as HTMLInputElement

      cardNumber?.addEventListener('input', () => {
        cardNumber.value = cardNumber.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      })

    }
  }
}

export default FormValidation