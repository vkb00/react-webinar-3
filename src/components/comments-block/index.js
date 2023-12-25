import { cn as bem } from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsBlock({ item, children, openCommentZone, user }) {
  const cn = bem('cardItem');

  return (
    <div className={cn()} style={{ marginLeft: `${(((item.level - 1) > 15 ? 15 : (item.level - 1)) * 40)}px` }} key={item._id} >
      <div className={cn('header')}>
        <b className={user === item.author ? "currentAuthor" : "author"}>{item.author}</b>
        <p className={cn('header-date')}>{dateFormat(item.createDate)}</p>
      </div>
      <div className={cn('description')}>{item.description}</div>
      <Link className={cn('send')} onClick={() => openCommentZone(item)}>Ответить</Link>
      {children}
    </div>
  );
}



export default CommentsBlock;
