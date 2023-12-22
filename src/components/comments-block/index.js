import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';
import CommentLayout from '../comment-layout';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsBlock({ item, children, openCommentZone }) {
  const cn = bem('cardItem');

  return (
    <div className={cn()} style={{ marginLeft: `${(item.level - 1) * 40}px` }} key={item._id} >
      <div className={cn('header')}>
        <b>{item.author}</b>
        <p className={cn('header-date')}>{dateFormat(item.createDate)}</p>
      </div>
      <div className={cn('description')}>{item.description}</div>
      <Link className={cn('send')} onClick={() => openCommentZone(item.id)}>Ответить</Link>
      {children}
    </div>
  );
}



export default CommentsBlock;
