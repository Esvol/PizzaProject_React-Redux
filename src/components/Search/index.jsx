import React, { useCallback, useRef, useState } from 'react'
import styles from './Search.module.scss'

import debounce from 'lodash.debounce'

import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {

  const [value, setValue] = useState('')
  const inputRef = useRef()

  const dispatch = useDispatch()

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 250), [])

  const onChangeInput = (val) => {
    setValue(val)
    updateSearchValue(val);
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title /><path d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z" style={{ fill: 'none', stroke: "#000", strokeMiterlimit: '10', strokeWidth: "32px" }} /><line style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: '10', strokeWidth: '32px' }} x1="338.29" x2="448" y1="338.29" y2="448" /></svg>
      <input ref={inputRef} value={value} onChange={(e) => onChangeInput(e.target.value)} className={styles.input} placeholder='Поиск пиццы...' />
      {value && <svg onClick={() => onClickClear()} className={styles.clear} height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)"><g id="close" transform="translate(341.000000, 89.000000)"><path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" id="Shape" /></g></g></g></svg>}
    </div>
  )
}

export default Search;