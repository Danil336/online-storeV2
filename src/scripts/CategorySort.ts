interface FilterConfig {
  category: Set<string>;
  brand: Set<string>;
  [key: string]: Set<string>;
}

export default class CategorySort {
  goods: NodeListOf<HTMLDivElement>;
  filters: NodeListOf<HTMLDivElement>;
  constructor(goods: NodeListOf<HTMLDivElement>, filters: NodeListOf<HTMLDivElement>) {
    this.goods = goods;
    this.filters = filters;
  }

  goodFilter() {
    const filterConfig: FilterConfig = {
      category: new Set(),
      brand: new Set(),
    };
    const cardFilter = () => {
      this.goods.forEach((card) => {
        const attributePlace = card.childNodes[1]
        const cardCategory = (attributePlace as HTMLElement).getAttribute("category")?.toLowerCase();
        const cardBrand = (attributePlace as HTMLElement).getAttribute("brand")?.toLowerCase();

        let isEmpty = true;
        let isAllNotEmpty = true;
        let isContain = false;

        for (let key in filterConfig) {
          if (filterConfig[key].size !== 0) {
            isEmpty = false;
          }
        }

        for (let key in filterConfig) {
          if (filterConfig[key].size == 0) {
            isAllNotEmpty = false;
          }
        }

        for (let key in filterConfig) {
          if (
            filterConfig[key].has(cardCategory!) ||
            filterConfig[key].has(cardBrand!)
          ) {
            isContain = true;
            break;
          }
        }
        const isContain1 =
          !filterConfig["category"].has(cardCategory!) &&
          filterConfig["brand"].has(cardBrand!);
        const isContain2 =
          filterConfig["category"].has(cardCategory!) &&
          !filterConfig["brand"].has(cardBrand!);

        const fullIsContane = isContain1 || isContain2;

        if (!isEmpty) {
          if (isContain && !isAllNotEmpty) {
            (card as HTMLElement).classList.remove('unshow');
          } else if (isContain && isAllNotEmpty && !fullIsContane) {
            (card as HTMLElement).classList.remove('unshow');
          } else {
            (card as HTMLElement).classList.add('unshow');
          }
        } else if (isEmpty) {
          (card as HTMLElement).classList.remove('unshow');
        }
      });
    };

    this.filters.forEach((filter) => {
      const categoryTitle = (filter.children[0].children[0].children[1] as HTMLElement).innerText.slice(0, -3).trim()
      filter.id = categoryTitle.toLowerCase()
      filter.querySelector('input')!.addEventListener("click", () => {
        const resetBtn = document.querySelector('.reset_all_item')
        resetBtn?.classList.add('show_reset')
        const filterAttribute = filter.getAttribute("filter-category")!.toLowerCase();
        const filterId = filter.id
        const filterCategory = filterConfig[filterAttribute];
        if (filterCategory.has(filterId)) {
          filterCategory.delete(filterId);
        } else {
          filterCategory.add(filterId);
        }
        cardFilter();
      });
    });
  }
}
