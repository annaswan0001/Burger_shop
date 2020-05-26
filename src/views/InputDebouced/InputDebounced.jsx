import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {inputSetValueSaga, inputSetValueSaga2} from '../../store/actions/inputDebouncedAction'

function InputDebounced(props) {

    const [value, setValue] = useState("")
    const [valueDeb, setValueDeb] = useState("")

    useEffect(() => {
        if(value){
            props.inputSetValueSaga(value)
        }
        
    }, [value])

    
    useEffect(() => {
        if(valueDeb){
            props.inputSetValueSaga2(valueDeb)
        }
        
    }, [valueDeb])

    const setInputValue =(e) =>{
        setValue(e.target.value) 
    }
    const setInputValueDeb =(e) =>{
        setValueDeb(e.target.value) 
    }
    return (
        <div>
            <p>Input debounced (variant 1)</p>
            <input onChange={setInputValue} type="text" value={value}/>
            <p>Input debounced (variant 2)</p>
            <input onChange={setInputValueDeb} type="text" value={valueDeb}/>
        </div>
    )
}

export default connect(null,{inputSetValueSaga, inputSetValueSaga2 })( InputDebounced)

