import React from 'react'
import Folder from 'material-ui/svg-icons/file/folder-open'
const { dialog } = window.require('electron').remote

const Options = props => {

  const { filePath, changeFilePath } = props

  let path = (filePath === '') ? 'Please select a folder' : filePath

  return (
    <div className='OptionsComponent'>
      <div className='File'>
        <span className='FileSpan'>Selected Folder: {path}</span> 
        <div className='FolderIcon'>
          <Folder onClick={() => {
            const folderPath = dialog.showOpenDialog({
              title: 'Please select movie folder',
              properties: ['openDirectory']
            })
            if (folderPath !== undefined) {
              changeFilePath(folderPath[0])
            }
          }}/>
        </div>
      </div>
    </div>
  )
}

export default Options