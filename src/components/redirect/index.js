import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';
import CommentLayout from '../comment-layout';
import './style.css';
import { Link } from 'react-router-dom';

function Redirect({ location, resetAnswer, text }) {
  const cn = bem('redirect');

  return (
    <div className={cn()}>
      <Link
        className={cn('login')}
        to={'/login'}
        state={{ back: location.pathname }}
      >
        Войдите,
      </Link>
      <p>{text}</p>
      {resetAnswer && <Link className={cn('cancel')} onClick={() => resetAnswer()} >Отмена</Link>}
    </div>
  );
}



export default Redirect;
