import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cartKey = 'cart';

  constructor() { }

  getCartItems(): any[]{
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  addToCart(book: any): void{
    const cartItems = this.getCartItems();
    cartItems.push(book);
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems))
  }

  removeFromCart(bookId: number): void{
    console.log("Id: "+bookId)
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(item => item.id_libro !== bookId);
    console.log("Filtro: "+cartItems)
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  clearCart():void{
    localStorage.removeItem(this.cartKey);
  }
}
