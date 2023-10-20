"use client"
import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";

interface CheckBoxProps {
  disable?: boolean;
  defaultChecked?: boolean;
  id: string;
  label: string;
  handleChecked?: (state: boolean) => void;
}

const CheckBox = (props: CheckBoxProps) => {

  const [state, setState] = useState(true);
  const { handleChecked, ...inputProps } = props;

  const check = () => {
    setState((stt) => !stt);

    if (typeof props.handleChecked === 'function') {
      props.handleChecked(state);
    }
  };

  return (
    <div className="flex gap-2">
        <input type="checkbox" name="" onChange={check}
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
        <label htmlFor={props.id}>{props.label}</label>
    </div>
  )
}

export default CheckBox

