<template>
  <div
    class="text-white flex justify-center items-center gap-1 absolute flex-col h-full px-2"
  >
    <button
      class="w-8 h-8 shadow-md bg-gray-600 rounded active:text-pink-300 active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] relative"
      :class="{
        'text-pink-300': tool == item.title,
        'shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]': tool === item.title,
      }"
      v-for="item in menu"
      :key="item.id"
      @click="executeCommand(item)"
    >
      <i v-if="item.icon" class="fas" :class="item.icon"></i>
      <template v-else>
        <span v-if="item.command.endsWith('eraser')">{{ we }}</span>
        <span v-if="item.command.endsWith('pencil')">{{ wp }}</span>
      </template>
      <input
        :id="item.command"
        class="invisible h-0 absolute bottom-full left-0"
        type="color"
        v-model="item.value"
        @change="(e) => changeValue(item.command, e.target.value)"
      />
      <input
        @blur="showRange = null"
        :id="item.command"
        min="1"
        max="100"
        v-model="value"
        v-if="showRange === item.command"
        class="slider bg-white h-2 absolute top-full -left-[75%] rotate-[-90deg]"
        type="range"
        @change="(e) => changeValue(item.command, e.target.value)"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: ["eraserWidth", "pencilWidth", "projectName"],
  emits: [
    "update:projectName",
    "update:eraserWidth",
    "update:pencilWidth",
    "handle-paint",
    "handle-list",
    "handle-eraser",
    "handle-save",
    "handle-new",
    "handle-clear",
    "set-bg",
    "set-color",
  ],
  data() {
    return {
      openEdit: false,
      setColor: null,
      menu: [
        {
          id: 1,
          title: "pencil",
          icon: "fa-pencil",
          command: "handle-paint",
          active: false,
        },
        {
          id: 6,
          title: "erase-stroke",
          command: "show-range-pencil",
        },
        {
          id: 2,
          icon: "fa-eraser",
          title: "erase",
          command: "handle-eraser",
          active: false,
        },
        {
          id: 5,
          title: "erase-stroke",
          command: "show-range-eraser",
        },
        {
          id: 3,
          icon: "fa-palette",
          title: "color",
          command: "open-color",
          active: false,
        },
        {
          id: 4,
          icon: "fa-fill",
          title: "bg",
          command: "open-bg",
          active: false,
        },
      ],
      tool: "pencil",
      showRange: null,
    };
  },
  computed: {
    we: {
      get() {
        return this.eraserWidth;
      },
      set(newew) {
        this.$emit("update:eraserWidth", newew);
      },
    },
    wp: {
      get() {
        return this.pencilWidth;
      },
      set(newep) {
        this.$emit("update:pencilWidth", newep);
      },
    },
    value: {
      get() {
        if (this.showRange === "show-range-pencil") return this.wp;
        if (this.showRange === "show-range-eraser") return this.we;
      },
      set(newvalue) {
        if (this.showRange === "show-range-pencil") this.wp = newvalue;
        if (this.showRange === "show-range-eraser") this.we = newvalue;
      },
    },
    nameProject: {
      get() {
        return this.projectName;
      },
      set(newname) {
        this.$emit("update:projectName", newname);
      },
    },
  },
  methods: {
    executeCommand(item) {
      if (item.command.startsWith("handle")) {
        if (
          !item.command.endsWith("clear") &&
          !item.command.endsWith("save") &&
          !item.command.endsWith("new")
        )
          this.tool = item.title;
        this.$emit(item.command);
        item["active"] = null;
        return;
      }
      if (item.command.startsWith("open")) {
        let input = document.getElementById(item.command);
        input.click();
        item["active"] = null;
        return;
      }
      if (item.command.startsWith("show")) {
        this.showRange = item.command;
        console.log(item.command);
        return;
      }
    },
    changeValue(command, color) {
      if (command.endsWith("bg")) this.$emit("set-bg", color);
      if (command.endsWith("color")) this.$emit("set-color", color);
    },
  },
};
</script>

<style scoped>
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100px; /* Full-width */
  height: 10px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  translate: rotate(-360deg);
  position: absolute;
  left: 0;
  border-radius: 50px;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  border-radius: 100%;
  width: 15px; /* Set a specific slider handle width */
  height: 15px; /* Slider handle height */
  background: #d54036; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #d54036; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
