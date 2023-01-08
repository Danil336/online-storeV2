const rangeSlider: any = document.getElementById('range-slider')
const rangeSlider2: any = document.getElementById('range-slider2')

const submitBtn1 = document.querySelector('.submBtn') as HTMLButtonElement;
const submitBtn2 = document.querySelector('.submBtn2') as HTMLButtonElement;

const foundIndicate = document.querySelector('.how_mach_found') as HTMLDivElement;

const countFindedGoods = (inputs: HTMLInputElement[], goods: NodeListOf<HTMLDivElement>) => {
  let showArr = []
  goods.forEach(good => {
    if(!good.classList.contains('unshow')) {
      showArr = Array.from(goods).filter(elem => {
        if(!elem.classList.contains('unshow')) {
          return elem
        }
      })
    } 
    foundIndicate!.innerText = `Найдено: ${showArr.length} товаров`
  })
  inputs.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        goods.forEach(good => {
          if(good.classList.length == 1) {
            showArr = Array.from(goods).filter(elem => {
              if(elem.classList.length == 1) {
                return elem
              }
            })
          } 
        })
        showArr = Array.from(goods).filter(elem => {
          if(elem.classList.length == 1) {
            return elem
          }
        })
        if(showArr.length === 0) {
          foundIndicate!.innerText = `Ничего не найдено 0.о`
        } else {
          foundIndicate!.innerText = `Найдено: ${showArr.length} товаров`
        }
    })
  })

  const submitBtns = [submitBtn1, submitBtn2]

  submitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goods.forEach(good => {
        if(good.classList.length == 1) {
          showArr = Array.from(goods).filter(elem => {
            if(elem.classList.length == 1) {
              return elem
            }
          })
        } 
      })
      showArr = Array.from(goods).filter(elem => {
        if(elem.classList.length == 1) {
          return elem
        }
      })
      if(showArr.length === 0) {
        foundIndicate!.innerText = `Ничего не найдено 0.о`
      } else {
        foundIndicate!.innerText = `Найдено: ${showArr.length} товаров`
      }
    })
  })
}


export default countFindedGoods