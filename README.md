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
