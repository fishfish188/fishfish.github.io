import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type SketchButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function SketchButton({ children, className = "", ...props }: SketchButtonProps) {
  return (
    <button className={`sketch-button ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}
