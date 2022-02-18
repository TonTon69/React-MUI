import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";

const defaultValues = {
    id: {
        value: 1,
        error: false,
        errorMessage: "You must enter a id",
    },
    name: {
        value: "",
        error: false,
        errorMessage: "You must enter a name",
    },
    age: {
        value: 22,
        error: false,
        errorMessage: "You must enter an age",
    },
    gender: {
        value: "",
        error: false,
        errorMessage: "You must choose your gender",
    },
    address: {
        value: "",
        error: false,
        errorMessage: "You must choose your address",
    },
};

function Form({ parentCallback }) {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues };

        for (let i = 0; i < formFields.length; i++) {
            const currentField = formFields[i];
            const currentValue = formValues[currentField].value;

            if (currentValue === "") {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true,
                    },
                };
            } else {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: false,
                    },
                };
            }
        }

        setFormValues(newFormValues);
        parentCallback(formValues);
    };

    return (
        <Box sx={{ flexDirection: "column", textAlign: "center" }}>
            <Typography variant="h6">React Material Form</Typography>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container direction="column" sx={{ mt: 3 }}>
                    <Grid item>
                        <TextField
                            id="id-input"
                            name="id"
                            label="ID"
                            type="number"
                            value={formValues.id.value}
                            onChange={handleInputChange}
                            error={formValues.id.error}
                            helperText={
                                formValues.id.error &&
                                formValues.id.errorMessage
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            value={formValues.name.value}
                            onChange={handleInputChange}
                            error={formValues.name.error}
                            helperText={
                                formValues.name.error &&
                                formValues.name.errorMessage
                            }
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="age-input"
                            name="age"
                            label="Age"
                            type="number"
                            value={formValues.age.value}
                            onChange={handleInputChange}
                            error={formValues.age.error}
                            helperText={
                                formValues.age.error &&
                                formValues.age.errorMessage
                            }
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item sx={{ my: 2 }}>
                        <FormControl error={formValues.gender.error}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={formValues.gender.value}
                                onChange={handleInputChange}
                                row
                            >
                                <FormControlLabel
                                    value="male"
                                    control={<Radio size="small" />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio size="small" />}
                                    label="Female"
                                />
                                <FormControlLabel
                                    value="other"
                                    control={<Radio size="small" />}
                                    label="Other"
                                />
                            </RadioGroup>
                            <FormHelperText>
                                {formValues.gender.error &&
                                    formValues.gender.errorMessage}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            error={formValues.address.error}
                            fullWidth
                        >
                            <InputLabel id="select-label-address">
                                Address
                            </InputLabel>
                            <Select
                                labelId="select-label-address"
                                name="address"
                                value={formValues.address.value}
                                label="Address"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="hcm">HCM</MenuItem>
                                <MenuItem value="hn">HN</MenuItem>
                                <MenuItem value="qn">QN</MenuItem>
                            </Select>
                            <FormHelperText>
                                {formValues.address.error &&
                                    formValues.address.errorMessage}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 3 }}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default Form;
