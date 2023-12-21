import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';
//import useSelector from '../../hooks/use-selector';;
import CommentsCard from '../../components/comments-card';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';


function Comments({ productId }) {

  const store = useStore();
  const dispatch = useDispatch();

  const getComments = async () => {
    await store.actions.comments.load(productId);

  }
  const createComment = (text, type, parentId, primeId = productId) => {
    dispatch(commentsActions.createComment(text, type, parentId, primeId));
  }
  useEffect(() => {
    //getComments();
    dispatch(commentsActions.load(productId));
    //store.actions.comments.createComment();
  }, [])
  const select = useSelector(state => (
    //console.log(state),
    {
      data: state.comments.data,
      waiting: state.comments.waiting,
    }), shallowequal);
  return (
    <div>
      <Spinner active={select.waiting}>
        <button onClick={createComment}>ll</button>
        <CommentsCard list={select.data} primeId={productId} createComment={createComment} />
      </Spinner>

    </div>
  );
}



export default memo(Comments);
