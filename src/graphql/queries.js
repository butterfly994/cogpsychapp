// eslint-disable
// this is an auto generated file. This will be overwritten

export const getWholeReport = `query GetWholeReport($id: ID!) {
  getWholeReport(id: $id) {
    id
    exposureDuration
    numLetters
    containsNumbers
    gridName
    lettersCorrect
    userId
  }
}
`;
export const listWholeReports = `query ListWholeReports(
  $filter: ModelWholeReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listWholeReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      exposureDuration
      numLetters
      containsNumbers
      gridName
      lettersCorrect
      userId
    }
    nextToken
  }
}
`;
export const getPartialReport = `query GetPartialReport($id: ID!) {
  getPartialReport(id: $id) {
    id
    toneLevel
    numLetters
    containsNumbers
    gridName
    toneDelay
    accuracy
    userId
  }
}
`;
export const listPartialReports = `query ListPartialReports(
  $filter: ModelPartialReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listPartialReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      toneLevel
      numLetters
      containsNumbers
      gridName
      toneDelay
      accuracy
      userId
    }
    nextToken
  }
}
`;
