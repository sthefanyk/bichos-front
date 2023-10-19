"use client"
import { useState } from 'react';

const RadioButtons = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
      <>
        <fieldset className="flex gap-2">
          <input
            type="radio"
            name="type"
            id="cat"
            value="G"
            onChange={(e) => setSelectedOption(e.target.value)}
            className="sr-only"
          />
          <label htmlFor="cat" className={`
            border border-black rounded-md p-2 h-10 w-10 cursor-pointer
            ${selectedOption === "G" ? "bg-lime-normal" : ""}
          `}>
            G
          </label>
          <input
            type="radio"
            name="type"
            id="dog"
            value="C"
            onChange={(e) => setSelectedOption(e.target.value)}
            className='sr-only'
          />
          <label htmlFor="dog" className={`
            border border-black rounded-md p-2 h-10 w-10 cursor-pointer
            ${selectedOption === "C" ? "bg-lime-normal" : ""}
          `}>
            C
          </label>
        </fieldset>
      </>
    );
};

export default RadioButtons;
