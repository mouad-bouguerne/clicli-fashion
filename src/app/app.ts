
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  cat: string;
  price: number;
  img: string;
  tag?: string;
  desc: string;
  colors: [string, string][];
}

interface CartLine {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  qty: number;
  img: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sizes = ['S', 'M', 'L', 'XL'];

  categories = ['Tout', 'Ensembles', 'Pulls', 'Blousons'];
  selectedCategory = 'Tout';

  products: Product[] = [
    {
      id: 1, name: 'Ensemble Coupe-Vent Paris',
      cat: 'Ensembles', price: 89.99, img: '/img/p1.webp',
      tag: 'Nouveau',
      desc: 'Veste à capuche zippée, poches zippées, pantalon à cordon. Tour Eiffel brodée.',
      colors: [
        ['Gris bleu', '#7C8EA3'], ['Noir', '#0A0A0A'],
        ['Sable', '#CDBFA6'], ['Vert sapin', '#2F4A3A']
      ]
    },
    {
      id: 2, name: 'Ensemble Liserés',
      cat: 'Ensembles', price: 89.99, img: '/img/p2.webp',
      desc: 'Veste à capuche et pantalon, liserés crème, poignets et chevilles élastiqués.',
      colors: [
        ['Bordeaux', '#6B1E2A'], ['Noir', '#0A0A0A'],
        ['Marine', '#1E2A44'], ['Vert sapin', '#2F4A3A']
      ]
    },
    {
      id: 3, name: 'Ensemble Molleton Zip',
      cat: 'Ensembles', price: 89.99, img: '/img/p3.webp',
      desc: 'Sweat à capuche, zip double curseur et pantalon droit à plis marqués.',
      colors: [
        ['Gris chiné', '#C4C6C8'], ['Noir', '#0A0A0A'],
        ['Écru', '#E8E2D4'], ['Marine', '#1E2A44']
      ]
    },
    {
      id: 4, name: 'Ensemble Molleton Tour',
      cat: 'Ensembles', price: 89.99, img: '/img/p4.webp',
      tag: 'Best-seller',
      desc: 'Sweat zippé à capuche et pantalon droit, tour Eiffel gaufrée en relief.',
      colors: [
        ['Prune', '#4A1626'], ['Noir', '#0A0A0A'],
        ['Gris chiné', '#C4C6C8'], ['Sauge', '#8A9A84']
      ]
    },
    {
      id: 5, name: 'Ensemble Track Chaîne',
      cat: 'Ensembles', price: 89.99, img: '/img/p5.webp',
      desc: 'Veste col montant et pantalon droit, bandes latérales à motif chaîne.',
      colors: [
        ['Noir et vert', '#0A0A0A'], ['Noir et blanc', '#2A2A2A'],
        ['Marine et blanc', '#1E2A44'], ['Bordeaux et blanc', '#6B1E2A']
      ]
    },
    {
      id: 6, name: 'Ensemble Nylon Col Crème',
      cat: 'Ensembles', price: 89.99, img: '/img/p6.webp',
      desc: 'Veste à col contrasté et pantalon à cordon, coupe fluide.',
      colors: [
        ['Chocolat', '#4A3426'], ['Noir', '#0A0A0A'],
        ['Gris', '#8A8D91'], ['Olive', '#5A5E3A']
      ]
    },
    {
      id: 7, name: 'Pull Trèfle',
      cat: 'Pulls', price: 39.99, img: '/img/p7.webp',
      desc: 'Pull col rond en maille, écusson trèfle brodé en noir.',
      colors: [
        ['Écru', '#E8E0CC'], ['Noir', '#0A0A0A'],
        ['Gris', '#8A8D91'], ['Marine', '#1E2A44']
      ]
    },
    {
      id: 8, name: 'Pull Initiale C',
      cat: 'Pulls', price: 39.99, img: '/img/p8.webp',
      desc: 'Pull col rond en maille, initiale en bouclette et signature brodée.',
      colors: [
        ['Marine', '#1E2A44'], ['Noir', '#0A0A0A'],
        ['Écru', '#E8E0CC'], ['Bordeaux', '#6B1E2A']
      ]
    },
    {
      id: 9, name: 'Blouson Cuir Rosace',
      cat: 'Blousons', price: 99.99, img: '/img/p9.webp',
      tag: 'Nouveau',
      desc: 'Blouson à appliqués rosaces, ourlet élastiqué, doublure matelassée.',
      colors: [
        ['Marron', '#3A241C'], ['Noir', '#0A0A0A'],
        ['Bordeaux', '#4A1626'], ['Camel', '#A27A52']
      ]
    },
    {
      id: 10, name: 'Blouson Cuir Abstrait',
      cat: 'Blousons', price: 99.99, img: '/img/p10.webp',
      desc: 'Blouson col chemise, appliqués abstraits noir et crème.',
      colors: [
        ['Noir et crème', '#0A0A0A'], ['Marron et crème', '#3A241C'],
        ['Gris et crème', '#6A6D71'], ['Bordeaux et crème', '#4A1626']
      ]
    },
    {
      id: 11, name: 'Blouson Atelier Éternel',
      cat: 'Blousons', price: 99.99, img: '/img/p11.webp',
      tag: 'Vue de dos',
      desc: 'Blouson col chemise, grand écusson brodé dans le dos, étoiles sur les manches.',
      colors: [
        ['Noir', '#0A0A0A'], ['Marron', '#3A241C'],
        ['Bordeaux', '#4A1626'], ['Gris anthracite', '#3A3D41']
      ]
    }
  ];

  selectedColors: { [id: number]: number } = {};
  selectedSizes: { [id: number]: string } = {};
  messages: { [id: number]: string } = {};

  cart: CartLine[] = [];
  cartOpen = false;

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Tout') {
      return this.products;
    }
    return this.products.filter(
      p => p.cat === this.selectedCategory
    );
  }

  get cartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  get total(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.qty, 0
    );
  }

  get shippingMessage(): string {
    if (this.total === 0) return '';
    if (this.total >= 150) return 'Livraison offerte.';
    return `Plus que ${this.format(150 - this.total)} pour la livraison offerte.`;
  }

  format(price: number): string {
    return price.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    });
  }

  getColorIndex(product: Product): number {
    return this.selectedColors[product.id] ?? 0;
  }

  getImage(product: Product): string {
    return product.img;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  selectColor(product: Product, index: number): void {
    this.selectedColors[product.id] = index;
  }

  selectSize(product: Product, size: string): void {
    this.selectedSizes[product.id] = size;
    this.messages[product.id] = '';
  }

  addToCart(product: Product): void {
    const size = this.selectedSizes[product.id];

    if (!size) {
      this.messages[product.id] =
        'Choisissez une taille (S, M, L ou XL).';
      return;
    }

    const colorIndex = this.getColorIndex(product);
    const color = product.colors[colorIndex][0];

    const existing = this.cart.find(item =>
      item.id === product.id &&
      item.color === color &&
      item.size === size
    );

    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color,
        size,
        qty: 1,
        img: this.getImage(product)
      });
    }

    this.messages[product.id] =
      `Ajouté : ${color}, taille ${size}.`;
  }

  increase(index: number): void {
    this.cart[index].qty++;
  }

  decrease(index: number): void {
    this.cart[index].qty--;
    if (this.cart[index].qty < 1) {
      this.cart.splice(index, 1);
    }
  }

  removeItem(index: number): void {
    this.cart.splice(index, 1);
  }

  openCart(): void {
    this.cartOpen = true;
  }

  closeCart(): void {
    this.cartOpen = false;
  }

  checkoutMessage = '';

  checkout(): void {
    this.checkoutMessage = this.cart.length
      ? "Le paiement en ligne sera disponible à l'ouverture de la boutique."
      : 'Ajoutez un article avant de commander.';
  }
}
