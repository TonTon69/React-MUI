import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Typography } from "@mui/material";
import Form from "./components/Form";

import "./App.css";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 120,
    },
    {
        field: "gender",
        headerName: "Gender",
        width: 160,
    },
    {
        field: "address",
        headerName: "Address",
        sortable: false,
        width: 300,
    },
];

function App() {
    const [users, setUsers] = useState(() => {
        const storageUsers = JSON.parse(localStorage.getItem("users"));
        return storageUsers ?? [];
    });

    const callbackFunction = (childData) => {
        let temp = {
            id: +childData.id?.value,
            name: childData.name?.value,
            age: +childData.age?.value,
            gender: childData.gender?.value,
            address: childData.address?.value,
        };
        console.log("temp: ", temp);
        setUsers((prevState) => {
            const newUsers = [...prevState, temp];
            const jsonUsers = JSON.stringify(newUsers);
            localStorage.setItem("users", jsonUsers);

            return newUsers;
        });
    };

    return (
        <div className="App">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Form parentCallback={callbackFunction} />
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ flexDirection: "column", textAlign: "center" }}>
                        <Typography variant="h6">List User</Typography>
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={users}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                sx={{ mt: 3 }}
                            />
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
