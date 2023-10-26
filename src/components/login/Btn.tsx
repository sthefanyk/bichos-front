"use client"

interface BtnProps {
  style: string;
  children: any;
}

const Btn = ({ children, style }: BtnProps) => {
  return (
    <button onClick={ () => console.log('aaaaa') } className={ style }>
      { children }
    </button>
  )
}

export default Btn