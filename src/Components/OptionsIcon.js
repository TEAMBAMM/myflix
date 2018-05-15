import React from 'react'
import IconButton from 'material-ui/IconButton'
import Settings from 'material-ui/svg-icons/action/settings'
import { navTo } from './utils'
import { withRouter } from 'react-router-dom'

const OptionsIcon = props => {

  const { history } = props

  return (
    <div>
      <IconButton id='settings' onClick={() => { navTo('/settings/options', history) }}>
        <Settings />
      </IconButton>
    </div>
  )
}

export default withRouter(OptionsIcon)
