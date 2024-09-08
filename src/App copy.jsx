import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// All practice code to understand styled comp :)

// to target the main div app
const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      {/*  Global styles should be sibling to main */}
      {/* using 'as' to render same html elemnet in dom passed and 'type' to just pass the paramter */}
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'> Hello World</Heading>
            <div>
              <Button color='primary' size='medium' onClick={() => alert("Hi")}>
                Check in
              </Button>
              <Button
                color='secondary'
                size='medium'
                onClick={() => alert("Hi")}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>
            <form>
              <Input type='number' placeholder='No.of guests' />
              <Input type='number' placeholder='No.of guests' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
