import React from 'react';
import styled from 'styled-components';

const Checkbox = ({ checked, onChange, id }) => {
    return (
        <StyledWrapper>
            <label className="container">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange} />
                <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="clipboard"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg>
                <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="clipboard-check"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
            </label>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /*------ Settings ------*/
  .container {
    --color: #fff;
    --size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: var(--size);
    user-select: none;
    fill: var(--color);
  }

  .container .clipboard {
    animation: keyframes-fill .5s;
  }

  .container .clipboard-check {
    
    display: none;
    animation: keyframes-fill .5s;
  }

  /* ------ On check event ------ */
  .container input:checked ~ .clipboard {
    display: none;
  }

  .container input:checked ~ .clipboard-check {
    display: block;
  }

  /* ------ Hide the default checkbox ------ */
  .container input {
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* ------ Animation ------ */
  @keyframes keyframes-fill {
    0% {
      transform: rotate(0deg) scale(0);
      opacity: 0;
    }

    50% {
      transform: rotate(-10deg) scale(1.2);
    }
  }`;

export default Checkbox;
