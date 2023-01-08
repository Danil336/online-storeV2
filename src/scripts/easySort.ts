const dropdownTitle: HTMLElement | null = document.querySelector('.button_title')
const dropdownMenu: HTMLElement | null = document.querySelector('.dropdown-menu')
const byRating = document.querySelector('.by_rating')
const byCheap = document.querySelector('.by_cheap')
const byExpensive = document.querySelector('.by_exp')

document.addEventListener('click', event => {
  if((event.target as HTMLElement).hasAttribute('easy-filter')) {
    dropdownMenu!.classList.toggle('show')
  }
  else if(dropdownMenu?.classList.contains('show')){
    dropdownMenu!.classList.remove('show')
  }
})

const allSorts = (parentNode: HTMLElement) => {
  byCheap?.addEventListener('click', () => easySort(parentNode, 'by_cheap'))
  byExpensive?.addEventListener('click', () => easySort(parentNode, 'by_exp'))
  byRating?.addEventListener('click', () => easySort(parentNode, 'by_rating'))
}

const easySort = function(parentNode: HTMLElement, mode: string) {
  for (let i = 0; i < parentNode.children.length; i++) {
    for (let j = i; j < parentNode.children.length; j++) {
      if(mode === 'by_cheap') {
        if (+parentNode.children[i].children[0].getAttribute('price')! > +parentNode.children[j].children[0].getAttribute('price')!) {
          let replacedNode: HTMLElement | Element | null = parentNode.replaceChild(parentNode.children[j], parentNode.children[i])
          insertAfter(replacedNode! as HTMLElement, parentNode.children[i] as HTMLElement)
          dropdownTitle!.innerText = 'От дешёвого'
        }
      }
      else if(mode === 'by_exp'){
        if (+parentNode.children[i].children[0].getAttribute('price')! < +parentNode.children[j].children[0].getAttribute('price')!) {
          let replacedNode: HTMLElement | Element | null = parentNode.replaceChild(parentNode.children[j], parentNode.children[i])
          insertAfter(replacedNode! as HTMLElement, parentNode.children[i] as HTMLElement)
          dropdownTitle!.innerText = 'От дорогого'
        } 
      }
      else if(mode === 'by_rating') {
        if (+parentNode.children[i].children[0].getAttribute('rating')! < +parentNode.children[j].children[0].getAttribute('rating')!) {
          let replacedNode: HTMLElement | Element | null = parentNode.replaceChild(parentNode.children[j], parentNode.children[i])
          insertAfter(replacedNode! as HTMLElement, parentNode.children[i] as HTMLElement)
          dropdownTitle!.innerText = 'По рейтингу'
        }
      }
    }
  }
}

function insertAfter(elem: HTMLElement, refElem: HTMLElement) {
  return refElem.parentNode!.insertBefore(elem, refElem.nextSibling)
}

export default allSorts


