import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const momentTimePicker = ({label, value, onChange}) => {

    return (<MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
            key={label.trim()}
            disableToolbar
            format="DD/MM/yyyy"
            margin="normal"
            label={label}
            clearable
            value={value}
            onChange={onChange}
        />
    </MuiPickersUtilsProvider>)
}

export default momentTimePicker;