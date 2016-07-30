import * as React from 'react';
import * as classNames from 'classnames';

const styles = require('../styles/atheleList.scss');
export class AtheleObject {
  name: string;
  previewURI: string;
  sourceURI: string;
}

interface IAtheleListPropsType {
  list: AtheleObject[];
  onChange?(athele?: number): void;
}

const Athele = (props: {data: AtheleObject, onClick?(item: AtheleObject): void; selected?: boolean; }) =>
(<div
    onClick={() => {props.onClick(props.data); }}
    className={
      classNames(styles.item,{[`${styles.selected}`]: props.selected})
    }
>
  <img src={require('../assets/images/' + props.data.previewURI)} />
</div>);

export class AtheleList extends React.Component<IAtheleListPropsType, {index: number}> {
  constructor(props) {
    super(props);
    this.state = { index: 0};
  }
  render(): JSX.Element {
    return (<div className={styles.wrap} >
      {
        this.props.list.map( (item, key) => {
          return <Athele selected={key === this.state.index} onClick={() => {this.handleClick(key);}} key={key} data={item} />;
        })
      }
    </div>);
  }
  handleClick(index: number): void {
    this.setState({index: index});
    this.props.onChange(index);
  }
};
