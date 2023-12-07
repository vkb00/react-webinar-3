import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentItem: { d: "2" }
    }
  }

  async getAllProductsCount() {
    const responce = await fetch('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count');
    const json = await responce.json();
    const count = json.result.count;
    return count;
  }

  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
