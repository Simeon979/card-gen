const makeSuccessResponse = (result) => ({result});
const makeErrorResponse = (error) => ({error});

module.exports = { makeSuccessResponse, makeErrorResponse};