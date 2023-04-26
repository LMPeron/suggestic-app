<template>
  <div class="">
    <div class="card p-fluid">
      <div class="flex">
        <div class="col-6">
          <h5 class="pb-3 pt-3">
            <b>Flatten Sequence</b>
          </h5>
        </div>
        <div class="col-6">
          <div class="flex">
            <div class="col-6 text-end self-center">
              <label class="p-checkbox-label" for="autoSaveEnabled"
                >Auto Save</label
              >
            </div>
            <div class="col-6">
              <toggle-button
                @change="onAutoSaveEnabled()"
                v-model="autoSaveEnabled"
                onLabel="On"
                offLabel="Off"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field" style="">
        <label for="name1"> Sequence </label>
        <InputText
          v-model="sequence"
          id="name1"
          @keyup.enter="save"
          type="text"
          style="border-radius: 10px; height: 45px"
        />
      </div>

      <div class="field" v-if="hasFormattedSequence">
        <label for="name1"> Flatenned </label>
        <p>
          {{ flatenedSequence }}
        </p>
      </div>

      <div class="button-holder">
        <div class="w-20">
          <Button
            :loading="loading"
            :disabled="loading"
            @click="executeFlatten()"
            class="mt-4"
            label="Flatten"
          ></Button>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <DataTable
        v-if="lastSequences.length > 0"
        :value="lastSequences"
        responsiveLayout="scroll"
      >
        <Column field="value" header="Sequence"></Column>
        <Column field="formatted" header="Formatted"></Column>
        <Column field="created_at" header="Date">
          <template #body="slotProps">
            <div>
              {{ new Date(slotProps.data.created_at).toLocaleString() }}
            </div>
          </template>
        </Column>
        <Column header="Delete">
          <template #body="slotProps">
            <div>
              <Button
                icon="pi pi-trash"
                :disabled="loading"
                @click="deleteItemFromHistory(slotProps.data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import useUserState from "@/stores/user";
import router from "@/router";
import ItemService from "@/service/ItemService";

export default {
  data() {
    return {
      sequence: "",
      flatenedSequence: [],
      userState: useUserState(),
      autoSaveEnabled: false,
      lastSequences: [],
      loading: false,
    };
  },
  methods: {
    async executeFlatten() {
      try {
        this.loading = true;
        let flattenedSequence;
        if (this.autoSaveEnabled) {
          flattenedSequence = await this.itemService.flattenItemAndSaveService(
            JSON.parse(this.sequence)
          );
          this.getLastSequences();
        } else
          flattenedSequence = await this.itemService.flattenItemService(
            JSON.parse(this.sequence)
          );
        this.flatenedSequence = flattenedSequence.result;
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

    async getLastSequences() {
      try {
        this.loading = true;
        const lastSequencesResponse =
          await this.itemService.getLastSequencesService();
        this.lastSequences = lastSequencesResponse.result;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteItemFromHistory(itemId) {
      try {
        this.loading = true;
        await this.itemService.deleteItemService(itemId);
        this.getLastSequences();
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

    async onAutoSaveEnabled() {
      if (this.autoSaveEnabled && this.userState.user === null) {
        router.push("/login");
      }
    },
  },

  computed: {
    hasFormattedSequence() {
      return this.flatenedSequence.length > 0;
    },
  },
  created() {
    this.itemService = new ItemService();
  },
  mounted() {
    this.getLastSequences();
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.w-20 {
  width: 20%;
}

.text-end {
  text-align: end;
}

.self-center {
  align-self: center;
}

.mt-2 {
  margin-top: 2rem !important;
}

.button-holder {
  display: flex;
  justify-content: center;
}
</style>
