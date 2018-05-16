import React from 'react'
import File from 'material-ui/svg-icons/file/create-new-folder'
import RaisedButton from 'material-ui/RaisedButton'
const { BrowserWindow, dialog } = window.require('electron').remote

const NoFile = props => {

  const { changeFilePath } = props

  return (
    <div className='NoFileContainer' onClick={() => {
      const folderPath = dialog.showOpenDialog({
        title: 'Please select movie folder',
        properties: ['openDirectory']
      })
      console.log(folderPath)
      if (folderPath !== undefined) {
        changeFilePath(folderPath[0])
      }
    }}
    >
      <div>
        <h2>No folder selected!</h2>
      </div>
      <div>
        <File style={{width: 100, height: 100}}/>
      </div>
      <div>
        <RaisedButton label='Select Folder' />
      </div>
    </div>
  )
}

export default NoFile