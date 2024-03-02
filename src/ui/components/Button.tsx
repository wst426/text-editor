import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ text, onClick }) => (
  <button className="border rounded-md p-1" onClick={onClick}>
    {text}
  </button>
);
