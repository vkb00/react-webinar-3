import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';
import './style.css';
import { Link } from 'react-router-dom';

function CommentLayout({ children, count }) {
  const cn = bem('CommentsCard');

  return (
    <div className={cn()}>
      <h2>Комментарии ({count})</h2>
      {children}
    </div >
  );
}



export default CommentLayout;
