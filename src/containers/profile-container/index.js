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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const callbacks = {
    getToken: useCallback(() => store.actions.session.getToken(), [store]),
    getUserInfo: useCallback(token => store.actions.login.getUserInfo(token), [store]),


    recoveryAuthorization: useCallback((setAuth, setLoading) => store.actions.session.recoveryAuthorization(setAuth, setLoading), [store]),

    // Пагинация

  }

  const { t } = useTranslate();

  useEffect(() => {
    callbacks.recoveryAuthorization(setAuth, setLoading).then(i => {
      if (i)
        setAuth(i)
      else
        navigate('/login')
      console.log(i)
    });
    console.log(auth, select.authorization);

    // if (select.authorization) {
    //   const token = callbacks.getToken();
    //   callbacks.getUserInfo(token);
    //   console.log(select.profile)
    // }
    // console.log(auth, loading);
    // if (!loading && !auth)
    //   navigate("/login")


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
