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
    function buildCategoryTree(categories, parentId = null) {
      const categoryTree = [];
      console.log('res', parentId);
      categories
        .filter(category => category.parent?._id == parentId)
        .forEach(category => {
          console.log('c', category);
          const children = buildCategoryTree(categories, category._id);
          console.log('ch', children);
          if (children.length) {
            category.children = children;
          }
          categoryTree.push(category);
        });
      console.log('ct', categoryTree)
      return categoryTree;
    }


    parentNode = buildCategoryTree(res);
    console.log('pn', parentNode);
    //formatTree2(parentNode)
    // function formatTree2(arr, depth) {
    //   let dd = 0;
    //   console.log(arr)
    //   arr.map(item => {
    //     console.log(item)


    //     console.log(item)
    //     item.deps = dd;
    //     if (!item.parent)
    //       item.deps = 0;
    //     if (item.children) {
    //       dd++;

    //       formatTree2(item.children, dd)

    //     }


    //   })
    //   console.log("fsff", arr)
    // }
    function formatTree(node, depth) {
      if (!node.children) {

        return [{ node, depth }];
      }
      const children = node.children.flatMap(item =>
        formatTree(item, depth + 1)
      )
      console.log(...children);
      return [{ node, depth }, ...children];
    }

    let gg = parentNode.flatMap(node => formatTree(node, 0));
    gg.forEach(({ node, depth }) => {
      node.title = '-'.repeat(depth) + node.title;
    })
    setCategorySort([{ title: 'Все', _id: 0 }, ...gg.map(item => item.node)])
    console.log('ffss', gg)

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
