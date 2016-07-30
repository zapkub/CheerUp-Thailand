import * as React from 'react';
import * as classNames from 'classnames';
const styles = require('../styles/messageList.scss');

interface IPropsType {
  lists: string[];
  index: number;
  onChange?(index: number): void;
}
export const MessageList = (props: IPropsType) => (
  <div className={styles.messageList} >
    <div className={styles.scroll} >
    {
      props.lists.map(
        (item, key) =>
        (<div onClick={ () => props.onChange(key) } className={classNames(styles.item,{
          [`${styles.selected}`]: props.index === key,
        })} key={key}>{item}</div>)
      )
    }
    </div>
  </div>
);
