"use strict";

new Vue({
  el: "#app",
  data: {
    activeImage: "",
    pair: "",
    pairs: 0,
    images: [
      "🌈",
      "☔️",
      "🐹",
      "🎺",
      "🐬",
      "🦚",
      "🦧",
      "🕸",
      "🦩",
      "🐠",
      "🐓",
      "🍄",
      "🌻",
      "🌞",
      "🐿",
      "🌏",
      "🌝",
      "❄️",
      "🌹",
      "☃️",
      "🍇",
      "🍓",
      "🍈",
      "🥑",
      "🥦",
      "🍞",
      "🥔",
      "🍗",
      "🌮",
      "🥃",
      "🏓",
      "🏵",
      "🎹",
      "🦨",
      "☠️",
      "🤡",
      "💩",
      "🤯",
      "😱",
      "🥰",
      "🎃",
      "🤖",
      "😻",
      "🚗",
      "✈️",
      "🚀",
      "🏜",
      "🎆",
      "💾",
      "⏰"
    ]
      .flatMap((i) => [i, i])
      .sort(() => Math.random() - 0.5)
  },
  methods: {
    select: function (event) {
      // show selected card
      event.target.classList.add("active"); // fill in both variables

      this.activeImage == ""
        ? (this.activeImage = event.target.innerHTML)
        : (this.pair = event.target.innerHTML); // see the other selected card and then remove active class

      var unpaired = Array.from(document.getElementsByTagName("li"));
      this.activeImage != "" &&
        this.pair != "" &&
        setTimeout(() => {
          unpaired.map((item) => item.classList.remove("active"));
        }, 1000); // compare variables

      if (
        this.activeImage != "" &&
        this.pair != "" &&
        this.activeImage == this.pair
      ) {
        this.pairs = this.pairs + 1;
        var matches = Array.from(
          document.getElementsByClassName(this.activeImage)
        );
        matches.map((pairItem) => pairItem.classList.add("paired"));
        console.log(matches, this.activeImage);
        this.activeImage = "";
        this.pair = "";
      } else if (
        this.activeImage != "" &&
        this.pair != "" &&
        this.activeImage != this.pair
      ) {
        this.activeImage = "";
        this.pair = "";
      }
    }
  }
});
