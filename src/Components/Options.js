import React, { Component } from 'react'
import Folder from 'material-ui/svg-icons/file/folder-open'

class Options extends Component {
  constructor() {
    super()
    this.state = {
      filePath: '/this/is/an/example'
    }
  }
  
  async componentDidMount() {
    //Make axios request to get saved settings from 
    //database
    // let res = axios.get('/api/settings')
    // const filePath = res.data.filePath
    // this.setState({...this.state, filePath})
  }

  render() {

    const { filePath } = this.state

    return (
      <div className='OptionsComponent'>
        <div className='File'>
          <span className='FileSpan'>Selected Folder: {filePath}</span> 
          <div className='FolderIcon'>
            <Folder onClick={() => console.log('Click')} />
          </div>
        </div>
      </div>
    )
  }
}

export default Options