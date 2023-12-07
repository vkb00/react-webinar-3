import { codeGenerator } from "../../utils";
import { currentItem } from "../exports";
import StoreModule from "../module";

class CurrentItem extends StoreModule {
  constructor(store, name) {
    super(store, name);

  }
  initState() {
    return {
      currentItem: {
        category: { title: '' },
        description: "",
        edition: 0,
        madeIn: { title: '' },
        price: 659.13,
        title: "",
        _id: ""

      },

    }
  }

  async getItemInfo(id) {
    console.log('ci', id)
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentItem: json.result
    }, 'Загружен товар из АПИ');
  }
}


export default CurrentItem;
