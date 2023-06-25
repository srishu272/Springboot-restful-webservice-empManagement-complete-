import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createform() {
  const [empInput, setEmpInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: null,
    phonenumber: null,
    email: "",
    salary: null,
    dob: null,
    gender: "",
    marital_status: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parseValue =
      name === "pincode" || name === "phonenumber" || name === "salary"
        ? parseInt(value, 10)
        : value;
    setEmpInput((prevState) => ({
      ...prevState,
      [name]: parseValue,
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  const submitform = () => {
    console.log(empInput);
    axios
      .post(`http://localhost:8070/api/employees`, empInput)
      .then((response) => {
        console.log(response.data);
        setEmpInput(response.data);
      });
  };

  return (
    <div className="App">
      <Typography variant="h3" align="center">
        Employee Information
      </Typography>
      <TextField
        required
        name="firstName"
        value={empInput.firstName}
        onChange={handleChange}
        type="text"
        placeholder="FirstName"
        variant="outlined"
        label="First Name"
        sx={{ margin: "10px", width: "490px" }}
      ></TextField>

      <TextField
        required
        name="lastName"
        value={empInput.lastName}
        onChange={handleChange}
        type="text"
        placeholder="LastName"
        variant="outlined"
        label="Last Name"
        sx={{ margin: "10px", width: "490px" }}
      ></TextField>

      <br />
      <TextField
        required
        multiline
        name="address"
        value={empInput.address}
        onChange={handleChange}
        rows={3}
        type="text"
        placeholder="Address"
        variant="outlined"
        label="Address"
        sx={{ margin: "10px", width: "1000px" }}
      ></TextField>

      <br />
      <TextField
        required
        name="pincode"
        value={empInput.pincode}
        onChange={handleChange}
        type="number"
        placeholder="Pincode"
        variant="outlined"
        label="Pincode"
        sx={{ margin: "10px", width: "300px" }}
      ></TextField>

      <TextField
        name="phonenumber"
        value={empInput.phonenumber}
        onChange={handleChange}
        type="number"
        placeholder="Phone Number"
        variant="outlined"
        label="Phone Number"
        sx={{ margin: "10px", width: "680px" }}
      ></TextField>

      <br />
      <TextField
        required
        name="email"
        value={empInput.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        variant="outlined"
        label="Email"
        sx={{ margin: "10px", width: "1000px" }}
      ></TextField>

      <br />
      <TextField
        name="salary"
        value={empInput.salary}
        onChange={handleChange}
        type="number"
        placeholder="Salary"
        variant="outlined"
        label="Salary"
        sx={{ margin: "10px", width: "290px" }}
      ></TextField>

      <TextField
        name="dob"
        value={empInput.dob}
        onChange={handleChange}
        type="date"
        placeholder="Date of Birth"
        variant="outlined"
        label="Date of Birth"
        sx={{ margin: "10px", width: "690px" }}
      ></TextField>

      <br />
      <FormControl sx={{ marginLeft: "20px" }}>
        <FormLabel id="gender">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="gender"
          name="gender"
          value={empInput.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ marginLeft: "50px" }}>
        <FormLabel id="marital_status">Marital Status</FormLabel>
        <RadioGroup
          aria-labelledby="marital_status"
          name="marital_status"
          value={empInput.marital_status}
          onChange={handleChange}
        >
          <FormControlLabel value="single" control={<Radio />} label="Single" />
          <FormControlLabel
            value="married"
            control={<Radio />}
            label="Married"
          />
          <FormControlLabel value="widow" control={<Radio />} label="Widow" />
          <FormControlLabel
            value="divorced"
            control={<Radio />}
            label="Divorced"
          />
        </RadioGroup>
      </FormControl>

      <br />
      <Button
        type="submit"
        size="medium"
        variant="contained"
        onClick={submitform}
        sx={{ margin: "30px", width: "200px" }}
      >
        CREATE
      </Button>
      <Button
        size="medium"
        variant="contained"
        sx={{ margin: "30px", width: "200px" }}
        onClick={() => navigate("/")}
      >
        Back
      </Button>
    </div>
  );
}

export default Createform;
