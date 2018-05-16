import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import Settings from 'material-ui/svg-icons/action/settings'
import { navTo } from './utils'
import { withRouter } from 'react-router-dom'
import { Dialog } from 'material-ui';
import FlatButton from 'material-ui/FlatButton'
import Options from './Options'

class OptionsIcon extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({...this.state, open: true})
  }

  handleClose = () => {
    this.setState({...this.state, open: false})
  }

  render() {

    const { history, filePath, changeFilePath } = this.props
    const { handleOpen, handleClose } = this
    const { open } = this.state

    const actions = [
      <FlatButton
        label='Done'
        primary={true}
        onClick={handleClose}
      />
    ]
    
    return (
      <div>
        {/* <IconButton id='settings' onClick={() => { navTo('/settings/options', history) }}> */}
        <IconButton id='settings' onClick={handleOpen} >
          <Settings />
        </IconButton>
        <Dialog 
          title='Settings'
          modal={false}
          open={open}
          actions={actions}
          onRequestClose={handleClose}
        >
          <Options filePath={filePath} changeFilePath={changeFilePath}/>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(OptionsIcon)
