import { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';
import CommentLayout from '../comment-layout';
import { Link } from 'react-router-dom';
import CommentsBlock from '../comments-block';
import AnswerBlock from '../answer-block';
import Redirect from '../redirect';
import useSelector from '../../hooks/use-selector';

function CommentsCard({ list, primeId, createComment, isLogin, location, handleChange, text }) {
  const cn = bem('CommentsCard');
  const [transformedList, setTransformedList] = useState([]);
  const [answer, setAnswer] = useState("0");
  const [currentComment, setCurrentComment] = useState({});
  const select = useSelector(state => ({
    user: state.session.user.profile?.name,
  }));
  const handleCreateComment = (text, type, parentId) => {
    const trimmedString = text.trim();
    if (trimmedString === '')
      return
    createComment(text, type, parentId)
    resetAnswer();
  }
  const openCommentZone = (item) => {
    console.log(item);
    setCurrentComment(item);
    if (item.children.length !== 0)
      setAnswer(item.children[item.children.length - 1]._id)
    else
      setAnswer(item.id)
  };
  const resetAnswer = () => setAnswer("0");

  useEffect(() => {
    console.log(list)
    const result = [...treeToList(listToTree(list), (item, level) => ({
      id: item._id,
      author: item.author?.profile.name,
      children: item.children,
      createDate: item.dateCreate,
      description: item.text,
      level: item.level ? item.level : level,
      parenId: item._id,
      type: item.parent?._type
    }
    ))];
    console.log(result)
    setTransformedList(result.slice(1));
    // console.log('loc', location)
  }, [list])
  return (
    <CommentLayout count={list.length}>
      {
        transformedList.map(item =>
          <CommentsBlock item={item} openCommentZone={openCommentZone} user={select.user}>
            {
              answer === item.id ?
                isLogin ?
                  <AnswerBlock handleChange={handleChange}

                    handleCreateComment={handleCreateComment}
                    resetAnswer={resetAnswer}
                    parentId={currentComment.parenId}
                    text={text}
                    title={'Новый ответ'}
                    type={'comment'} />
                  :
                  <Redirect location={location} resetAnswer={resetAnswer} text={'чтобы иметь возможность ответить,'} /> :
                <></>
            }
          </CommentsBlock>

        )
      }
      {answer === "0" ?
        isLogin ?
          <AnswerBlock handleChange={handleChange}
            handleCreateComment={handleCreateComment}
            parentId={primeId}
            text={text}
            title={"Новый комментарий"}
            type={'article'} /> :
          <Redirect location={location} text={'чтобы иметь возможность комментировать,'} /> :
        <></>
      }
    </CommentLayout>
  );
}



export default CommentsCard;
