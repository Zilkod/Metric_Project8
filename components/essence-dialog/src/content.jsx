import React from 'react';
import ClassNames from 'classnames';
import './dialog.less'; // require('!css!less!./dialog.less');
 
class DialogContent extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	classes: ClassNames(
                'e-dialogs-content',
                this.props.classes,
                this.props.className
            )
        };
    }

	render() {
		return (
            <div {...this.props} className={this.state.classes}>
                {this.props.children}
            </div>
        );
	}
}

module.exports = DialogContent;