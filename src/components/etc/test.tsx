import React from 'react';

export interface Props<T> {
  value: T;
}
interface State {}
class Component<T = string> extends React.Component<Props<T>, State> {
  render() {
    return (
      <div>
        {this.props.value.toString()} ({typeof this.props.value})
      </div>
    );
  }
}

export default Component;
export type As<T> = new (props: Props<T>) => Component<T>;
