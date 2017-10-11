export const sorter = {
  voteAsc: function (a,b) {
    return a.voteScore-b.voteScore
  },
  voteDesc: function (a,b) {
    return b.voteScore-a.voteScore
  },
  dateAsc: function (a,b) {
    return a.timestamp-b.timestamp
  },
  dateDesc: function (a,b) {
    return b.timestamp-a.timestamp
  },
  commentAsc: function(a,b) {
    return a.comments.length-b.comments.length
  },
  commentDesc: function(a,b) {
    return b.comments.length-a.comments.length
  }
}