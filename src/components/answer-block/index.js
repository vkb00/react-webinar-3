import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';
import CommentLayout from '../comment-layout';
import './style.css';
import { Link } from 'react-router-dom';

function AnswerBlock({ item, handleChange, handleCreateComment, resetAnswer, parentId, type, text, title }) {
  const cn = bem('answer');

  return (
    <div className={cn()}>
      <p><b>{title}</b></p>
      <textarea className={cn('textArea')} onChange={handleChange}></textarea>
      <div className={cn('buttonPanel')}>
        <button className={cn('buttonPanel-send')} onClick={() => handleCreateComment(text, type, parentId)}>Отправить</button>
        {resetAnswer && <button onClick={() => resetAnswer()} >Отмена</button>}
      </div>
    </div>
  );
}



export default AnswerBlock;
