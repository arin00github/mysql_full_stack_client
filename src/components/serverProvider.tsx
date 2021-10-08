import { Component } from 'react';
import { ServerContext, ServerState } from '../../pages/api/common/context';

export class ServerProvider extends Component<ServerState, ServerState> {
  state = {
    isAuthenticated: this.props.isAuthenticated,
    isServer: true,
  };

  render() {
    const { isAuthenticated, isServer } = this.state;
    return (
      <ServerContext.Provider
        value={{
          isAuthenticated,
          isServer,
          setIsAuthenticated: (isAuthenticated: string) => this.setState({ isAuthenticated }),
        }}
      >
        {this.props.children}
      </ServerContext.Provider>
    );
  }
}
