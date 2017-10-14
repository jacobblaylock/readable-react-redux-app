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
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="sorter" defaultValue={1}>
            <ToggleButton value={1} onClick={() => setSortMethod(sorter.voteDesc)}>Votes <span className="glyphicon glyphicon-chevron-down" aria-label="descending"></span></ToggleButton>
            <ToggleButton value={2} onClick={() => setSortMethod(sorter.voteAsc)}>Votes <span className="glyphicon glyphicon-chevron-up" aria-label="ascending"></span></ToggleButton>
            <ToggleButton value={3} onClick={() => setSortMethod(sorter.dateDesc)}>Date <span className="glyphicon glyphicon-chevron-down" aria-label="descending"></span></ToggleButton>
            <ToggleButton value={4} onClick={() => setSortMethod(sorter.dateAsc)}>Date <span className="glyphicon glyphicon-chevron-up" aria-label="ascending"></span></ToggleButton>
            <ToggleButton value={5} onClick={() => setSortMethod(sorter.commentDesc)}>Comments <span className="glyphicon glyphicon-chevron-down" aria-label="descending"></span></ToggleButton>            
            <ToggleButton value={6} onClick={() => setSortMethod(sorter.commentAsc)}>Comments <span className="glyphicon glyphicon-chevron-up" aria-label="ascending"></span></ToggleButton>
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

