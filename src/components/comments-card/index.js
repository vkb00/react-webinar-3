import { memo, useEffect, useState } from 'react';
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
function CommentsCard({ list, primeId, createComment, isLogin, location, handleChange, text }) {
  const cn = bem('CommentsCard');
  const [transformedList, setTransformedList] = useState([]);
  const [answer, setAnswer] = useState("0");


  const handleCreateComment = (text, type, parentId) => {
    createComment(text, type, parentId)
    resetAnswer();
  }
  const openCommentZone = (id) => setAnswer(id);
  const resetAnswer = () => setAnswer("0");

  useEffect(() => {
    console.log(list)
    const result = [...treeToList(listToTree(list), (item, level) => ({
      id: item._id,
      author: item.author?.profile.name,
      createDate: item.dateCreate,
      description: item.text,
      level: level,
      parenId: item._id,
      type: item.parent?._type
    }
    ))];
    setTransformedList(result.slice(1));
    console.log('loc', location)
  }, [list])
  return (
    <CommentLayout count={list.length}>
      {
        transformedList.map(item =>
          <CommentsBlock item={item} openCommentZone={openCommentZone}>
            {
              answer === item.id ?
                isLogin ?
                  <AnswerBlock handleChange={handleChange}
                    handleCreateComment={handleCreateComment}
                    resetAnswer={resetAnswer}
                    parentId={item.parenId}
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
