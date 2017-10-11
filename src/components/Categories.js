import React, { Component } from 'react'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class Categories extends Component {
  state={
    activeKey: 1
  }

  componentDidMount () {
    if(this.props.categories.length < 1){
      this.props.loadCategories()
    }    
  }

  render () {
    const { categories, category = '' } = this.props

    return (
      <div>
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>Jacob's Readable App</Navbar.Brand>
          </Navbar.Header>
          <Navbar.Text>CATEGORY:</Navbar.Text>
          <Nav bsStyle="pills" activeKey={category}>
            <LinkContainer key="all" exact={true} to="/">
              <NavItem eventKey={''}>All</NavItem>
            </LinkContainer>  
             {categories.map((c) => (
              <LinkContainer key={c.name} to={'/' + c.path}>
                <NavItem eventKey={c.name}>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</NavItem>
              </LinkContainer>
              ))}
          </Nav>  
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps({ categories }, ownProps) {
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

