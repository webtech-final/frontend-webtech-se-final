<template>
  <!-- REFERENCE : https://tailwindui.com/components/application-ui/lists/tables#component-d60e8c748260b622747ec1568ba9c509-->
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-900">
            <tr>
              <th colspan="3" class="px-6 py-3 text-center text-md font-medium text-white uppercase tracking-wider">VERSUS LOG</th>
            </tr>
            </thead>
            <thead class="bg-gray-200">
            <tr>
              <th scope="col" class="w-1/3 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
              <th scope="col" class="w-1/3 px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">RESULT</th>
              <th scope="col" class="w-1/3 px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">SCORE</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(match, index) in matchs" :key="index">
              <td class="text-left px-6 py-4 whitespace-nowrap">
                <span class="text-md font-medium text-gray-900">{{ dateFormater(match.created_at) }}</span>
              </td>
              <td class="text-center px-6 py-4 whitespace-nowrap">
                <span class="text-md font-medium text-gray-900">{{ match.result }}</span>
              </td>
              <td class="text-right px-6 py-4 whitespace-nowrap">
                <span class="text-md font-medium text-gray-900">{{ match.score }}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayHistory from "../../store/playHistory";

export default {
  data() {
    return {
      matchs: [],
    }
  },
  async created() {
    this.fetchVersusPlayHistory();
  },
  methods: {
    async fetchVersusPlayHistory() {
      await PlayHistory.dispatch("fetchVersusPlayHistory");
      this.matchs = PlayHistory.getters.match_versus
    },
    dateFormater(timestamp) {
      let date = new Date(timestamp)
      let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Intl.DateTimeFormat('en-GB', options).format(date)
    },
  }
}
</script>

<style lang='scss' scoped></style>