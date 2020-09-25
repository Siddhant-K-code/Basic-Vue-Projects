new Vue({
  el: "#app",
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 10,
      pages: [],
      icon: [
        "invert_colors",
        "label",
        "lock",
        "lock_open",
        "extension",
        "favorite",
        "home",
        "info",
        "language",
        "pets",
        "print",
        "receipt",
        "schedule",
        "search",
        "shopping_cart",
        "star_rate",
        "support",
        "thumb_up",
        "turned_in",
        "visibility",
        "work",
        "warning",
        "album",
        "loop",
        "mic",
        "videocam",
        "call",
        "business",
        "chat",
        "email",
        "location_on",
        "rss_feed",
        "vpn_key",
        "block",
        "content_copy",
        "content_cut",
        "link",
        "send",
        "save",
        "weekend",
        "access_alarm",
        "battery_full",
        "bluetooth",
        "devices",
        "sd_storage",
        "usb",
        "storage",
        "attach_money",
        "highlight",
        "insert_chart",
        "publish",
        "cloud",
        "attachment",
        "folder",
        "computer",
        "headset",
        "keyboard_arrow_down",
        "keyboard_arrow_left",
        "keyboard_arrow_up",
        "keyboard_arrow_right",
        "mouse",
        "audiotrack",
        "bedtime",
        "brush",
        "camera_alt",
        "color_lens",
        "colorize",
        "edit",
        "flash_on",
        "photo",
        "directions_bus",
        "flight",
        "fastfood",
        "layers",
        "local_cafe",
        "local_offer",
        "local_parking",
        "map",
        "restaurant",
        "apps",
        "check",
        "close",
        "more",
        "ac_unit",
        "spa",
        "smoking_rooms",
        "architecture",
        "cake",
        "luggage",
        "mood",
        "person",
        "school",
        "share",
        "sports_esports",
        "build",
        "code",
        "delete",
        "eco",
        "explore",
        "exit_to_app"
      ]
    };
  },
  methods: {
    // get the 100 items list
    getItems() {
      for (i = 0; i < 100; i++) {
        let template = `<span class="material-icons">${this.icon[i]}</span>
                <p>${i + 1}</p>`;
        this.items.push(template);
      }
    },
    // separate items per page.
    // Ex: Page 2 -> from item 11 to 20
    pagination(items) {
      let currentPage = this.currentPage;
      let perPage = this.perPage;

      let start = currentPage * perPage - perPage;
      let end = currentPage * perPage;

      return items.slice(start, end);
    },

    // generate number of pages
    setPages() {
      // N of items (100) / 10 items per page
      let numberOfPages = Math.ceil(this.items.length / this.perPage);

      //generate 10 pages (100 / 10)
      for (i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    }
  },
  computed: {
    // display the items per page
    displayedItems() {
      return this.pagination(this.items);
    },
    displayedPages() {
      // if currentPage is page 1
      if (this.currentPage === 1) {
        return this.pages.slice(this.currentPage - 1, this.currentPage + 4);
      }
      // if currentPage is the last page
      else if (this.currentPage === this.pages.length) {
        return this.pages.slice(this.currentPage - 5, this.currentPage + 1);
      }
      // if currentPage is between 4-7
      else if (this.currentPage >= 4 && this.currentPage <= 7) {
        return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
      }
      // if currentPage more than 7
      else if (this.currentPage > 7) {
        return this.pages.slice(this.currentPage - 4, this.currentPage + 1);
      }
      // if currentPage less than 4
      else {
        return this.pages.slice(this.currentPage - 2, this.currentPage + 3);
      }
    }
  },
  watch: {
    //how many pages to display
    items() {
      this.setPages();
    }
  },

  // create the array of items
  created() {
    this.getItems();
  }
});
