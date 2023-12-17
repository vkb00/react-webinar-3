import { Children, memo, useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";

/**
 * Контейнер списка товаров с пагинацией
 */
function ProfileContainer({ children }) {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    authorization: state.session.authorization
  }));
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const callbacks = {
    recoveryAuthorization: useCallback((setAuth, setLoading) => store.actions.session.recoveryAuthorization(setAuth, setLoading), [store]),
  }

  const { t } = useTranslate();

  useEffect(() => {
    callbacks.recoveryAuthorization(setAuth).then(isAuth => {
      if (isAuth)
        setAuth(isAuth)
      else
        navigate('/login')
      console.log(isAuth)
    });
    console.log(auth, select.authorization);

  }, [select.authorization])

  return (
    auth ?
      <div>
        {children}
      </div> :
      <></>

  );
}

export default memo(ProfileContainer);
