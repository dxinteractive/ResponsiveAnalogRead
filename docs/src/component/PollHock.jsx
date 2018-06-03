// @flow
import React from 'react';
import type {Node} from 'react';

type Config = {
    until: (props: Object) => boolean,
    delay?: number
};

export default ({until, delay = 100}: Config) => (Component: ComponentType<*>) => class Delay extends React.Component {
    constructor(props: *) {
        super(props);
        this.state = {
            done: false
        };
    }

    componentDidMount() {
        this.check();
    }

    check = () => {
        if(until(this.props)) {
            this.setState({done: true});
        } else {
            setTimeout(this.check, delay);
        }
    };

    render(): Node {
        return <Component
            {...this.props}
            done={this.state.done}
        />;
    }
};
