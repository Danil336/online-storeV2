import { data } from "./RenderGoods";

type countsObj = {
  [key: string]: string | number
}

const categoryButton = document.querySelector(".dropdown-toggle-category");
const categoryMenu = document.querySelector(".dropdown_menu_category");

const categoryButton2 = document.querySelector(".dropdown-toggle-category2");
const categoryMenu2 = document.querySelector(".dropdown_menu_category2");

const categoryButton3 = document.querySelector(".dropdown-toggle-category3");
const categoryMenu3 = document.querySelector(".dropdown_menu_category3");

const categoryButton4 = document.querySelector(".dropdown-toggle-category4");
const categoryMenu4 = document.querySelector(".dropdown_menu_category4");

categoryButton?.addEventListener("click", (event) => {
  const showArrow = categoryButton.children[0].children[1];
  categoryMenu?.classList.toggle("unshow");
  (showArrow as HTMLElement).classList.toggle("arrow_up");
});

categoryButton2?.addEventListener("click", (event) => {
  const showArrow = categoryButton2.children[0].children[1];
  categoryMenu2?.classList.toggle("unshow");
  (showArrow as HTMLElement).classList.toggle("arrow_up");
});

categoryButton3?.addEventListener("click", (event) => {
  const showArrow = categoryButton3.children[0].children[1];
  categoryMenu3?.classList.toggle("unshow");
  (showArrow as HTMLElement).classList.toggle("arrow_up");
});

categoryButton4?.addEventListener("click", (event) => {
  const showArrow = categoryButton4.children[0].children[1];
  categoryMenu4?.classList.toggle("unshow");
  (showArrow as HTMLElement).classList.toggle("arrow_up");
});

class CategoryRender {
  category: string;
  brand: string;
  constructor(data: data) {
    this.category = data.category;
    this.brand = data.brand;
  }
  renderCategory(count: number, wich: string, id: string): string {
    let choise = "";
    let actualCategory = ''
    let actualSpan = ''
    if (wich === "category") {
      choise = this.category.toLocaleLowerCase();
      let firstChar = choise[0].toUpperCase()
      choise = firstChar + choise.slice(1)
      actualCategory = 'category_title'
      actualSpan = 'count_span'
    } else {
      choise = this.brand.toLocaleLowerCase();
      let firstChar = choise[0].toUpperCase()
      choise = firstChar + choise.slice(1)
      actualCategory = 'brand_title'
      actualSpan = 'count_span_brand'
    }
    return `
    <label for="${id}">
    <div class="category_variant">
    <div class="category_checkbox">
      <input class="checkbox_checked" type="checkbox" id="${id}">
    </div>
    <div class="${actualCategory}">${choise} <span class="${actualSpan}">(${count})</span></div>
  </div>
  </label>
    `;
  }
}

export function countRepeated(array: string[]) {
  const counts: countsObj = {};
  for (let i = 0; i < array.length; i++) {
    const element: string = array[i];
    if (counts[element]) {
      (counts[element] as number) += 1;
    } else {
      counts[element] = 1;
    }
  }
  return counts;
}

export function fullCategoryCounter(mainCategoryCounter: HTMLElement, allCategoriesTitle: NodeList, allCategoriesCount: NodeList, repeatArrTest: string[]) {
  let repeatedObjCategory = countRepeated(repeatArrTest);
    for (let i = 0; i < allCategoriesCount.length; i++) {
      let count: any = allCategoriesCount[i];
      let fullTitle: any = allCategoriesTitle[i];
      let fullCounter = repeatedObjCategory[fullTitle.innerText];
      if(!(typeof fullCounter === 'number')) {
        count.innerText = `(1)`;
      } else {
        count.innerText = `(${fullCounter + 1})`;
      }
    }
    (mainCategoryCounter! as HTMLElement).innerText = allCategoriesCount.length.toString()
}

export function createCategoryArrays(noRepeatArr: string[], categoryVariant:HTMLElement, noRepeatArrTest: string[], repeatArr: string[], repeatArrTest: string[], menuCategory: HTMLElement) {
  if (!noRepeatArr.includes(categoryVariant.innerText.trim())) {
    noRepeatArr.push(categoryVariant.innerText.trim());
    menuCategory?.appendChild(categoryVariant);
    noRepeatArrTest.push(categoryVariant.innerText.trim());
  } else {
    repeatArr.push(categoryVariant.innerText.trim());
    repeatArrTest.push(categoryVariant.innerText.trim());
  }
}

export default CategoryRender;
