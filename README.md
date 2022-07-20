# Ice Cream on Demand

- Practicing react testing with jest

## Screen Query Methods

- command[All]ByQueryType

### Command:

- get: expect element to be in the DOM
- query: expect element not to be in the DOM
- find: expect element to appear async

### [All]

- (exclude) expect only one match
- (include) expect more than one match

### QueryType

- Role (most preferred)
- AltText (images)
- Text (display elements)
- Form elements
  - PlaceholderText
  - LabelText
  - DisplayValue

### References

- https://testing-library.com/docs/dom-testing-library/api-queries
- https://testing-library.com/docs/react-testing-library/cheatsheet
- https://testing-library.com/docs/guide-which-query

## not wrapped in act(...) warning

- React updated element after test was finished
- It means some async update occured
- Dont want to follow the advice to wrap in act(...)
  - Testing Library already advises against it
  - https://testing-library.com/docs/preact-testing-library/api/#act
- To remedy this error:
  - Determine what changes after the test is over
  - Account for changes in test by
    - awaiting the change
    - and asserting on it
    - https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

## SummaryForm Review

- testing flow where checkbox controls whether button is disabled
- mouseover for terms and conditions
  - userEvent.hover() and userEvent.unhover() methods
  - queryByText to and expect().not.toBeInTheDocument() for elements starting out not on a page
  - async waitForElementToBeRemoved() for element that was there and then disappeared

## Mock Service Worker

- Purpose:
  - intercept network calls
  - return specified responses
- Prevents network calls during test
- Set up test conditions using server response

- Setup:
  - npm install msw
  - Create handler
  - Create test server
  - Make sure test server listens during all tests
    - reset after each test

## JEST Matcher tip

- toBe() is intended to be used by strings and numbers
- use toEqual() to match for objects and arrays

### Review of Scoop Options testing

- Mock Service Worker mimics response from server
  - created a handler
  - created a test server
  - updated setupTests to listen for requests
- getAllByRole
  - didnt work because images were getting populated asynchronously from axios call
- await findAllByRole
  - used this for asynchronous DOM updates of element instead of getAllByRole

## Debugging tests tips

- I can use test.only() to run only that test
- I can use test.skip() to skip only a particular test

### await waitFor()

- waitFor waits for any period of time neccessary for the expectations to pass
- this is useful for testing mock API calls that I need to wait for

### Review of Alert Testing

- Overrode Mock Service Wrker response fo this individual test so the response throws errors
- Had to deal with a misleading error "Unable to find role='alert'"
- Isolating files by typing p - Jest watch mode

### Creating Custom Render

- Creating a custom render to add a wrapper to the render so it can be re-used
- Create a new folder test-utils
