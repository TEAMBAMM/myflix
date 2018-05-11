import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'

export default class Cast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toggleCasting: this.props.toggleCasting
    };
    this.castToReceiver = this.castToReceiver.bind(this)
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  async castToReceiver(event) {
    if(this.props.castReceivers[0].host !== '0.0.0.0' && this.props.ip !== '') {
      const receiverIp = event.currentTarget.id
      const ip = (this.props.selectedMovie.ip) ? this.props.selectedMovie.ip : this.props.ip
      this.state.toggleCasting()
      this.setState({ open: false })
      const res = await axios.put(`http://localhost/api/cast`, { 
        url: `http://${ip}/${this.props.selectedMovie.baseFileName}`, 
        name: this.props.selectedMovie.fileName})
    } else {
      console.log('Still resolving cast receivers or ip address')
    }
  }

  render() {

    const { castReceivers, toggleCasting } = this.props
    const { castToReceiver, handleClick, handleRequestClose } = this
    const { open, selectedMovie, anchorEl } = this.state

    return (
      <div>
        <RaisedButton
          onClick={handleClick}
          label="Cast"
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            {
              castReceivers.map(receiver => {
                return(
                  <div id={receiver.host} key={receiver.name} onClick={castToReceiver} >
                  <MenuItem primaryText={receiver.name} />
                  </div>
                )
              })
            }
          </Menu>
        </Popover>
      </div>
    );
  }
}