import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../util/api'
import { addCategories } from '../actions'

class App extends Component {

  componentDidMount () {
    fetchCategories()
      .then((res) => this.props.dispatch(addCategories(res)))
  }

  render () {
    return (
      <div>
          <div>Hello World</div>
          <ul>
            {this.props.categories.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(App)