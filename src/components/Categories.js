import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class Categories extends Component {

  componentDidMount () {
    this.props.loadCategories()
  }
  
    render () {
      const { categories } = this.props
  
      return (
        <div>
          <h2>Categories:</h2>
            {categories.map((c) => (
              <div key={c.name}>
                <Link to={'/' + c.path}>{c.name}</Link>
              </div>
            ))}
        </div>
      )
    }
  }

  function mapStateToProps({ categories }) {
    return {
      categories
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      loadCategories: () => dispatch(fetchCategories())
    }
  }
   
  export default connect(mapStateToProps, mapDispatchToProps)(Categories)

