import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Medicine(props) {
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState([])
  const [update, setupdate] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitData = (values) => {
    let LocalData = JSON.parse(localStorage.getItem("Medicines"));

    let data = {
      id: Math.floor(Math.random() * 1000),
      ...values
    }

    console.log(data);

    if (LocalData === null) {
      localStorage.setItem("Medicines", JSON.stringify([data]))
    } else {
      LocalData.push(data);
      localStorage.setItem("Medicines", JSON.stringify(LocalData))
    }

    loadData()
    setOpen(false);
  };

  let Medicine_validation = {
    name: yup.string().required("Please enter your Name"),
    quantity: yup.number().required("Please enter Quantity"),
    price: yup.number().required("Please enter the price"),
    expiry: yup.date().required("Please enter the expiry date"),
  };
  const schema = yup.object().shape(Medicine_validation);

  const initVal = {
    name: update.name ? update.name : "",
    quantity: update.quantity ? update.quantity : "",
    price: update.price ? update.price : "",
    expiry: update.expiry ? update.expiry : "",

  };

  const formik = useFormik({
    initialValues: initVal,
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      // console.log(values)
      handleSubmitData(values);

      resetForm();
    }
  })

  const loadData = () => {
    let LocalData = JSON.parse(localStorage.getItem("Medicines"));

    if (LocalData !== null) {
      setdata(LocalData);
    }
  }

  useEffect(
    () => {
      loadData()
    },
    []
  )

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Medicine Name', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'price', headerName: 'Medicine Price', width: 130 },
    { field: 'expiry', headerName: 'Expiry Year', width: 130 },
    {
      field: 'Action', headerName: 'Action', width: 130,
      renderCell: (params) => (
        // console.log(params)
        <>
          <IconButton aria-label="delete" onClick={() => HandleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => HandleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
        </>
      )
    }
  ];

  const HandleDelete = (id) => {
    const LocalData = JSON.parse(localStorage.getItem("Medicines"));
    let filterData = LocalData.filter((v, i) => v.id !== id)
    localStorage.setItem("Medicines", JSON.stringify(filterData));
    loadData();
  }

  const HandleEdit = (id) => {
    setOpen(true);
  }
  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Button variant="outlined" onClick={handleClickOpen} className="medicine_button">
        Add Medicine Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Medicine Data </DialogTitle>
        <Formik value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <TextField
                type="text"
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Medicine name"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                defaultValue={formik.values.name}
                helperText={formik.errors.name}
                error={formik.errors.name ? true : false}
              />

              <TextField
                autoFocus
                margin="dense"
                id="quantity"
                name="quantity"
                label="Quantity"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                defaultValue={formik.values.quantity}
                helperText={formik.errors.quantity}
                error={formik.errors.quantity ? true : false}
              />
              <TextField
                autoFocus
                margin="dense"
                id="price"
                name="price"
                label="Price"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                defaultValue={formik.values.price}
                helperText={formik.errors.price}
                error={formik.errors.price ? true : false}
              />
              <TextField
                autoFocus
                margin="dense"
                id="expiry"
                name="expiry"
                label="Expiry"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                defaultValue={formik.values.expiry}
                helperText={formik.errors.price}
                error={formik.errors.expiry ? true : false}
              />

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                  <Button type="submit">Submit</Button>
                }
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik>
      </Dialog>

    </div>
  );
}

export default Medicine;
