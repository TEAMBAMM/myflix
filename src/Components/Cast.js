import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
  
export default class Cast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
    this.handleChange = this.handleChange.bind(this)    
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={true}
        >
          <MenuItem value={1} primaryText="Cast" />
          <MenuItem value={2} primaryText="Living Room TV" />
          <MenuItem value={3} primaryText="Bedroom TV" />
        </DropDownMenu>
      </div>
    );
  }
}