const ErrorCodes = require("../dist/utils/ErrorCodes")
const isJsonParsable = require("../dist/utils/isJSONParsable")
test("Testing some Error Codes", () => {
  expect(ErrorCodes.ErrorCodes.SUCCESS).toBe(200)
  expect(ErrorCodes.ErrorCodes.CREATED).toBe(201)
  expect(ErrorCodes.ErrorCodes.BADREQUEST).toBe(400)
})

test("isJsonParsable",()=>{
  expect(isJsonParsable.default("someText")).toBe(false);
})


test("isJsonParsable",()=>{
  expect(isJsonParsable.default(JSON.stringify({testing:"test"}))).toBe(true);
})