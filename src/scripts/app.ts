import RenderGood from "./RenderGoods";
import { data } from "./RenderGoods";
import gridChoise from "./gridSetting";
import ProductBin from "./Bin";
import allSorts from "./easySort";
import searchGood from "./searchGood";
import CategoryRender from "./CategoryRender";
import { fullCategoryCounter, createCategoryArrays } from "./CategoryRender";
import CategorySort from "./CategorySort";
import RenderGoodPage from "./RenderGoodPage";
import resetAll from "./resetAll";
import countFindedGoods from "./goodsCount";
import FormValidation from "./FormValidation";

const urlJson = "./assets/json/goods.json";
const goodsArea: HTMLDivElement | null = document.querySelector(".goods");
const menuCategory = document.querySelector(".dropdown_menu_category");
const menuBrand = document.querySelector(".dropdown_menu_category2");

const noRepeatArr: string[] = [];
const repeatArr: string[] = [];

const noRepeatArrTest: string[] = [];
const repeatArrTest: string[] = [];

const noRepeatArrTest2: string[] = [];
const repeatArrTest2: string[] = [];

new Promise<Response>((resolve) => {
  resolve(fetch(urlJson));
})
  .then((data: Response) => data.json()) // render good cards
  .then((data: data[]) => {

    console.log(data);

    data.forEach((elem) => {
      const renderCard = new RenderGood(elem);
      const goodCard = document.createElement("div");
      goodCard.classList.add("good_card");
      goodCard.innerHTML = renderCard.getCard();
      goodsArea!.appendChild(goodCard);

      gridChoise(goodCard); // choise grid size

      const RenderVariant = new CategoryRender(elem);
      const categoryVariant = document.createElement("div");
      categoryVariant.classList.add("variantCategory");
      categoryVariant.setAttribute("filter-category", "category");

      categoryVariant.innerHTML = RenderVariant.renderCategory(1, "category", elem.id.toString()); // render category variants
      createCategoryArrays(noRepeatArr, categoryVariant, noRepeatArrTest, repeatArr, repeatArrTest, menuCategory as HTMLElement);
      const brandVariant = document.createElement("div");
      brandVariant.classList.add("variantCategory");
      brandVariant.setAttribute("filter-category", "brand");

      brandVariant.innerHTML = RenderVariant.renderCategory(1, "brand", (elem.id + 100).toString()); // render brand variants
      createCategoryArrays(noRepeatArr, brandVariant, noRepeatArrTest2, repeatArr, repeatArrTest2, menuBrand as HTMLElement);

    });

    const mainCategoryCounter = document.querySelector(".category_main_counter") as HTMLElement;
    const allCategoriesTitle = document.querySelectorAll(".category_title");
    const allCategoriesCount = document.querySelectorAll(".count_span");

    fullCategoryCounter(mainCategoryCounter, allCategoriesTitle, allCategoriesCount, repeatArrTest); // counter of all categories

    const mainBrandCounter = document.querySelector(".brand_main_counter") as HTMLElement;
    const allBrandsTitle = document.querySelectorAll(".brand_title");
    const allBrandsCount = document.querySelectorAll(".count_span_brand");

    fullCategoryCounter( mainBrandCounter, allBrandsTitle, allBrandsCount, repeatArrTest2); // counter of all brands

  })
  .then(() => {
    const putImage: HTMLImageElement | null = document.querySelector(".put_in_bin"); 
    const binIco = document.querySelector('.header_bin') as HTMLDivElement;

    const Bin = new ProductBin(); // bin
    Bin.putInBin();
    Bin.openBin()
  })
  .then(() => {
    const fullArea: HTMLElement | null = document.querySelector(".goods");

    allSorts(fullArea!); // easy sort

    searchGood(fullArea!); // search goods
  })
  .then(() => {
    const goodCard: NodeListOf<HTMLDivElement> = document.querySelectorAll(".good_card");
    const categoryVariant: NodeListOf<HTMLDivElement> = document.querySelectorAll(".variantCategory");

    const HardSort = new CategorySort(goodCard, categoryVariant);
    HardSort.goodFilter(); // hard category sort

    const GoodPopup = new RenderGoodPage(goodsArea!)
    GoodPopup.renderGoodPopup() // render page of good

    const checkedInputs = document.querySelectorAll(".checkbox_checked") as unknown as HTMLInputElement[];
    resetAll(checkedInputs) // reset all

    countFindedGoods(checkedInputs, goodCard)
  })
  .then(() => {

    const ValidationForm = new FormValidation()  // validation popup

    ValidationForm.openForm()
  })
