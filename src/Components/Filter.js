import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Filter extends React.Component {
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
        <RaisedButton onClick={this.handleClick} label="Filter" />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu onChange={this.props.changeFilter}>
            <MenuItem primaryText="All" value="All" />
            <MenuItem primaryText="Action" value="Action" />
            <MenuItem primaryText="Sci-Fi" value="Sci-Fi" />
            <MenuItem primaryText="Comedy" value="Comedy" />
            <MenuItem primaryText="Crime" value="Crime" />
            <MenuItem primaryText="Drama" value="Drama" />
            <MenuItem primaryText="Horror" value="Horror" />
          </Menu>
        </Popover>
      </div>
    );
  }
}
