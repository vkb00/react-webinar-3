import { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';
import CommentsCard from '../../components/comments-card';
import { useDispatch } from 'react-redux';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';


function Comments({ productId }) {

  const store = useStore();
  const dispatch = useDispatch();

  const location = useLocation();

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  }
  const [isLogin, setLogin] = useState(false);
  const createComment = (text, type, parentId, primeId = productId) => {
    dispatch(commentsActions.createComment(text, type, parentId, primeId));
  }
  const selectRedux = useSelectorRedux(state => ({
    data: state.comments.data,
    waiting: state.comments.waiting,
  }), shallowequal);
  const selectStore = useSelector(state => ({
    isSession: state.session.exists,

  }));

  useEffect(() => {
    dispatch(commentsActions.load(productId));
    // store.actions.session.remind();
    setLogin(!!store.state.session.token);
    console.log("effcom", selectStore.isSession)
  }, [selectStore.isSession])

  return (
    <div>
      <Spinner active={selectRedux.waiting}>
        <CommentsCard list={selectRedux.data}
          primeId={productId}
          createComment={createComment}
          isLogin={isLogin}
          location={location}
          handleChange={handleChange}
          text={text}

        />
      </Spinner>

    </div>
  );
}



export default memo(Comments);
