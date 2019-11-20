/*global Vue*/
/*global axios*/

var app = new Vue({
  el: '#admin',
  data: {
    name: "",
    price: 0,
    image: "",
    products: [],
  },

  created() {
    this.getProducts();
  },

  methods: {
    async addProduct() {
      try {
        let product = await axios.post('/api/products', {
          name: this.name,
          price: this.price,
          image: this.image,
          count: 0
        });
        this.getProducts();
      }
      catch (error) {
        console.log(error);
      }
    },

    async incrementCount(product) {
      try {
        let response = await axios.put('/api/products/' + product._id);
        this.getProducts();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

    async deleteProduct(product) {
      try {
        let resonse = axios.delete('/api/products/' + product._id);
        this.getProducts();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },

    async getProducts() {
      try {
        let response = await axios.get('/api/products');
        this.products = response.data;
        // this.products.sort((a, b) => (a.votes < b.votes) ? 1 : -1);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
  }
});
