import type { Component, JSX } from "solid-js";

type ButtonProps = {
  children: JSX.Element;
  onClick?: () => void;
  class?: string;
  disabled?: boolean;
};

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      class={`px-10 py-4 text-xl font-semibold rounded-4xl transition cursor-pointer
        bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed
        ${props.class ?? ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
