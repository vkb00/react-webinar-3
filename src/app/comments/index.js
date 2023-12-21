import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';
import CommentsCard from '../../components/comments-card';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';


function Comments({ productId }) {

  const store = useStore();
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const createComment = (text, type, parentId, primeId = productId) => {
    dispatch(commentsActions.createComment(text, type, parentId, primeId));
  }
  const select = useSelector(state => ({
    data: state.comments.data,
    waiting: state.comments.waiting,
  }), shallowequal);

  useEffect(() => {
    dispatch(commentsActions.load(productId));
    store.actions.session.remind();
    setLogin(!!store.state.session.token);
    console.log("effcom")
  }, [store.state.session.token])

  return (
    <div>
      <Spinner active={select.waiting}>
        <CommentsCard list={select.data} primeId={productId} createComment={createComment} isLogin={isLogin} />
      </Spinner>

    </div>
  );
}



export default memo(Comments);
