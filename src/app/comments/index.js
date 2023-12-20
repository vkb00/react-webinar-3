import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';;
import CommentsCard from '../../components/comments-card';


function Comments({ productId }) {

  const store = useStore();
  const select = useSelector(state => ({
    listComments: state.comments.listComments,

  }));
  const getComments = async () => {
    await store.actions.comments.load(productId);

  }
  useEffect(() => {
    getComments();
    store.actions.comments.createComment();
  }, [])
  return (
    <div>
      <CommentsCard list={select.listComments} primeId={productId} />
    </div>
  );
}



export default memo(Comments);
