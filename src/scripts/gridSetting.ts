
const smallGridBackground = document.querySelector(".grid_variant_one");
const bigGridBackground = document.querySelector(".grid_variant_two");

const gridChoise = function (goodCard: HTMLElement) {
  document.addEventListener('click', event => {
    if((event.target as HTMLElement).hasAttribute('grid-small')){
        goodCard?.classList.add("good_card_bigger");
        smallGridBackground?.classList.add("actual_grid");
        bigGridBackground?.classList.remove("actual_grid");
    }
    else if((event.target as HTMLElement).hasAttribute('grid-big')){
          goodCard?.classList.remove('good_card_bigger')
          smallGridBackground?.classList.remove('actual_grid')
          bigGridBackground?.classList.add('actual_grid')
        }
  })
};

export default gridChoise;
