"use client"
import { useState } from 'react';

const RadioButtonsSize = ({name}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const p = "small" + name;
    const m = "medium" + name;
    const g = "large" + name;

    return (
      <>
        <fieldset className="flex gap-2">
          <input
            type="radio"
            name={name}
            id={p}
            value="P"
            onChange={(e) => setSelectedOption(e.target.value)}
            className="sr-only"
          />
          <label htmlFor={p} className={`
            border border-black rounded-md p-2 h-10 w-10 cursor-pointer
            ${selectedOption === "P" ? "bg-lime-normal" : ""}
          `}>
            P
          </label>
          <input
            type="radio"
            name={name}
            id={m}
            value="M"
            onChange={(e) => setSelectedOption(e.target.value)}
            className='sr-only'
          />
          <label htmlFor={m} className={`
            border border-black rounded-md p-2 h-10 w-10 cursor-pointer
            ${selectedOption === "M" ? "bg-lime-normal" : ""}
          `}>
            M
          </label>
          <input
            type="radio"
            name={name}
            id={g}
            value="G"
            onChange={(e) => setSelectedOption(e.target.value)}
            className='sr-only'
          />
          <label htmlFor={g} className={`
            border border-black rounded-md p-2 h-10 w-10 cursor-pointer
            ${selectedOption === "G" ? "bg-lime-normal" : ""}
          `}>
            G
          </label>
        </fieldset>
      </>
    );
};

export default RadioButtonsSize;
