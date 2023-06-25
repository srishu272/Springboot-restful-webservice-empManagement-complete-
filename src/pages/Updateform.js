import React, { useEffect } from "react";
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
import { useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";

export default function Updateform() {
  const { id } = useParams();
  const [empInfo, setEmpInfo] = useState({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parseValue =
      name === "pincode" || name === "phonenumber" || name === "salary"
        ? parseInt(value, 10)
        : value;
    setEmpInfo((prevState) => ({
      ...prevState,
      [name]: parseValue,
    }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8070/api/employees/${id}`).then((response) => {
      console.log(response.data);
      setEmpInfo(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8070/api/employees/${id}`, empInfo)
      .then((response) => {
        console.log(response.data);
        setEmpInfo(response.data);
        navigate("/");
      });
  };

  return (
    <div className="App">
      <Typography variant="h3" align="center">
        Employee Information
      </Typography>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          required
          name="firstName"
          value={empInfo.firstName}
          onChange={handleChange}
          type="text"
          placeholder="FirstName"
          variant="filled"
          label="First Name"
          sx={{ margin: "10px", width: "490px" }}
        ></TextField>

        <TextField
          required
          name="lastName"
          value={empInfo.lastName}
          onChange={handleChange}
          type="text"
          placeholder="LastName"
          variant="filled"
          label="Last Name"
          sx={{ margin: "10px", width: "490px" }}
        ></TextField>

        <br />
        <TextField
          required
          multiline
          name="address"
          value={empInfo.address}
          onChange={handleChange}
          rows={3}
          type="text"
          placeholder="Address"
          variant="filled"
          label="Address"
          sx={{ margin: "10px", width: "1000px" }}
        ></TextField>

        <br />
        <TextField
          required
          name="pincode"
          value={empInfo.pincode}
          onChange={handleChange}
          type="number"
          placeholder="Pincode"
          variant="filled"
          label="Pincode"
          sx={{ margin: "10px", width: "300px" }}
        ></TextField>

        <TextField
          name="phonenumber"
          value={empInfo.phonenumber}
          onChange={handleChange}
          type="number"
          placeholder="Phone Number"
          variant="filled"
          label="Phone Number"
          sx={{ margin: "10px", width: "680px" }}
        ></TextField>

        <br />
        <TextField
          required
          name="email"
          value={empInfo.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          variant="filled"
          label="Email"
          sx={{ margin: "10px", width: "1000px" }}
        ></TextField>

        <br />
        <TextField
          name="salary"
          value={empInfo.salary}
          onChange={handleChange}
          type="number"
          placeholder="Salary"
          variant="filled"
          label="Salary"
          sx={{ margin: "10px", width: "290px" }}
        ></TextField>

        <TextField
          name="dob"
          value={empInfo.dob}
          onChange={handleChange}
          type="date"
          placeholder="Date of Birth"
          variant="filled"
          label="Date of Birth"
          sx={{ margin: "10px", width: "690px" }}
        ></TextField>

        <br />
        <FormControl sx={{ marginLeft: "20px" }}>
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="gender"
            name="gender"
            value={empInfo.gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ marginLeft: "50px" }}>
          <FormLabel id="marital_status">Marital Status</FormLabel>
          <RadioGroup
            aria-labelledby="marital_status"
            name="marital_status"
            value={empInfo.marital_status}
            onChange={handleChange}
          >
            <FormControlLabel
              value="single"
              control={<Radio />}
              label="Single"
            />
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
          sx={{ margin: "30px", width: "200px" }}
        >
          Update
        </Button>
        <Button
          size="medium"
          variant="contained"
          sx={{ margin: "30px", width: "200px" }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </form>
    </div>
  );
}
