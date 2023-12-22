import React, { useEffect, useState } from 'react';
import _, { assign, cloneDeep, set } from 'lodash';
import { toast } from 'react-toastify';
//bs5
import Button from 'react-bootstrap/Button';
//mui theme
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ButtonMui from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
//api
import { createTaskCategory, getTaskCategory } from '../../../services/taskService';

const filter = createFilterOptions();

export default function CreateFilterOptions({ props }) {
    let dataModalAssignDivineWorkPublic = props;
    //console.log(dataModalAssignDivineWorkPublic);
    const [listTaskCategory, setListTaskCategory] = useState([]);
    //config thêm loại công việc
    const [value, setValue] = useState(null);
    const [open, toggleOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState({ category_Name: '' });

    const getListTaskCategory = async () => {
        let resultListTaskCategory = await getTaskCategory();
        setListTaskCategory(resultListTaskCategory);
    }

    const handleClose = () => {
        setDialogValue({
            category_Name: '',
        });
        toggleOpen(false);
    };

    const handleSubmit = async (event) => {
        let response = await createTaskCategory(dialogValue.category_Name);
        if (response === 200) {
            toast.success('Thêm loại công việc thành công!');
            getListTaskCategory();
            // setValue({
            //     category_Name: dialogValue.title,
            //     year: parseInt(dialogValue.year, 10),
            // });
            handleClose();
        }
    };

    useEffect(() => {
        if (listTaskCategory.length === 0) {
            getListTaskCategory();
        }
    }, [])

    return (
        <>

            <Autocomplete style={{ width: '100%' }} value={value} onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    // timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                        toggleOpen(true);
                        setDialogValue({
                            category_Name: newValue,
                        });
                    });
                } else if (newValue && newValue.inputValue) {
                    toggleOpen(true);
                    setDialogValue({
                        category_Name: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let found = _.find(listTaskCategory, (obj) => obj.category_Name === params.inputValue);
                    if (params.inputValue !== '') {
                        if (found === undefined) {
                            filtered.push({
                                inputValue: params.inputValue,
                                category_Name: `Thêm loại công việc "${params.inputValue}"`,
                            });
                        }
                        else {
                            // filtered.push({
                            //     inputValue: '',
                            //     category_Name: '',
                            // });
                        }
                    }
                    return filtered;
                }}
                options={listTaskCategory}
                getOptionLabel={(option) => {
                    // e.g. value selected with enter, right from the input
                    return option.category_Name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.category_Name}</li>}
                // renderOption={(props, option, { selected }) => (
                //     <li {...props}>
                //         <Checkbox
                //             icon={icon}
                //             checkedIcon={checkedIcon}
                //             style={{ marginRight: 8 }}
                //             checked={selected}
                //         />
                //         {option.category_Name}
                //     </li>
                // )}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Loại công việc" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Thêm loại công việc</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="name" value={dialogValue.category_Name} label="Tên loại công việc" type="text" variant="standard"
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    category_Name: event.target.value,
                                })} />
                    </DialogContent>
                    <DialogActions>
                        <ButtonMui onClick={handleSubmit} variant='contained' color='primary'>Thêm</ButtonMui>
                        <Button onClick={handleClose} variant="secondary" >Hủy</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    );
}
