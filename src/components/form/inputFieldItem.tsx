import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FormValidator } from "../etc/FormValidator";

export interface IValidItem {
  id: string;
  name: string;
  isArray: boolean;
  required: boolean;
  regMatch?: string;
  compType:
    | "input"
    | "check"
    | "select"
    | "textarea"
    | "date"
    | "email"
    | "radio"
    | "password"
    | "select"
    | "button";
  placeholder?: string;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface IInputFieldItemProps {
  hasDupCheck?: boolean;
  item: IValidItem;
  src: { [id: string]: any };
  custom?: boolean;
  option?: KeyValue[];
  onChange?: (value: string) => void;
  onDupCheck?: () => void;
}

export default function InputFieldItem(props: IInputFieldItemProps) {
  const { hasDupCheck, item, src, custom, option, onChange, onDupCheck } =
    props;

  return (
    <>
      <InputGroup>
        <FormControl
          id={item.id}
          as="input"
          type={item.compType === "input" ? "text" : item.compType}
          custom={custom && !hasDupCheck}
          placeholder={item.placeholder}
          value={src[item.name] || ""}
          onChange={() => {
            if (onChange) onChange(FormValidator.getElementValue(item));
          }}
        />
        {hasDupCheck ? (
          <InputGroup.Append>
            <Button
              className="btn-dark"
              onClick={() => {
                if (onDupCheck) onDupCheck();
              }}
            >
              중복체크
            </Button>
          </InputGroup.Append>
        ) : undefined}
      </InputGroup>
    </>
  );
}
