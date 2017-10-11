import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Grid, Row, Col, Label, Button, ButtonToolbar, Badge } from 'react-bootstrap'
import { prettyDate } from '../util/date'
import Vote from './Vote'
import { fetchDeletePost } from '../actions'

class Post extends Component {

  render () {
    const { post } = this.props

    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col md={10}>
              <h3>{post.title}</h3>
              <p><Label>{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</Label></p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className="lead">{post.body}</p>
            </Col>            
          </Row>
          <Row>
            <Col md={12}>
              <div>{post.author}  <small><i>{prettyDate(post.timestamp)}</i></small></div>
            </Col>
          </Row>
          <div>Votes: <Badge>{post.voteScore}</Badge><span> </span> 
            <Vote 
              postId={post.id}
            />
          </div>
          <div>Comments: {post.comments ? post.comments.length : 0}</div>          
          <ButtonToolbar>
            <LinkContainer to={'/' + post.category + '/' + post.id}>
              <Button bsStyle="info">See Comments</Button>
            </LinkContainer>
            <Button bsStyle="danger" onClick={() => this.props.deletePost(post.id)}>
              Delete Post
            </Button>
          </ButtonToolbar>
          <hr/>          
        </Grid>                   
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (postId) => dispatch(fetchDeletePost(postId))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)