import React from 'react'
import Folder from 'material-ui/svg-icons/file/folder-open'

const Options = props => {

  const { filePath, changeFilePath } = props

  return (
    <div className='OptionsComponent'>
      <div className='File'>
        <span className='FileSpan'>Selected Folder: {filePath}</span> 
        <div className='FolderIcon'>
          <Folder onClick={() => 
            changeFilePath(/*path - need to extract new path from electron*/)
          }/>
        </div>
      </div>
    </div>
  )
}

export default Options