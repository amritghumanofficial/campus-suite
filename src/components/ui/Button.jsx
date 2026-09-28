function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", 
  size = "medium",    
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;