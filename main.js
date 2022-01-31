var eventBus = new Vue();
Vue.component("product", {
  props: ["premuim"],
  template: `
  <div>
  <div class="product">
        <div class="product-image">
          <img :src="image" />
        </div>
        <div class="product-info">
          <h1>{{message}}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <button
            @click="addCart"
            :disabled="!inStock"
            :class="{test:!inStock}"
          >
            Add 
          </button>
          <button @click="removeCart">
          Remove 
          </button>
          
          <div class="cart">
            <p>{{cart}}</p>
          </div>
        </div>
      </div>
  </div>
 
  `,
  data() {
    return {
      message: "socks",
      image: "./images/socks.jpg",
      inStock: true,
      details: [
        {
          name: "poly",
          percentage: "50%",
        },
        {
          name: "poly",
          percentage: "40%",
        },
        {
          name: "poly",
          percentage: "30%",
        },
      ],
      cart: 0,
    };
  },
  methods: {
    addCart() {
      this.$emit("add-to-cart");
    },
    removeCart() {
      this.$emit("remove-cart");
    },
  },
});

Vue.component("product-review", {
  template: `
  
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
   <input id="name" v-model="name"/>
  </p>
  <p>
  <label for="review">Review:</label>
 <textarea id="review"  v-model="review"></textarea>
  </p>
  <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
   <option>5</option>
   <option>4</option>
   <option>3</option>
   <option>2</option>
   <option>1</option>
   </select>
  </p>

  
      <p>
        <input type="submit" value="submit" />
      </p>
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      eventBus.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    },
  },
});
Vue.component("product-registration", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
  <label for="firstname">FirstName:</label>
  <input id="firstname" v-model="firstname" />
 
  </p>
  <p>
   <label for="lastname">Lastname:</label>
   <input id="lastname" v-model="lastname"/>
  </p>
  <div>
  <label for="date">DOB:</label>
  <input id="date" type="date" v-model="date"/>
  </div>
  <div>
  <input type="submit" value="Submit"/>
  </div>
 
  
  </form>
  `,
  data() {
    return {
      firstname: "",
      lastname: "",
      date: "",
    };
  },
  methods: {
    onSubmit() {
      let registration = {
        firstname: this.firstname,
        lastname: this.lastname,
        date: this.date,
      };
      this.$emit("register-form", registration);
      (this.firstname = ""), (this.lastname = ""), (this.date = "");
    },
  },
});
Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
  <div>
  <span class="tab" :class="{activeTab:selectedTab === tab}" v-for="(tab,index) in tabs" :key="index" @click="selectedTab = tab">{{tab}}</span>
  <div v-show="selectedTab === 'Reviews'">
      
        <p v-if="!reviews.length ">There are no reviews yet</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>{{review.rating}}</p>

            <p>{{review.review}}</p>
          </li>
        </ul>
        <product-review v-show="selectedTab === 'Make a review'" ></product-review>
      </div>
  </div>1
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a review"],
      selectedTab: "Reviews",
    };
  },
});
var app = new Vue({
  el: "#app",
  data: {
    cart: 50,
    premuim: true,
    reviews: [],
    forms: [],
  },
  methods: {
    addCart() {
      this.cart += 1;
    },
    removeCart() {
      this.cart -= 1;
    },

    registerForm(registration) {
      this.forms.push(registration);
    },
  },
  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
  },
});
