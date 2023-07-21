<template>
  <div
    class="w-full h-10 absolute top-0 right-0 flex items-center justify-between gap-2 px-4  overflow-auto"
  >
    <div
      v-for="(list, index) in menu"
      :key="index"
      class="flex justify-center items-center gap-2"
    >
      <template v-for="item in list" :key="item.id">
        <div v-if="item.showTitle">
            <input type="text" v-model="title" class="py-1 px-2 text-gray-300 uppercase text-xs font-bold bg-transparent focus:outline-none" />
        </div>
        <button
          @click="$emit(item.command)"
          class="min-w-[150px] py-1 text-gray-300 uppercase text-xs font-bold flex justify-center items-center gap-2 px-2 shadow-md bg-gray-600 rounded active:text-pink-300 active:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] relative"
          v-else
        >
          <span> {{ item.label }}</span>
          <i class="fas" :class="item.icon"></i>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
    props:['boardTitle'],
  emits: ["handle-export", "handle-list", "handle-clear", "handle-new", "update:boardTitle"],
  data() {
    return {
      menu: [
        [
          {
            id: 1,
            label: "Quadros",
            icon: "fa-th-list",
            command: "handle-list",
          },
          {
            id: 2,
            label: "Limpar quadro",
            icon: "fa-backspace",
            command: "handle-clear",
          },
        ],
        [
          {
            id: 6,
            showTitle: true,
          },
        ],
        [
          {
            id: 3,
            label: "Novo Quadro",
            icon: "fa-chalkboard",
            command: "handle-new",
          },
          {
            id: 4,
            label: "Exportar Imagem",
            icon: "fa-download",
            command: "handle-export",
          },
        ],
      ],
    };
  },
  computed:{
    title:{
        get(){
            return this.boardTitle
        },
        set(newtitle){
            this.$emit('update:boardTitle', newtitle)
        }
    }
  }
};
</script>

<style></style>
