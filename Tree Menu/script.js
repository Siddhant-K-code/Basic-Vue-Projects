"use strict";

var treeData = {
  name: "Group",
  children: [
    {
      name: "Sub Group",
      children: [
        {
          name: "Item"
        },
        {
          name: "Item"
        }
      ]
    },
    {
      name: "Item"
    }
  ]
};
Vue.component("item", {
  template: `<li :class="[isFolder ? 'folder' : 'file']">
    <label
      :class="{'open': open}"
      @click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">{{ isFolder ? model.children.length : '' }}</span>
    </label>
    <ul v-show="open" v-if="isFolder" :class="{'open': open}">
      <item
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </item>
      <li class="add" @click="addChild"><label>Add New Item</label></li>
    </ul>
  </li>`,
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    };
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, "children", []);
        this.addChild();
        this.open = true;
      }
    },
    addChild: function () {
      this.model.children.push({
        name: "New Item"
      });
    }
  }
});
new Vue({
  el: "#app",
  data: {
    treeData: treeData
  }
});
