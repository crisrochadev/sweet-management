<template>
  <div class="w-screen h-[calc(100vh_-_20px)] relative overflow-hidden">
    <top-menu
      @handle-list="handleList"
      @handle-new="handleNew"
      @handle-clear="handleClear"
      @handle-export="handleExport"
      v-model:boardTitle="boardName"
    />
    <Menu
      v-model:eraserWidth="eraserWidth"
      v-model:pencilWidth="pencilWidth"
      @handle-paint="handlePaint"
      @handle-eraser="handleEraser"
      @set-bg="(color) => (bgColor = color)"
      @set-color="(color) => (pencilColor = color)"
    />

    <painter
      ref="canvas"
      v-model:color="color"
      v-model:bgColor="bgColor"
      :tool="tool"
      v-model:lineWidth="lineWidth"
      v-model:board="board"
      :id="id"
      :bgColor="bgColor"
      :boards="boards"
    />
  </div>
</template>

<script>
import Painter from "@/components/draw/Painter.vue";
import { useStorage } from "@vueuse/core";
import Menu from "@/components/draw/Menu.vue";
import { v4 as uuidv4 } from "uuid";
import TopMenu from "@/components/draw/TopMenu.vue";
export default {
  components: { Painter, Menu, TopMenu },
  data() {
    return {
      color: useStorage("color", "white"),
      bgColor: useStorage("bg", "#424242"),
      pencilColor: useStorage("pencil-color", "white"),
      tool: useStorage("tool", "pencil"),
      lineWidth: 2,
      boards: useStorage("boards", []),
      id: useStorage("boardId", 1),
      canvas: null,
      eraserWidth: useStorage("eraser-width", 7),
      pencilWidth: useStorage("pencil-width", 1),
      board: {},
      boardName:'Nome do Quadro'
    };
  },
  watch: {
    tool(newvalue) {
      if (newvalue === "pencil") {
        this.lineWidth = this.pencilWidth;
        this.color = this.pencilColor;
      }
      if (newvalue === "eraser") {
        this.lineWidth = this.eraserWidth;
        this.color = this.bgColor;
      }
    },
    eraserWidth(newvalue) {
      if (this.tool === "eraser") {
        this.lineWidth = newvalue;
      }
    },
    pencilWidth(newvalue) {
      if (this.tool === "pencil") {
        this.lineWidth = newvalue;
      }
    },
    pencilColor(newvalue) {
      if (this.tool === "pencil") {
        this.color = newvalue;
      }
    },
  },
  created() {
    if (this.boards.length === 0) {
      this.boards.push({
        id: this.id,
        lines: [],
      });
    }
    this.board = this.boards.find((board) => board.id === this.id);
  },
  methods: {
    handlePaint() {
      this.tool = "pencil";
    },
    handleEraser() {
      this.tool = "eraser";
    },
    saveBoard() {
      let index = this.boards.findIndex((board) => board.id === this.id);
      this.boards[index] = this.board;
    },
    handleList() {},
    handleNew() {
      console.log("new");
      this.canvas = this.$refs.canvas.$el;
      this.$refs.canvas.curContext.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.id = uuidv4();
      console.log(this.id);
      this.boards.push({
        id: this.id,
        lines: [],
      });
    },
    handleClear() {
      this.canvas = this.$refs.canvas.$el;
      this.$refs.canvas.curContext.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      let index = this.boards.findIndex((board) => board.id === this.id);
      console.log(index);
      this.boards[index].lines = [];
    },
    handleExport() {},
  },
};
</script>

<style Painter></style>
