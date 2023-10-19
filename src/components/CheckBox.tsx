"use client"

import { BsCheckLg } from "react-icons/bs";

interface CheckBoxProps {
  disable?: boolean;
  defaultChecked?: boolean;
  id: string;
  label: string;
}

const CheckBox = (props: CheckBoxProps) => {
  return (
    <div className="w-full flex gap-2">
        <input type="checkbox" name=""
            className={`
                peer relative appearance-none shrink-0 w-4 h-4 border border-black rounded-sm mt-1 bg-white
                focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                checked:bg-darkblue-normal checked:border-0
                disabled:border-steel-400 disabled:bg-steel-400
            `}
            {...props}
        />
        <BsCheckLg className={`
            absolute h-4 w-4 mt-1
            hidden peer-checked:block
            pointer-events-none
            text-white font-bold
        `} />
        <label htmlFor={props.id}>{props.label}</label>
    </div>
  )
}

export default CheckBox