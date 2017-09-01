import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import { fetchCategories } from '../util/api'
import { getCategories } from '../actions'

class App extends Component {

  componentDidMount () {
    fetchCategories()
      .then(res => this.props.loadCategories(res))
  }

  render () {
    const { categories } = this.props

    return (
      <div>
        <h1>Jacob's Readable App</h1>
          <h2>Categories:</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
          <Posts />
      </div>
    )
  }
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(getCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)