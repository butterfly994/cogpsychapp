// eslint-disable
// this is an auto generated file. This will be overwritten

export const createWholeReport = `mutation CreateWholeReport($input: CreateWholeReportInput!) {
  createWholeReport(input: $input) {
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
export const updateWholeReport = `mutation UpdateWholeReport($input: UpdateWholeReportInput!) {
  updateWholeReport(input: $input) {
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
export const deleteWholeReport = `mutation DeleteWholeReport($input: DeleteWholeReportInput!) {
  deleteWholeReport(input: $input) {
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
export const createPartialReport = `mutation CreatePartialReport($input: CreatePartialReportInput!) {
  createPartialReport(input: $input) {
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
export const updatePartialReport = `mutation UpdatePartialReport($input: UpdatePartialReportInput!) {
  updatePartialReport(input: $input) {
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
export const deletePartialReport = `mutation DeletePartialReport($input: DeletePartialReportInput!) {
  deletePartialReport(input: $input) {
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
