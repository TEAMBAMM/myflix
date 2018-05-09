import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Sort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <RaisedButton onClick={this.handleClick} label="Sort" />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu
            onChange={this.props.changeSort}
            onClick={this.handleRequestClose}
          >
            <MenuItem primaryText="Recently Added" value="Recently Added" />
            <MenuItem primaryText="Title" value="Title" />
            <MenuItem primaryText="Rating" value="Rating" />
            <MenuItem primaryText="Year" value="Year" />
            <MenuItem primaryText="Resolution" value="Resolution" />
          </Menu>
        </Popover>
      </div>
    );
  }
}
