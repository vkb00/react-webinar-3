import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSortCategory: useCallback(category => store.actions.catalog.setParams({ category }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };
  const [categorySort, setCategorySort] = useState([{ title: 'Все', _id: 0 }]);
  const options = {
    sort: useMemo(() => ([
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]), [])

  };
  const getAllCategory = async () => {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    setCategorySort([{ title: 'Все', _id: 0 }, ...json.result.items]);
    console.log(json.result.items);
    const res = json.result.items;
    let result = [];
    res.forEach(item => {
      if (!item.parent)
        result.push(item);

    });
    let parentNode;
    res.forEach(item => {

      if (item.parent) {
        parentNode = result.find(curr => curr._id === item.parent._id);
        console.log(parentNode)
        parentNode.children = item;


      }

    });
    console.log('pn', parentNode);
    console.log('res', result)


  }
  useEffect(() => {
    getAllCategory()
    console.log(categorySort);
  }, [])
  const { t } = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={categorySort} value={categorySort._id} onChange={callbacks.onSortCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
        delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
