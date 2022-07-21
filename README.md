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

## Review of Scoop Options testing

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
- I can run screen.debug()
  - prints out what the DOM looks like at that point

### - Unable to find role="role"

- Either role doesn't exist
- Or no element with that role that matches the name option

### Error: connect ECONNREFUSED (your local ip)

- There is no mock service handler associated with this route and method

### await waitFor()

- waitFor waits for any period of time neccessary for the expectations to pass
- this is useful for testing mock API calls that I need to wait for

### not wrapped in act(...) warning

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

### Unmounted component error

- Often appears for similar reasons as not wrapped in act(...)
  - Component most likely has async updates after the test finished
- Sometimes the test does not neccessarily need the async updates to complete, like testing initial conditions
- To remedy such a use case in this error:
  - Skip auto cleanup
    - https://testing-library.com/docs/react-testing-library/setup/#skipping-auto-cleanup
    - Not possible on a test-by-test basis, so this option is not the recommended way
  - Mock useEffect to bypass server call
    - Not recommended, farther from production code path
  - Include in the beggining of a test that asserts on state change
    - One that awaits state change
      - happens on axios(api call) promise resolution
    - Don't need to include in all tests because it only needs to be tested for particular use cases
  - Add awaits to the end of the test to avoid errors
    - One of least problematic solutions but considered bad practice

## Review of Alert Testing

- Overrode Mock Service Wrker response fo this individual test so the response throws errors
- Had to deal with a misleading error "Unable to find role='alert'"
- Isolating files by typing p - Jest watch mode

## Review Of Scoops Subtotal Test

- getByText to find total
  - exact option set to false to match for partial string
- number inputs
  - await and findBy (coming from server async)
  - spinbutton role
  - userEvent.clear to clear existing text
  - userEvent.type to enter number
- wrapper option to render to apply context provider
- redefining testing library render to access globally

## Jest Mocks as Props

- Added a prop to top level page components
  - setOrderPhase
- Other components also have functions as props
  - updateItemCount for the ScoopOption and ToppingOption components
- May need to pass as prop when rendering in tests
  - TypeScript, PropTypes or other prop validators will require the prop to be there
  - Or will get called in tests but doesn't matter for the test
    - Testing that scoop count is invalid like -1 will call updateItemCount
      because it gets updated whenever the scoop count changes, so if the props are missing
      the tests will throw errors, but for these particular tests nothing needs to happen when
      item count is called
    - In such cases it is best to use a placeholder so that the test doesn't throw an error

### - Solution:

- Passing a jest mock function as a prop
- jest.fn()
  - Doesn't do anything
  - Just a placeholder to avoid errors
- Example:
  ```JS
  render(
  <ScoopsOption
  name="Vanilla"
  imagePath="/images/vanilla.png"
  updateItemCount={jest.fn()}
  />
  )
  ```

## Review of Order Phase Testing

- Tested the whole flow of submitting the order and getting the order confirmation
- Created new mock POST request
- Renewed concepts from other tests and reapplied them in this test
- Used jest.fn() to mock props

## Review Later

- https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen

## Standard Questions to Ask Yourself Before Writing a New Test

- What to render?
  - What's the smallest component that encompasses tests?
- Do I need to pass any props?
- Do I need to wrap in some ContextProvider?
  - Does the provider get used?
  - Is it already wrapped within the component?
- Where should the tests go?
  - Which file?
  - Is a new file needed?
- What to test?
  - What's the behavior that needs testing
- How to test?
  - What querries and events to intercat with the component?
- Do I need to await?
  - Is there anything async going on in the component?
