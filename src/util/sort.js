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
  }
}