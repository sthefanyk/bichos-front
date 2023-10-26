"use client"
import { BsCheckLg } from "react-icons/bs";

interface CheckBoxProps {
  disable?: boolean;
  defaultChecked?: boolean;
  id: string;
  label: any;
  isChecked: boolean;
  setIsChecked: any;
}

const CheckBox = (props: CheckBoxProps) => {
  const { setIsChecked, isChecked, ...inputProps } = props;

  return (
    <div className="flex gap-2">
        <input type="checkbox" name="" onChange={() => setIsChecked(!isChecked)} 
            checked={isChecked}
            className={`
                peer relative appearance-none shrink-0 w-4 h-4 border border-black rounded-sm mt-1 bg-white
                focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                checked:bg-darkblue-normal checked:border-0
                disabled:border-steel-400 disabled:bg-steel-400
            `}
            {...inputProps}
        />
        <BsCheckLg className={`
            absolute h-4 w-4 mt-1
            hidden peer-checked:block 
            pointer-events-none
            text-white font-bold
        `} />
        <label htmlFor={props.id} className="peer-checked:text-darkblue-normal">{props.label}</label>
    </div>
  )
}

export default CheckBox

