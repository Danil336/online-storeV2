
class RenderGoodPage {
  goodCards: HTMLDivElement;
  constructor(goodCards: HTMLDivElement) {
    this.goodCards = goodCards
  }
  renderGoodPopup() {
    let isInBin = 'true'
    let actualBinImage = './assets/images/bin_green.svg'
    let isInBinText = 'В корзину'
    let putBinInMain: Element | undefined
    const goodPopup = document.querySelector('.good-info_popup') 
    let cards = this.goodCards.children

    for(let i = 0; i < cards.length; i++){
      cards[i].addEventListener('click', event => {
        const target = event.target as HTMLElement;
        if((event.target! as HTMLDivElement).hasAttribute('open-popup')){

          if(target.innerText == '') {
            putBinInMain = target.parentElement?.parentElement?.children[1].children[1].children[0]
          } else {
            putBinInMain = target.parentElement?.parentElement?.children[1].children[0]
          }
          
          if(putBinInMain!.getAttribute('put-bin') === 'false') {
            isInBin = 'false'
            actualBinImage = './assets/images/bin_green_solved.svg'
            isInBinText = 'В корзине'
          } else {
            isInBin = 'true'
            actualBinImage = './assets/images/bin_green.svg'
            isInBinText = 'В корзину'
          }
          
          let images = target.getAttribute('images')?.split(',')

          goodPopup!.innerHTML = `
          <div class="wrapper">
          <div class="popup_header">
          <div class="good_path" style="background-image: url('./assets/images/right_arrow.svg')">
            <div class="home_ico home_ico2">
              <img src="./assets/images/house.svg" alt="" />
            </div>
            <div class="path_step2">${target.getAttribute('category')}</div>
            <div class="path_step3">${target.getAttribute('brand')}</div>
            <div class="path_step4">${target.getAttribute('title')}</div>
          </div>
          <div class="big_good_title">${target.getAttribute('title')}</div>
        </div>
        <div class="popup_main">
          <div class="popup_item left_info">
            <div class="main_good_photo">
              <img src="${images![0]}" alt="">
            </div>
            <div class="sub_good_photos">
              <div class="sub_photo">
                <img src="${images![1]}" alt="">
              </div>
              <div class="sub_photo">
                <img src="${images![2]}" alt="">
              </div>
              <div class="sub_photo">
                <img src="${images![3]}" alt="">
              </div>
              <div class="sub_photo">
                <img src="${images![4]}" alt="">
              </div>
              <div class="sub_photo">
                <img src="${images![5]}" alt="">
              </div>
            </div>
          </div>
          <div class="popup_item full_descriprion">
            <div class="buy_good">
              <div class="good_price">
              ${target.getAttribute('price')}₴
              </div>
              <div class="about_bin">
              <div class="good_to_cart">
                <div put-bin="true" class="put_in_bin put_in_bin2">
                <img class="put_image" goodinfo="${target.getAttribute('title')?.split(' ').join('')}" put-img="true" put-bin="${isInBin}" src="${actualBinImage}" alt="">
                </div>
              </div>
              <div class="in_bin_text">${isInBinText}</div>
            </div>
            </div>
            <div class="good_description">
              <div class="title_include">Desctiption:</div>
              <div class="description_text text_include">${target.getAttribute('description')}</div>
            </div>
            <div class="title_include">
              <div class="rating_title title_include">Rating:</div>
              <div class="rating_text text_include">⭐${target.getAttribute('rating')}</div>
            </div>
            <div class="good_brand">
              <div class="title_include">Brand:</div>
              <div class="brand_text text_include">${target.getAttribute('brand')}</div>
            </div>
            <div class="good_category">
              <div class="title_include">Category:</div>
              <div class="category_text text_include">${target.getAttribute('category')}</div>
            </div>
            <div class="good_stock">
              <div class="title_include">In stock:</div>
              <div class="stock_text text_include">${target.getAttribute('stock')}</div>
            </div>
          </div>
        </div>
      </div>
          `
          goodPopup?.classList.add('popup_show')
          const body = document.querySelector('body')
          body?.classList.add('no_scroll')
  
          const goHome = goodPopup?.querySelector('.home_ico2')
          const logoHome = document.querySelector('.header_logo')
          const inputHome = document.querySelector('.input')
          const goHomeArr = [goHome, logoHome, inputHome]
          goHomeArr.forEach(elem => {
            elem?.addEventListener('click', () => {
              goodPopup?.classList.remove('popup_show')
              body?.classList.remove('no_scroll')
            })
          })
  
          const mainPhoto = goodPopup?.querySelector('.main_good_photo')
          const subPhotos = goodPopup?.querySelectorAll('.sub_photo')
  
          subPhotos?.forEach(subPhoto => {
            subPhoto.addEventListener('click', () => {
              if(subPhoto.innerHTML.length > 60){
                mainPhoto!.innerHTML = subPhoto.innerHTML
              }
            })
          })

          const putBinInPopup = goodPopup?.querySelector('.put_image')
          const putText = goodPopup?.querySelector('.in_bin_text') as HTMLElement;

          putBinInPopup?.addEventListener('click', () => {
            putText!.innerText = 'В корзине'
            putBinInMain!.parentElement!.innerHTML = `<img class="put_image" put-img="true" put-bin="false" src="./assets/images/bin_green_solved.svg" alt="">`
            
          })
        } 
      })
    }
  }

}

export default RenderGoodPage