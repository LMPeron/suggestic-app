import http from "@/http-common";

export default class ProductService {
  async flattenItemService(items) {
    return http
      .post("/api/v1.0/item", { items })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async flattenItemAndSaveService(items) {
    return http
      .post("/api/v1.0/item/save", { items })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getLastSequencesService() {
    return http
      .get("/api/v1.0/item")
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllHistoryItemsService() {
    return http
      .get("/api/v1.0/item/all")
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async deleteItemService(itemId) {
    return http
      .delete(`/api/v1.0/item/${itemId}`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
