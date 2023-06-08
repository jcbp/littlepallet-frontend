import React, { FC, ChangeEvent, useRef, useEffect } from "react";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const MultilineTextField: FC<Props> = ({ value, field, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateHeight();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const updateHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "1px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight - 3 + "px";
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={updateHeight}
      className="rounded-md px-2 py-1.5 mr-2 outline-none shadow-focus w-full"
      value={value ?? ""}
      placeholder={`- ${field.name} -`}
      onChange={handleChange}
    />
  );
};

export default MultilineTextField;
