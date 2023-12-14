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


    const res = json.result.items;
    let result = [];
    res.forEach(item => {
      if (!item.parent)
        result.push(item);

    });
    let categoryTree;

    function buildCategoryTree(categories, parentId = null) {
      const categoryTree = [];
      categories
        .filter(category => category.parent?._id == parentId)
        .forEach(category => {
          const children = buildCategoryTree(categories, category._id);
          if (children.length) {
            category.children = children;
          }
          categoryTree.push(category);
        });
      return categoryTree;
    }

    categoryTree = buildCategoryTree(res);
    console.log('pn', categoryTree);

    function formatTree(node, depth) {
      if (!node.children) {
        return [{ node, depth }];
      }
      const children = node.children.flatMap(item =>
        formatTree(item, depth + 1)
      )
      return [{ node, depth }, ...children];
    }

    let formatedCategoryTree = categoryTree.flatMap(node => formatTree(node, 0));
    formatedCategoryTree.forEach(({ node, depth }) => {
      node.title = '-'.repeat(depth) + node.title;
    })
    setCategorySort([{ title: 'Все', _id: 0 }, ...formatedCategoryTree.map(item => item.node)]);

    console.log('ffss', formatedCategoryTree)

  }
  useEffect(() => {
    getAllCategory()
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
