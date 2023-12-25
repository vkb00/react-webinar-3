import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function AnswerBlock({ item, handleChange, handleCreateComment, resetAnswer, parentId, type, text, title }) {
  const cn = bem('answer');
  const inputRef = useRef(null);

  useEffect(() => {
    if (type === 'comment') {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [])
  return (
    <div className={cn()}>
      <p className={cn('title')}><b>{title}</b></p>
      <textarea className={cn('textArea')} onChange={handleChange} ref={inputRef}></textarea>
      <div className={cn('buttonPanel')}>
        <button className={cn('buttonPanel-send')} onClick={() => handleCreateComment(text, type, parentId)}>Отправить</button>
        {resetAnswer && <button onClick={() => resetAnswer()} >Отмена</button>}
      </div>
    </div>
  );
}



export default AnswerBlock;
