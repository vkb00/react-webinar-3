import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsCard({ list, primeId, createComment, isLogin }) {
  const cn = bem('CommentsCard');
  const [transformedList, setTransformedList] = useState([]);
  const [answer, setAnswer] = useState("0");
  const [text, setText] = useState("");

  const handleCreateComment = (text, type, parentId) => {
    createComment(text, type, parentId)
    resetAnswer();
  }
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const openCommentZone = (id) => {

    setAnswer(id);
  }
  const resetAnswer = () => {
    setAnswer("0");
  }
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
  }, [list])
  return (
    <div className={cn()}>
      <h2>Комментарии ({list.length})</h2>
      {
        transformedList.map(item =>
          <div className={cn('cardItem')} style={{ marginLeft: `${(item.level - 1) * 40}px` }} key={item._id} >
            <div className={cn('cardItem-header')}>
              <b>{item.author}</b>
              <p className={cn('cardItem-header-date')}>{dateFormat(item.createDate)}</p>
            </div>
            <div className={cn('cardItem-description')}>{item.description}</div>
            <Link className={cn('cardItem-send')} onClick={() => openCommentZone(item.id)}>Ответить</Link>
            {
              answer === item.id ?
                isLogin ?
                  <div className={cn('answer')}>
                    <p><b>Новый ответ</b></p>
                    <textarea className={cn('answer-textArea')} onChange={handleChange}></textarea>
                    <div className={cn('answer-buttonPanel')}>
                      <button className={cn('answer-buttonPanel-send')} onClick={() => handleCreateComment(text, "comment", item.parenId)}>Отправить</button>
                      <button onClick={() => resetAnswer()} >Отмена</button>
                    </div>
                  </div> :
                  <div className={cn('redirect')}>
                    <Link to={'/login'} className={cn('redirect-login')} >Войдите,</Link>
                    <p>чтобы иметь возможность ответить,</p>
                    <Link className={cn('redirect-cancel')} onClick={() => resetAnswer()} >Отмена</Link>
                  </div> :
                <></>
            }
          </div>

        )
      }
      {answer === "0" ?
        isLogin ?
          <div className={cn('answer')}>
            <p><b>Новый комментарий</b></p>
            <textarea className={cn('answer-textArea')} onChange={handleChange}></textarea>
            <div className={cn('answer-buttonPanel')}>
              <button onClick={() => handleCreateComment(text, "article", primeId)} > Отправить</button>
            </div>
          </div> :
          <div className={cn('redirect')}>
            <Link to={'/login'} className={cn('redirect-login')} >Войдите,</Link>
            <p>чтобы иметь возможность комментировать,</p>
          </div> :
        <></>
      }
    </div >
  );
}



export default CommentsCard;
