import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { func } from "prop-types";


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
    onSortCategory: useCallback(category => {
      callbacks.onPaginate(1);
      return store.actions.catalog.setParams({ category });

    }, [store]),
    onPaginate: useCallback(page => store.actions.catalog.setParams({ page }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),

    getAllCategory: useCallback((setCategorySort) => store.actions.catalog.getAllCategory(setCategorySort), [store]),

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
  const handlSetCategorySort = (data) => {
    setCategorySort(data);
  }
  useEffect(() => {
    callbacks.getAllCategory(handlSetCategorySort);
    console.log(categorySort, select.sort);
  }, [])
  const { t } = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={categorySort} value={select.category} onChange={callbacks.onSortCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
        delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
