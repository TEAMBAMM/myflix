import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
  
export default class Filter extends React.Component {

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
          <MenuItem value={1} primaryText="Filter" />
          <MenuItem value={2} primaryText="All" />          
          <MenuItem value={4} primaryText="Action" />
          <MenuItem value={4} primaryText="Sci-Fi" />
          <MenuItem value={5} primaryText="Comedy" />
          <MenuItem value={6} primaryText="Crime" />
          <MenuItem value={7} primaryText="Drama" />
          <MenuItem value={8} primaryText="Horror" />
        </DropDownMenu>
      </div>
    );
  }
}