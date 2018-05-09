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
    if(this.props.ip !== '') {
      const receiverIp = event.currentTarget.id
      this.setState({ open: false })
      const res = await axios.put(`http://localhost/api/cast`, { 
        url: `http://${this.props.ip}/${this.props.selectedMovie.baseFileName}`, 
        name: this.props.selectedMovie.fileName})
      console.log(res.data)
    } else {
      console.log('Still resolving ip address...')
    }
  }

  render() {

    const { castReceivers } = this.props
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