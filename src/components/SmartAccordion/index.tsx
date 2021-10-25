import React, { useState, createContext, useContext, ReactNode } from 'react';
import * as S from './SmartAccordion.style';

const AccordionContext = createContext();
const useAccordionContext = () => useContext(AccordionContext);

type IAccordion = {
  children: ReactNode;
};

export const SmartAccordion = ({ children }: IAccordion) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    setIsOpen,
  };
  return (
    <AccordionContext.Provider value={value}>
      <S.Wrapper>{children}</S.Wrapper>
    </AccordionContext.Provider>
  );
};

// isOpen: boolean;
// setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

type IAccordionHeader = {
  children: ReactNode;
  className?: string;
};

export const SmartAccordionHeader = ({ children, className }: IAccordionHeader) => {
  const { isOpen, setIsOpen } = useAccordionContext();

  return (
    <S.HeaderWrapper onClick={() => setIsOpen(!isOpen)} className={className}>
      {children}
    </S.HeaderWrapper>
  );
};

type IAccordionBody = {
  children: ReactNode;
  className?: string;
};

export const SmartAccordionBody = ({ children, className }: IAccordionBody) => {
  const { isOpen } = useAccordionContext();

  return (
    <S.BodyWrapper isOpen={isOpen} className={className}>
      {children}
    </S.BodyWrapper>
  );
};
