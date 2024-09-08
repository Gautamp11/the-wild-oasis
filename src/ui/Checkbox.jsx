import styled from "styled-components";
import React from "react";

// Styled Checkbox
const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

// Forward ref for React Hook Form integration
const Checkbox = React.forwardRef(
  ({ onChange, disabled = false, id, children, ...rest }, ref) => {
    return (
      <StyledCheckbox>
        <input
          type="checkbox"
          id={id}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
        <label htmlFor={!disabled ? id : ""}>{children}</label>
      </StyledCheckbox>
    );
  }
);

Checkbox.displayName = "Checkbox"; // Optional: Name for easier debugging
export default Checkbox;
