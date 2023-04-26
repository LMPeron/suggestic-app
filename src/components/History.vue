<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <DataTable
          v-if="sequenceHistory.length > 0"
          :value="sequenceHistory"
          responsiveLayout="scroll"
        >
          <Column field="value" header="Sequence"></Column>
          <Column field="formatted" header="Formatted"></Column>
          <Column field="created_at" header="Date">
            <template #body="slotProps">
              <div>
                {{ new Date(slotProps.data.created_at).toLocaleString() }}
              </div>
            </template></Column
          >
          <Column header="Delete">
            <template #body="slotProps">
              <div>
                <Button
                  :disabled="loading"
                  icon="pi pi-trash"
                  @click="deleteItemFromHistory(slotProps.data.id)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <div v-else class="ta-center">
          Empty table. There is no information to display.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemService from "@/service/ItemService";
import useUserState from "@/stores/user";
import router from "@/router";

export default {
  data() {
    return {
      loading: false,
      sequenceHistory: [],
      userState: useUserState(),
    };
  },

  methods: {
    async deleteItemFromHistory(itemId) {
      try {
        this.loading = true;
        await this.itemService.deleteItemService(itemId);
        this.getSequenceHistory();
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "An error occurred",
          detail: error.message,
          life: 3000,
        });
      } finally {
        this.loading = false;
      }
    },

    async getSequenceHistory() {
      try {
        this.loading = true;
        const sequenceHistoryResponse =
          await this.itemService.getAllHistoryItemsService();
        this.sequenceHistory = sequenceHistoryResponse.result;
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "An error occurred",
          detail: error.message,
          life: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.itemService = new ItemService();
  },
  mounted() {
    if (this.userState.user === null) {
      router.push("/login");
      return;
    }
    this.getSequenceHistory();
  },
};
</script>

<style scoped lang="scss">
.ta-center {
  text-align: center;
}
</style>
