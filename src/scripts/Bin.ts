const bin: HTMLElement | null = document.querySelector(".bin_notice");
const binIco = document.querySelector(".header_bin") as HTMLElement;
const body = document.querySelector("body");
const binPopup = document.querySelector(".bin");
const finalSumBuy = document.querySelector('.final_sun_wrapper')

const binIsEmpty = document.querySelector(".bin_is_empty");

class ProductBin {
  putInBin() {
    let counter = 0;
    let localArr: string[][] = [];
    let localIsInBin: string[] = [];
    addGoodToBinFromLS();
    removeFromBin();
    openGoodPagefromBin();
    bin!.innerText = localStorage.getItem("counter")!; // проверка ЛС при перезагрузке страницы
    if (+localStorage.getItem("counter")! !== 0) {
      bin?.classList.add("is_in_bin");
    }

    document.addEventListener("click", (event) => {
      // добавление товара в корзину и ЛС при клике
      if (
        (event.target as HTMLElement).hasAttribute("put-img") &&
        (event.target as HTMLElement).getAttribute("put-bin") === "false"
      ) {
        binIco.click();

        return;
      } else if ((event.target as HTMLElement).hasAttribute("put-img")) {
        bin?.classList.add("is_in_bin");
        counter = +localStorage.getItem("counter")!;
        counter++;

        localStorage.setItem("counter", counter.toString());

        bin!.innerText = localStorage.getItem("counter")!;

        (
          (event.target as HTMLElement).parentNode as HTMLElement
        ).innerHTML = `<img class="put_image" put-img="true" put-bin="false" src="./assets/images/bin_green_solved.svg" alt="">`;
      }

      let goodInfo = (event.target as HTMLElement).getAttribute("goodinfo");
      let goodInfoDiv = document.querySelector(`.${goodInfo}`);

      let newGoodTitle = goodInfoDiv!.getAttribute("title")!;

      let fullInfo = JSON.stringify([
        goodInfoDiv!.getAttribute("title")!,
        goodInfoDiv!.getAttribute("price")!,
        goodInfoDiv!.getAttribute("rating")!,
        goodInfoDiv!.getAttribute("images")!,
        3,
      ]);

      localStorage.setItem(newGoodTitle, fullInfo);

      addGoodToBinFromLS();
      removeFromBin();
      openGoodPagefromBin();
      goodPriceCounter()
    });

    function addGoodToBinFromLS() {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key!);
        localArr.push([key, JSON.parse(value!)]);
        localIsInBin.push(key!);
      }

      const goodBinPlace = document.querySelector(".purchased_goods");

      while (goodBinPlace!.firstChild) {
        goodBinPlace!.removeChild(goodBinPlace!.firstChild);
      }

      let uniqLocalArr: string[][] = [];
      let uniqLocalIsInBin: string[] = Array.from(new Set(localIsInBin));

      for (const arr of localArr) {
        if (!uniqLocalArr.some((item) => item[0] === arr[0])) {
          uniqLocalArr.push(arr);
        }
      }

      uniqLocalArr = uniqLocalArr.filter((elem) => elem[0] !== "counter");
      uniqLocalIsInBin = uniqLocalIsInBin.filter((elem) => elem !== "counter");

      uniqLocalIsInBin.forEach((title) => {
        title = title.split(" ").join("");
        const productInBin = document.querySelector(`.${title}_bin`);
        if (productInBin) {
          productInBin.parentElement!.innerHTML = `
          <img class="put_image" put-img="true" put-bin="false" src="./assets/images/bin_green_solved.svg" alt="">
          `;
        }
      });

      uniqLocalArr.forEach((good) => {
        const goodAttributes = good[1];
        const newGood = document.createElement("div");
        newGood.classList.add(".purchased_good");
        newGood.innerHTML = `
    <div class="purchased_good">
    <div class="good_row">
      <div class="about_b_good">
      <div class="good_b_image">
        <img src="${goodAttributes[3].split(",")[0]}" alt="">
      </div>
      <div class="good_b_title">${goodAttributes[0]}</div>
    </div>
    <div class="remove_b_good">
      🗑 <span>Удалить</span>
    </div>
    </div>
    <div class="good_row2">
      <div class=""></div>
      <div class="price_b"></div>
      <div class="good_b_count">
        <button class="count_equipment">-</button>
        <div class="count_equipment good_b_howmach">1</div>
        <button class="count_equipment">+</button>
      </div>
      <div class="good_b_price">${goodAttributes[1]}₴</div>
      </div>
    </div>
    `;
        goodBinPlace?.appendChild(newGood);
      });
    }

    function removeFromBin() {
      let counter = +localStorage.getItem("counter")!;
      const goodBinPlace = document.querySelector(".purchased_goods");
      const headerBin = document.querySelector(".header_bin");
      const binNotice = document.querySelector(".bin_notice") as HTMLElement;
      const goodCards = document.querySelectorAll(".good_row");

      headerBin?.addEventListener("click", function handler() {

        goodPriceCounter()

        goodCards.forEach((elem) => {
          const fullGoodBinCard = elem.parentElement?.parentElement;
          const goodTitle = (elem.children[0].children[1] as HTMLElement)
            .innerText;
          const deleteBtn = elem.children[1];

          headerBin.removeEventListener("click", handler);

          deleteBtn.addEventListener("click", () => {
            fullGoodBinCard?.parentElement?.removeChild(fullGoodBinCard);
            // counter--
            counter = +goodBinPlace?.children.length!;
            if (counter === 0) {
              binNotice.classList.remove("is_in_bin");
            }
            localStorage.setItem("counter", counter.toString());
            binNotice.innerText = localStorage.getItem("counter") as string;

            const removedGood = document.querySelector(
              `.${goodTitle.split(" ").join("")}`
            );

            const binIcoInRemovedGood =
              removedGood?.parentElement?.children[1].children[1];

            binIcoInRemovedGood!.innerHTML = `
            <img class="put_image ${goodTitle
              .split(" ")
              .join("")}_bin" goodinfo="${goodTitle
              .split(" ")
              .join(
                ""
              )}" put-img="true" put-bin="true" src="./assets/images/bin_green.svg" alt="">
            `;

            localStorage.removeItem(goodTitle);

            isBinEmpty();

            goodPriceCounter()
          });
        });
      });
    }

    function openGoodPagefromBin() {
      const binPopup = document.querySelector(".bin");
      const openGoodPageBtns = document.querySelectorAll(".about_b_good");
      openGoodPageBtns.forEach((elem) => {
        elem.addEventListener("click", () => {
          const goodTitle = (elem.children[1] as HTMLElement).innerText;
          const thisGoodMain = document.querySelector(
            `.${goodTitle.split(" ").join("")}`
          )!.children[0] as HTMLElement;
          binPopup?.classList.remove("show_bin");
          thisGoodMain!.click(); // симулируем клик по элементу на стартовой странице, чтобы не писать больше
        });
      });
    }

    function isBinEmpty() {
      if (localStorage.length <= 1) {
        finalSumBuy?.classList.remove('sum_show')
        binIsEmpty?.classList.add("is_empty");
      } else {
        finalSumBuy?.classList.add('sum_show')
        binIsEmpty?.classList.remove("is_empty");
      }
    }

    function goodPriceCounter() {
      const allPrices = document.querySelectorAll('.good_b_price')
      const confirmSum = document.querySelector('.final_sum') as HTMLElement
      checkSum()
      
      allPrices.forEach(price => {
        const priceMoney = +((price as HTMLElement).innerText.slice(0, -1))
        let actualPrice = +((price as HTMLElement).innerText.slice(0, -1))
        const lessGood = price.parentElement?.children[2].children[0] as HTMLElement
        const moreGood = price.parentElement?.children[2].children[2] as HTMLElement
        const countOfGood = price.parentElement?.children[2].children[1] as HTMLElement
        let counter = 1
        
        moreGood?.addEventListener('click', () => {
          counter++
          countOfGood!.innerText = (counter).toString();
          actualPrice += priceMoney;
          (price as HTMLElement).innerText = actualPrice.toString() + '₴'
          checkSum()
        })

          lessGood?.addEventListener('click', () => {
            if(counter > 1) {
              counter--
              countOfGood!.innerText = (counter).toString();
              actualPrice -= priceMoney;
              (price as HTMLElement).innerText = actualPrice.toString() + '₴'
              checkSum()
            }
          })
      })

      function checkSum() {
        let finalSum = 0
        const allSums = document.querySelectorAll('.good_b_price')
        allSums.forEach(sum => {
          finalSum += +((sum as HTMLElement).innerText.slice(0, -1))
        })
        confirmSum!.innerText = finalSum.toString() + '₴'
      }
    }

  }

  openBin() {
    const headerLogo = document.querySelector(".header_logo");
    const searchInput = document.querySelector(".input");
    const binCloseElements = [headerLogo, searchInput];
    const temporeryBinIcons = document.querySelectorAll(".put_image");

    temporeryBinIcons.forEach((elem) => {
      if (elem.getAttribute("put-bin") === "false") {
        elem.addEventListener("click", () => {
          binIco!.click();
        });
      }
    });

    binIco.addEventListener("click", () => {
      this.isBinEmpty();

      binPopup?.classList.add("show_bin");
      body?.classList.add("no_scroll");

      binCloseElements.forEach((elem) => {
        elem?.addEventListener("click", () => {
          binPopup?.classList.remove("show_bin");
          body?.classList.remove("no_scroll");
          location.reload();
        });
      });
    });
  }

  isBinEmpty() {
    if (localStorage.length <= 1) {
      finalSumBuy?.classList.remove('sum_show')
      binIsEmpty?.classList.add("is_empty");
    } else {
      finalSumBuy?.classList.add('sum_show')
      binIsEmpty?.classList.remove("is_empty");
    }
  }

  priceAndStockCounter() {

  }
}

export default ProductBin;
