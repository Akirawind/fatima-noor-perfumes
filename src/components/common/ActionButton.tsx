import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type Variant = "primary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-cream-100 text-ink-950 hover:bg-cream-50 hover:shadow-lg hover:shadow-gold-500/10",
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25",
  outline:
    "border border-current/40 hover:border-gold-400 hover:text-gold-300",
  ghost: "text-current hover:text-gold-500",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[11px]",
  md: "px-6 py-3.5 text-xs",
  lg: "px-8 py-4 text-sm",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    to?: undefined;
    href?: undefined;
  };

export type LinkButtonProps = CommonProps & {
  to: string;
  href?: undefined;
};

export type AnchorButtonProps = CommonProps & {
  href: string;
  to?: undefined;
};

export type ActionButtonProps =
  | ButtonProps
  | LinkButtonProps
  | AnchorButtonProps;

/** Единая кнопка сайта: поддерживает <button>, внутренний <Link> и внешние ссылки. */
export function ActionButton(props: ActionButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;

  if ("to" in props && typeof props.to === "string") {
    return (
      <Link to={props.to} className={buttonClasses(variant, size, className)}>
        {children}
      </Link>
    );
  }

  if ("href" in props && typeof props.href === "string") {
    return (
      <a href={props.href} className={buttonClasses(variant, size, className)}>
        {children}
      </a>
    );
  }

  const buttonOnlyProps = props as ButtonProps;
  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    type,
    ...rest
  } = buttonOnlyProps;
  return (
    <button
      type={type ?? "button"}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
