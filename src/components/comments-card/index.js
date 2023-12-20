import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsCard({ list, primeId }) {
  const cn = bem('CommentsCard');
  const store = useStore();
  const [transformedList, setTransformedList] = useState([]);
  const [answer, setAnswer] = useState("0");
  const [text, setText] = useState("");
  const createComment = (text, type, parentId) => {
    store.actions.comments.createComment(text, type, parentId);
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
        transformedList.map(item => {
          return (
            console.log(item.parenId),
            <div className={cn('cardItem')} style={{ marginLeft: `${(item.level - 1) * 40}px` }} key={item._id} >
              <div className={cn('cardItem-header')}><b>{item.author}</b> {item.createDate}</div>
              <div className={cn('cardItem-description')}>{item.description}</div>
              <Link onClick={() => openCommentZone(item.id)}>Ответить</Link>
              {
                answer === item.id ?
                  <div className={cn('answer')}>
                    <p><b>Новый ответ</b></p>
                    <textarea onChange={handleChange}></textarea>
                    <div className={cn('answer-buttonPanel')}>
                      <button onClick={() => createComment(text, "comment", item.parenId)}>Отправить</button>
                      <button onClick={() => resetAnswer()} >Отмена</button>
                    </div>
                  </div> :
                  <></>
              }
            </div>
          )
        }
        )
      }
      {answer === "0" ?
        <div className={cn('answer')}>
          <p><b>Новый комментарий</b></p>
          <textarea onChange={handleChange}></textarea>
          <div className={cn('answer-buttonPanel')}>
            <button onClick={() => createComment(text, "article", primeId)} > Отправить</button>
          </div>
        </div> :
        <></>
      }
    </div >
  );
}



export default CommentsCard;
