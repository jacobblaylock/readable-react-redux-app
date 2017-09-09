import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './Posts'
import { fetchCategories } from '../util/api'
import { getCategories, selectCategory } from '../actions'

class App extends Component {

  componentDidMount () {
    fetchCategories()
      .then(res => this.props.loadCategories(res))
  }

  setCat = (e) => {
    this.props.setCategory(e.target.value)
  }

  render () {
    const { categories, selectedCategory } = this.props

    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <h1>Jacob's Readable App</h1>
            <h2>Categories:</h2>
            <select value={selectedCategory} onChange={this.setCat}>
                <option value="">Select a category</option>
              {categories.map((c) => (
                <option value={c.name} key={c.name}>{c.name}</option>
              ))}
            </select>
            <Posts />
          </div>
        )}/>

      </div>
    )
  }
}

function mapStateToProps({categories, selectedCategory}) {
  return {
    categories,
    selectedCategory
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: (data) => dispatch(getCategories(data)),
    setCategory: (data) => dispatch(selectCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)