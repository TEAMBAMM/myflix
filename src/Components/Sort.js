import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
  
export default class Sort extends React.Component {

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
          <MenuItem value={1} primaryText="Sort" />
          <MenuItem value={2} primaryText="Recently Added" />
          <MenuItem value={3} primaryText="Title" />
          <MenuItem value={4} primaryText="Rating" />
          <MenuItem value={5} primaryText="Year" />
          <MenuItem value={6} primaryText="Resolution" />
        </DropDownMenu>
      </div>
    );
  }
}