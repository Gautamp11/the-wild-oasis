import styled, { css } from "styled-components";

//Styling outside to use styles as variables or to perform some task
// const test = css`
//   text-align: center;
//   ${6 > 5 && "background-color: yellow"}
// `;

//out first styled component having some props sp that we can use it for other heading like h2 or so
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}  
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
`;

/* font-size: ${10 > 5 ? "30px" : "5px"}; */
/* background-color: yellow; */
/* ${test} */
export default Heading;
