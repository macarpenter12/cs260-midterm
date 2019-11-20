/*global Vue*/
/*global axios*/

var app = new Vue({
  el: '#app',
  data: {
    products: [],
    cart: [],
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        let response = await axios.get("/api/products");
        this.products = response.data;
        this.products.sort((a, b) => (a.name > b.name) ? 1 : -1);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

    async submitPurchase() {
      this.cart = [];
      for (let i = 0; i < this.products.length; ++i) {
        let product = this.products[i];
        if (product.checked) {
          let purchaseResponse = await axios.put('/api/products/' + product._id);
          this.cart.push(product);
        }
      }
      this.getProducts();
    },

  },
});
