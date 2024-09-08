import styled from "styled-components";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

const StyledMenu = styled.div`
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  right: 70%;
  top: 100%;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  z-index: 1000;
`;

const StyledItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

function Menus({
  onDuplicate,
  onEdit,
  onDelete,
  isOpen,
  onClose,
  onToggle,
  options,
}) {
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, onClose]);

  return (
    <StyledMenu ref={menuRef}>
      <StyledToggle onClick={onToggle}>
        <HiOutlineDotsHorizontal />
      </StyledToggle>
      {isOpen && (
        <StyledList>
          {/* <StyledItem>
            <StyledButton onClick={onDuplicate}>Duplicate</StyledButton>
          </StyledItem>
          <StyledItem>
            <StyledButton onClick={onEdit}>Edit</StyledButton>
          </StyledItem>
          <StyledItem>
            <StyledButton onClick={onDelete}>Delete</StyledButton>
          </StyledItem> */}
          <StyledItem>
            {options.map((option) => (
              <StyledButton key={option.label} onClick={option.onClick}>
                {option.label}
              </StyledButton>
            ))}
          </StyledItem>
        </StyledList>
      )}
    </StyledMenu>
  );
}

export default Menus;
