<template>
  <canvas
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mousemove="mousemove"
    @touchstart="mousedown"
    @touchend="mouseup"
    @touchmove="mousemove"
    class="w-full h-full"
    :style="{ background: bg, cursor: `url('/images/${curTool}.cur'),auto` }"
  >
  </canvas>
</template>

<script>
export default {
  props: ["bgColor", "tool", "color", "lineWidth", "isList", "board", "id"],
  emits: ["update:color", "update:lineWidth", "update:board"],
  data() {
    return {
      context: null,
      brush: {
        active: false,
        erase: false,
        move: false,
        pos: {
          x: 0,
          y: 0,
        },
        lineWidth: null,
        color: null,
        beforePos: null,
      },
    };
  },
  computed: {
    curBoard: {
      get() {
        return this.board;
      },
      set(newvalue) {
        this.$emit("update:board", newvalue);
      },
    },

    bg() {
      return this.bgColor;
    },
    curTool() {
      return this.tool;
    },
    curColor: {
      get() {
        return this.color;
      },
      set(newvalue) {
        this.$emit("update:color", newvalue);
      },
    },
    curLineWidth: {
      get() {
        return this.lineWidth;
      },
      set(newvalue) {
        this.$emit("update:lineWidth", newvalue);
      },
    },
    curContext: {
      get() {
        return this.context;
      },
      set(newcontext) {
        this.context = newcontext;
      },
    },
  },
  watch: {
    color(newcolor) {
      this.brush.color = newcolor;
    },
    curLineWidth(newwidth) {
      this.brush.lineWidth = newwidth;
    },
    isList(newvalue) {
      if (!newvalue) {
        this.brush.active = false;
      }
    },
  },
  mounted() {
    let painter = this.$el;
    console.log(this.curBoard);
    if (painter) {
      this.context = painter.getContext("2d");
      const rect = painter.getBoundingClientRect();
      painter.width = rect.width;
      painter.height = rect.height;

      this.context.lineWidth = this.curLineWidth;
      this.context.strokeStyle = this.curColor;

      this.cycle();
      this.loadDrawing();
    }
  },

  methods: {
    cycle() {
      if (this.brush.active && this.brush.move && this.brush.beforePos) {
        this.draw({ ...this.brush });
        this.brush.move = false;
      }
      this.brush.beforePos = { ...this.brush.pos };

      requestAnimationFrame(this.cycle);
    },
    mousedown(evt) {
      this.brush.active = true;
      console.log(this.curBoard);
      this.curBoard.lines.push([]);
    },
    mouseup(evt) {
      this.brush.active = false;
      this.$parent.saveBoard();
    },
    mousemove(evt) {
      this.brush.pos.x = evt.clientX;
      this.brush.pos.y = evt.clientY;
      this.brush.move = true;
    },
    draw(line) {
      const point = {
        x: line.pos.x,
        y: line.pos.y,
        color: line.color,
        lineWidth: line.lineWidth,
      };

      this.curBoard.lines[this.curBoard.lines.length - 1].push(point);

      this.curContext.beginPath();
      this.curContext.moveTo(line.beforePos.x, line.beforePos.y);
      this.curContext.lineTo(line.pos.x, line.pos.y);
      this.curContext.strokeStyle = line.color;
      this.curContext.lineWidth = line.lineWidth;
      this.curContext.stroke();
    },
    loadDrawing() {
      if (this.curBoard) {
        this.curColor = this.curBoard.color;
        this.curLineWidth = this.curBoard.lineWidth;
        this.curBoard = {
          id: this.curBoard.id,
          color: this.curBoard.color,
          lineWidth: this.curBoard.lineWidth,
          lines: this.curBoard.lines,
        };
        this.redraw();
      }
    },
    redraw() {
      this.curContext.clearRect(0, 0, this.$el.width, this.$el.height);

      this.curBoard.lines.forEach((line) => {
        if (line.length > 0) {
          this.curContext.beginPath();
          this.curContext.moveTo(line[0].x, line[0].y);

          for (let i = 1; i < line.length; i++) {
            const point = line[i];
            this.curContext.lineTo(point.x, point.y);
            this.curContext.strokeStyle = point.color;
            this.curContext.lineWidth = point.lineWidth;
            this.curContext.stroke();
          }
        }
      });
    },
  },
};
</script>

<style></style>
