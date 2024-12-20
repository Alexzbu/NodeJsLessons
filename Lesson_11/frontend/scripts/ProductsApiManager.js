class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData('/products')
  }
  static async getProductById(id) {
    return RequestManager.fetchData(`/products/${id}`)
  }
  static async addProduct(data, id) {
    return RequestManager.doPostRequest(`/products/add/${id}`, data, './list.html')
  }
  static async deleteProduct(id) {
    return RequestManager.deleteRequest(`/products/delete`, id)
  }
}
