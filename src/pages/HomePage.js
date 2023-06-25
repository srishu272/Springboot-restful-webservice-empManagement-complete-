import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import stepper from "./pages/Stepper";
import {
  TextField,
  TableBody,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

function HomePage() {
  const [empInfo, setEmpInfo] = useState();
  const [empId, setEmpId] = useState();
  const [empFirstName, setEmpFirstName] = useState();
  const [empLastName, setEmpLastName] = useState();
  const [val, setval] = useState();
  const navigate = useNavigate();

  const empIdsetter = (val) => {
    setEmpId(val);
  };

  const empfirstnamesetter = (val) => {
    setEmpFirstName(val);
  };

  const emplastnamesetter = (val) => {
    setEmpLastName(val);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios.get("http://localhost:8070/api/employees").then((response) => {
      console.log(response.data);
      setEmpInfo(response.data);
    });
  }, [val]);

  const employeeId = (empId) => {
    //console.log(`http://localhost:8070/api/employees/${empId}`);
    axios
      .get(`http://localhost:8070/api/employees/${empId}`, { maxRedirects: 0 })
      .then((response) => {
        console.log(response.data);
        setEmpInfo([response.data]);
      })
      .catch((err) => console.error("erroraxios", err));
  };

  const employeeName = (empFirstName, empLastName) => {
    console.log(
      `http://localhost:8070/api/employees/name?firstName=${empFirstName}&lastName=${empLastName}`
    );
    axios
      .get(
        `http://localhost:8070/api/employees/name?firstName=${empFirstName}&lastName=${empLastName}`
      )
      .then((response) => {
        console.log(response.data);
        // setEmpFirstName([response.data.firstName]);
        // setEmpLastName([response.data.lastName]);
        setEmpInfo(response.data);
      })
      .catch((err) => console.error("erroraxios", err));
  };

  const handleDeleteInfo = (empId) => {
    axios
      .delete(`http://localhost:8070/api/employees/${empId}`)
      .then((response) => {
        console.log(response);
        handleRefresh(response, empId);
      })
      .catch((err) => console.error("error", err));
  };

  const handleRefresh = (response, empId) => {
    if (response.status === 200) {
      setval(empId);
    }
  };

  const renderEmployeeInfo = (empInfo) => {
    if (empInfo) {
      return (
        <TableContainer>
          <Table></Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {empInfo.map((data, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.firstName}</TableCell>
                  <TableCell>{data.lastName}</TableCell>
                  <TableCell>{data.email}</TableCell>

                  <TableCell>
                    <Link
                      component="button"
                      variant="button"
                      to={`/update/${data.id}`}
                    >
                      Edit
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="filled"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteInfo(data.id)}
                    ></Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      );
    } else {
      return <div>No Data Found</div>;
    }
  };
  return (
    <div>
      <Typography variant="h3" align="center">
        Employee Management
      </Typography>

      <br />
      <stepper />
      <br />
      <TextField
        id="empId"
        name="empId"
        type="text"
        variant="outlined"
        placeholder="ID"
        label="ID"
        value={empId}
        onChange={(event) => empIdsetter(event.target.value)}
        sx={{ margin: "30px", width: "300px" }}
      ></TextField>

      <TextField
        id="empFirstName"
        name="empFirstName"
        type="text"
        variant="outlined"
        placeholder="FirstName"
        label="FirstName"
        value={empFirstName}
        onChange={(event) => empfirstnamesetter(event.target.value)}
        sx={{ marginLeft: "100px", marginTop: "30px", width: "400px" }}
      ></TextField>

      <TextField
        id="empLastName"
        name="empLastName"
        type="text"
        variant="outlined"
        placeholder="LastName"
        label="LastName"
        value={empLastName}
        onChange={(event) => emplastnamesetter(event.target.value)}
        sx={{ marginTop: "30px", marginLeft: "10px", width: "400px" }}
      ></TextField>
      <br />

      <Button
        id="searchid"
        size="medium"
        variant="contained"
        sx={{ marginLeft: "30px" }}
        onClick={() => employeeId(empId)}
        onSubmit={(event) => handleSubmit(event)}
      >
        Search By ID
      </Button>

      <Button
        id="searchname"
        size="medium"
        variant="contained"
        sx={{ marginRight: "30px", marginLeft: "957px" }}
        onClick={() => employeeName(empFirstName, empLastName)}
        onSubmit={(event) => handleSubmit(event)}
      >
        Search By Name
      </Button>
      <br />
      <br />
      {renderEmployeeInfo(empInfo)}
      <br />
      <br />
      <Button
        id="createnew"
        size="large"
        variant="contained"
        sx={{ marginTop: "30px", marginLeft: "10px", width: "400px" }}
        onClick={() => navigate("createnew")}
      >
        CREATE
      </Button>
    </div>
  );
}

export default HomePage;
