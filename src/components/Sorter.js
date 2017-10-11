import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { sortMethod } from '../actions'
import { sorter } from '../util/sort'

class Sorter extends Component {
  
  render () {
    const { setSortMethod } = this.props

    return (
      <div>
        <div>Sort By:</div>
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="sorter">
            <ToggleButton value={1} onClick={() => setSortMethod(sorter.voteAsc)}>Votes Asc</ToggleButton>
            <ToggleButton value={2} onClick={() => setSortMethod(sorter.voteDesc)}>Votes Desc</ToggleButton>
            <ToggleButton value={3} onClick={() => setSortMethod(sorter.dateAsc)}>Date Asc</ToggleButton>
            <ToggleButton value={4} onClick={() => setSortMethod(sorter.dateDesc)}>Date Desc</ToggleButton>
          </ToggleButtonGroup>
          </ButtonToolbar>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    setSortMethod: (data) => dispatch(sortMethod(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorter)

