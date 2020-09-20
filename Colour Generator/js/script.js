const ColourSlider = {
  template: '#colour-slider-template',
  props: {
    col: {
      type: String,
      default: ''
    },
    val: {
      type: Number,
      default: 0
    }
  },
  methods: {
    sendSliderValue(e) {
      const value = Number(e.target.value);
      this.emitValue(value);
    },
    emitValue(value) {
      this.$parent.$emit('slidervalue', { col: this.col, value });
    }
  },
  computed: {
    vmodel: {
      get() {
        return this.val
      },
      set(val) {}
    }
  },
  watch: {
    vmodel: function (value) {
      this.emitValue(value);
    }
  }
}

const UtilsMixin = {
  methods: {
    hex(value) {
      const n = Math.abs(value).toString(16);
      return n < 10 ? `0${n}` : n.toUpperCase();
    },
    convertHexToNum(a, b) {
      return parseInt(`${a}${b}`, 16);
    },
    randomNum(n) {
      return Math.round(Math.random(n) * n) -1;
    },
    hexColour(r, g, b) {
      return `${this.hex(r)}${this.hex(g)}${this.hex(b)}`;
    },
    randomise() {
      this.red = this.randomNum(256);
      this.green = this.randomNum(256);
      this.blue = this.randomNum(256);
    },
    isValidHex(str) {
      const rule = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm;
      return rule.test(str);
    }
  },
  computed: {
    getBgColour() {
      const hex = this.hexColour(this.red, this.green, this.blue);
      return {
        'background-color': `#${hex}`
      }
    }
  }
}

const ColourPicker = {
  template: '#colour-picker-template',
  data: () => ({
    red: 0,
    green: 0,
    blue: 0,
    coloursArray: [],
    randomState: true,
    errorMessage: ''
  }),
  mixins: [UtilsMixin],
  methods: {
    addColour(r, g, b) {
      this.errorMessage = '';
      const id = this.coloursArray.length;
      const hex = `#${this.hexColour(r, g, b)}`;
      this.coloursArray.push({rgb:`rgb(${r}, ${g}, ${b})`, hex, id});
      if (this.randomState) {
        this.randomise();
      }
    },
    deleteColour(id) {
      let counter = 0;
      this.coloursArray = this.coloursArray.filter(item => {
        if (item.id !== id) {
          item.id = counter++;
          return item;
        }
      });
    },
    updateSliders(e) {
      const str = e.target.value;
      this.errorMessage = '';
      if (!this.isValidHex(str) || str.length > 7) {
        this.errorMessage = 'Error: enter a valid hex value';
        return;
      } else {
        const { 1:r1, 2:r2, 3:g1, 4:g2, 5:b1, 6:b2 } = str.split('');
        this.red = this.convertHexToNum(r1, r2);
        this.green = this.convertHexToNum(g1, g2);
        this.blue = this.convertHexToNum(b1, b2);
      }
    },
    clearAll() {
      this.coloursArray = [];
    }
  },
  mounted() {
    this.randomise();
    this.$on('slidervalue', ({col, value}) => {
      if (this.errorMessage.length) {
        this.errorMessage = '';
      }
      this[col] = value;
    });
  }
}

new Vue({
  el: "#app",
  components: {
    ColourPicker,
    ColourSlider
  }
});