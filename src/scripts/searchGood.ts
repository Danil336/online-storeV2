const searchInput: HTMLInputElement | null = document.querySelector('.input')
const searchButton: HTMLButtonElement | null = document.querySelector('.search_button')

const howMachFound = document.querySelector('.how_mach_found') as HTMLElement;

const searchGood = function(parentNode: HTMLElement) {
  let goodFound = 0
  searchInput?.addEventListener('input', () => {
    const goodsMin: HTMLCollection = parentNode.children
    let valueMin: string = searchInput!.value.trim()
    if(valueMin == ''){
      for(let i = 0; i < goodsMin.length; i++) {
        goodsMin[i].classList.remove('hide')
    }
    goodFound = goodsMin.length
    howMachFound.innerText = `Найдено: ${goodFound} товаров`
    }
  })
  searchButton?.addEventListener('click', () => {
    const goods: HTMLCollection = parentNode.children
    let value: string = searchInput!.value.trim()
    if(value !== '') {
      goodFound = 0
      for(let i = 0; i < goods.length; i++) {
        let goodName = goods[i].children[0].getAttribute('title')?.toLocaleLowerCase()
        if(goodName?.search(value.toLocaleLowerCase()) === -1) {
          goods[i].classList.add('hide')
        } else {
          goods[i].classList.remove('hide')
        }
        if(goods[i].classList.length === 1) {
          goodFound++
        }
      }
    } else {
      for(let i = 0; i < goods.length; i++) {
          goods[i].classList.remove('hide')
      }
    }
    if(goodFound > 0) {
      howMachFound.innerText = `Найдено: ${goodFound} товаров`
    } else {
      howMachFound.innerText = `Ничего не найдено 0.о`
    }
  })

}



export default searchGood


