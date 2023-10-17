"use client"

interface ButtonProps {
  style: string;
  name: string;
  onClick: (event: any) => void;
  children: any;
}

const Button = ({ children, onClick, style, name }: ButtonProps) => {
  return (
    <button name={ name } onClick={ onClick } className={ style }>
        { children }
    </button>
  )
}

export default Button