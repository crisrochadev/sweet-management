<template>
  <div class="w-full h-full bg-gray-800">
    <div class="relative overflow-y-auto h-full">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nome do Quadro</th>
            <th scope="col" class="px-6 py-3">Data</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="item in list"
            :key="item.id"
          >
            <td class="px-6 py-4">{{ item.title }}</td>
            <td class="px-6 py-4 w-40">{{ moment(item.date).format('DD/MM/YYYY HH:MM')}}</td>
            <td class="px-6 py-4 w-40">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  @click="$emit('openBoard', item)"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  <i class="fas fa-download"></i>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ["boards"],
  emits: ["update:boards", "openBoard"],
  computed: {
    list: {
      get() {
        return this.boards;
      },
      set(newboards) {
        this.$emit("update:boards", newboards);
      },
    },
  },
  data(){
    return {
        moment
    }
  }
};
</script>

<style></style>
