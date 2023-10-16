'use client'
import React, { useState } from 'react';

function Toggle({onClick}) {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
    onClick();
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle to {isToggled ? 'ascending' : 'descending'}</button>
    </div>
  );
}

export default Toggle;