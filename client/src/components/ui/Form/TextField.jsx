import React, { memo } from 'react'
import classes from "./TextField.module.css"


const TextField = memo(({ type, name, value, onChange, placeholder, error, customClass, customBlockClass }) => {

  console.log("Рендер TextField", name);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  };
  return (
    <div className={customBlockClass ? customBlockClass : classes.inputBlock}>
      <input
        type={type}
        className={customClass ? customClass : classes.Block__inp}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        required
      />
      {error && <span className={classes.errorBlock}>{error}</span>}
    </div>
  )
});

export default TextField;