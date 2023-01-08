export type data = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

class RenderGood {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  constructor(data: data) {
    this.brand = data.brand;
    this.category = data.category;
    this.description = data.description;
    this.discountPercentage = data.discountPercentage;
    this.id = data.id;
    this.images = data.images;
    this.price = data.price;
    this.rating = data.rating;
    this.stock = data.stock;
    this.thumbnail = data.thumbnail;
    this.title = data.title;
  }
  getCard(): string {
    return `
    <div open-popup="true" class="card_picture ${this.title.split(' ').join('')}" price="${this.price*40}" rating="${this.rating}" title="${this.title}" stock="${this.stock}" 
    category="${this.category}" brand="${this.brand}" images="${this.images}" description="${this.description}">
      <img open-popup="true" src="${this.images[0]}" alt="" price="${this.price*40}" rating="${this.rating}" title="${this.title}" stock="${this.stock}" 
      category="${this.category}" brand="${this.brand}" images="${this.images}" description="${this.description}">
    </div>
    <div class="good_item">
    <div class="card_description">
    <div class="card_title" open-popup="true" price="${this.price*40}" rating="${this.rating}" title="${this.title}" stock="${this.stock}" 
    category="${this.category}" brand="${this.brand}" images="${this.images}" description="${this.description}">${this.title}</div>
    <div class="card_rating">⭐${this.rating}</div>
    <div class="card_price">${this.price * 40}<span>₴</span></div>
    <div class="stock">In stock: ${this.stock}</div>
    </div>
    <div put-bin="true" class="put_in_bin"><img class="put_image ${this.title.split(' ').join('')}_bin" goodInfo="${this.title.split(' ').join('')}" put-img="true" put-bin="true" src="./assets/images/bin_green.svg" alt=""></div>
    </div>
    `;
  }
}


export default RenderGood;


