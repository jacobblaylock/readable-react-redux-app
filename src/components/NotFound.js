// Node Module Imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

  render () {
    return (
      <div>
        <h1>Page Not Found</h1>
        <br/>
        <Link to='/' className="h2" style={{color: "blue"}}>Start Over</Link>
      </div>
    )
  }
}

export default NotFound