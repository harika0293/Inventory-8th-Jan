// eslint-disable some-rule/specific-rule
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link } from "react-router-dom";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import "../modal.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
//import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
//import SoftAlert from "components/SoftAlert";
import { DataGridPro } from "@mui/x-data-grid-pro";
//import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

function DetailPanelContent() {
  return (
    <Stack sx={{ py: 2, height: "100%", boxSizing: "border-box" }} direction="column">
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <DataGridPro
            density="compact"
            checkboxSelection
            //sx={{ color: "#0B2F8A" }}
            columns={[
              // { ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 60 },
              { field: "id", headerName: "UID", width: 80 },

              { field: "seriesName", headerName: "SERIES NAME", width: 130 },
            ]}
            rows={[
              { id: "19", seriesName: "G2021-22" },
              { id: "122", seriesName: "R2021-22" },
              { id: "123", seriesName: "C2021-22" },
              { id: "124", seriesName: "M2021-22" },
              { id: "125", seriesName: "D2021-22" },
            ]}
            sx={{ flex: 1, color: "#FFFFFF", backgroundColor: "#808080" }}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

const columnsnewPro = [
  //{ ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 60 },
  { field: "id", headerName: "Order ID" },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "date", type: "date", headerName: "Placed at" },
  { field: "currency", headerName: "Currency" },
];

const rowsnewPro = [
  {
    id: 1,
    customer: "Matheus",

    date: "randomCreatedDate()",

    currency: "randomCurrency()",
  },
  {
    id: 2,
    customer: "Olivier",

    date: "randomCreatedDate()",

    currency: "randomCurrency()",
  },
  {
    id: 3,
    customer: "Flavien",

    date: "randomCreatedDate()",

    currency: "randomCurrency()",
  },
  {
    id: 4,
    customer: "Danail",

    date: "randomCreatedDate()",

    currency: "randomCurrency()",
  },
];

const ProductionOrderList = () => {
  // const text = {
  //   color: "#0B2F8A",
  //   fontSize: "15px",
  //   fontWeight: "500",
  //   marginRight: "10px",
  // };

  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    []
  );

  const getDetailPanelHeight = React.useCallback(() => 400, []);

  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [statusList, setStatusList] = React.useState([]);
  const [fromDateOne, setFromDateOne] = useState("");
  const [toDateTwo, setToDateTwo] = useState("");
  const [fromDateOneError, setFromDateOneError] = useState(false);
  const [toDateTwoError, setToDateTwoError] = useState(false);
  //const [status, setStatus] = useState("");
  // const [warehouse, setWarehouse] = useState("");
  //const [series, setSeries] = useState("");
  const [docNum, setDocNum] = useState("");

  const [cardCode, setCardCode] = useState("");
  const [docEntry, setDocEntry] = useState("");
  const [objectType, setObjectType] = useState("");

  const handleNameChange = (event) => {
    const limit = 12;

    //  only take first N characters
    setDocNum(event.target.value.slice(0, limit));
  };

  const seriesColumns = [
    { field: "id", headerName: "UID", width: 80 },
    // { field: "series", headerName: "Series Name", width: 120 },
    { field: "seriesName", headerName: "SERIES NAME", width: 130 },
  ];
  // const initialSeriesRows = [
  //   { id: "19", seriesName: "G2021-22" },
  //   { id: "122", seriesName: "R2021-22" },
  //   { id: "123", seriesName: "C2021-22" },
  //   { id: "124", seriesName: "M2021-22" },
  //   { id: "125", seriesName: "D2021-22" },
  // ];

  const [seriesid, setSeriesid] = useState("");
  const [seriesAPIList, setSeriesAPIList] = useState([]);

  const onRowsSeriesHandler = (ids) => {
    //console.log(ids[0]);
    const seriesResultId = ids[0];

    setSeriesid(seriesResultId);
    //console.log(seriesResultId);
    //console.log(seriesid);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getSeries")
      .then(function (response) {
        const seriesDataAPI = response.data.body;

        const NewSeriesDataAPIList = seriesDataAPI;
        setSeriesAPIList(NewSeriesDataAPIList);

        // console.log("2", seriesDataAPI);
        // console.log("2", NewSeriesDataAPIList);
        //console.log("testing", seriesDataAPI2);
        // console.log("1", initialSeriesRows);
        //console.log("Series API List1", seriesAPIList);
      })
      .catch(function (error) {
        console.log("Series API Error", error);
      });
  }, []);

  const whsColumns = [
    // { field: "id", headerName: "UID", width: 80 },
    { field: "whsCode", headerName: "WHS CODE", width: 100 },
    { field: "whsName", headerName: "WAREHOUSE NAME", width: 260 },
  ];
  // const initialWhsRows = [
  //   { id: "01", whsCode: "01", whsName: "General Warehouse" },
  //   { id: "122", whsCode: "02", whsName: "Aluminum and Pipes" },
  //   { id: "123", whsCode: "03", whsName: "Black FG" },
  //   { id: "124", whsCode: "04", whsName: "Aluminum and Pipes" },
  //   { id: "125", whsCode: "05", whsName: "Black FG" },
  // ];

  const [whsid, setWhsid] = useState("");
  const [whsAPIList, setwhsAPIList] = useState([]);

  const onRowsWhsHandler = (idsW) => {
    //console.log(idsW[0]);
    const whsResultId = idsW[0];

    setWhsid(whsResultId);
    //console.log(whsResultId);
    // console.log(whsid);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9003/api/getWarehouse")
      .then(function (response) {
        const whsDataAPI = response.data.body;

        const NewwhsDataAPIList = whsDataAPI;
        setwhsAPIList(NewwhsDataAPIList);

        // console.log("3", whsDataAPI);
        // console.log("3", NewwhsDataAPIList);
        //console.log("3", whsAPIList);
        //console.log("testing", seriesDataAPI2);
        // console.log("1", initialSeriesRows);
        //console.log("Series API List1", seriesAPIList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block WHS", error);
      });
  }, []);

  const orderStatusColumns = [
    { field: "uid", headerName: "UID", width: 80 },
    { field: "id", headerName: "SELECT ORDER STATUS", width: 200 },
  ];
  const orderStatusRows = [
    { uid: "1", id: "Planned" },
    { uid: "2", id: "Released" },
  ];

  const [OSid, setOSid] = useState("");
  //const [whsAPIList, setwhsAPIList] = useState([]);

  const onOrderStatusHandler = (idsOS) => {
    console.log(idsOS[0]);
    const OSResultId = idsOS[0];

    setOSid(OSResultId);
    console.log(OSResultId);
    console.log(orderStatusRows);
    console.log(OSid);
  };

  const columns = [
    { ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 60 },
    //{ field: "id", headerName: "UID", width: 100 },
    { field: "docNum", headerName: "PRD ORDER NO", width: 130 },
    // { field: "status", headerName: "STATUS", width: 130 },
    { field: "postDate", headerName: "ORDER DATE", width: 120 },

    {
      field: "itemCode",
      headerName: "PRD ITEM CODE",
      width: 160,
    },
    {
      field: "itemName",
      headerName: "PRODUCTION ITEM NAME",
      width: 300,
    },
    {
      field: "plannedQty",
      headerName: "PLANNED QTY",
      width: 120,
    },
    // {
    //   field: "objectType",
    //   headerName: "OBJECT TYPE",
    //   width: 150,
    // },
    {
      field: "cardCode",
      headerName: "CARD CODE",
      width: 110,
    },
    { field: "warehouse", headerName: "FROM WAREHOUSE", width: 140 },
    {
      field: "toWarehouse",
      headerName: "TO WAREHOUSE",
      width: 150,
      editable: true,
    },
    {
      field: "docDate",
      headerName: "DOC DATE",
      width: 140,
      type: "date",
      editable: true,
    },
    {
      field: "dueDate",
      headerName: "DUE DATE",
      width: 140,
      type: "date",
      editable: true,
    },
    {
      field: "comments",
      headerName: "ADD COMMENTS",
      width: 180,
      editable: true,
    },
  ];
  const initialList = [
    {
      id: 1,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "Please Enter Document Date",
      plannedQty: "",
      objectType: "",
    },
    {
      id: 2,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "",
      plannedQty: "",
      objectType: "",
    },
    {
      id: 3,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "",
      plannedQty: "",
      objectType: "",
    },
    {
      id: 4,

      docEntry: 0,
      docNum: 0,
      postDate: "",
      warehouse: "",
      itemCode: "",
      itemName: "",
      plannedQty: "",
      objectType: "",
    },
  ];

  const statusColumns = [
    //{ field: "id", headerName: "UID", width: 100 },
    //{ field: "status", headerName: "STATUS", width: 100, cellClassName: "super-app-theme--cell" },
    {
      field: "docNum",
      headerName: "PRD ORDER NO",
      width: 130,
      cellClassName: "super-app-theme--cell",
    },

    {
      field: "postDate",
      headerName: "ORDER DATE",
      width: 120,
      cellClassName: "super-app-theme--cell",
    },

    {
      field: "itemCode",
      headerName: "PRD ITEM CODE",
      width: 160,
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "itemName",
      headerName: "PRODUCTION ITEM NAME",
      width: 300,
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "plannedQty",
      headerName: "PLANNED QTY",
      width: 120,
      cellClassName: "super-app-theme--cell",
    },

    {
      field: "cardCode",
      headerName: "CARD CODE",
      width: 110,
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "warehouse",
      headerName: "FROM WAREHOUSE",
      width: 170,
      cellClassName: "super-app-theme--cell",
    },
    // {
    //   field: "toWarehouse",
    //   headerName: "TO WAREHOUSE",
    //   width: 150,
    //   editable: true,
    // },
    // {
    //   field: "docDate",
    //   headerName: "DOC DATE",
    //   width: 140,
    //   type: "date",
    //   editable: true,
    // },
    // {
    //   field: "dueDate",
    //   headerName: "DUE DATE",
    //   width: 140,
    //   type: "date",
    //   editable: true,
    // },
    // {
    //   field: "comments",
    //   headerName: "ADD COMMENTS",
    //   width: 180,
    //   editable: true,
    // },
  ];
  // const statusInitialList = [
  //   {
  //     id: 1,

  //     docEntry: "",
  //     docNum: "",
  //     postDate: "",
  //     warehouse: "",
  //     itemCode: "",
  //     itemName: "Please Wait For the Status",
  //     plannedQty: "",
  //     objectType: "",
  //   },
  //   {
  //     id: 2,

  //     docEntry: "",
  //     docNum: "",
  //     postDate: "",
  //     warehouse: "",
  //     itemCode: "",
  //     itemName: "",
  //     plannedQty: "",
  //     objectType: "",
  //   },
  //   {
  //     id: 3,

  //     docEntry: "",
  //     docNum: "",
  //     postDate: "",
  //     warehouse: "",
  //     itemCode: "",
  //     itemName: "",
  //     plannedQty: "",
  //     objectType: "",
  //   },
  // ];

  const handleAddITR = () => {
    const DestructureAPI = selectedRows.map((singleObject) => {
      console.log("Destructure object output", singleObject);
      console.log("Destructure object output", singleObject.cardCode);
      console.log("Destructure object output", singleObject.objectType);
      console.log("Destructure object output", singleObject.docEntry);
      console.log("Destructure object output", DestructureAPI);

      var cardCode1 = singleObject.cardCode;
      var docEntry1 = singleObject.docEntry;
      var objectType1 = singleObject.objectType;

      setCardCode(cardCode1);
      setDocEntry(docEntry1);
      setObjectType(objectType1);
    });

    DestructureAPI;
    console.log("Destructure object output1", cardCode);
    console.log("Destructure object output1", docEntry);
    console.log("Destructure object output1", objectType);

    const SelectedADDITRData = {
      cardCode,
      docEntry,
      objectType,
    };
    axios
      .post("http://localhost:9003/api/ITRDrafts", SelectedADDITRData)
      .then(function (response) {
        const AddITRStatus = response.data.body.code;
        console.log("Result", AddITRStatus);
        if (AddITRStatus === "200") {
          alert("Added your ITR Successfully");
          setStatusList(selectedRows);
        } else {
          alert("Please Add your ITR Once Again");
        }
        // const newList = newData;
        //setList(newList);
        // console.log("setlist", newData);
      })
      .catch(function (error) {
        console.log("Inside Catch ADD ITR Block", error);
        alert("Your ITR not Added. Server Error 500");
      });
  };

  useLayoutEffect(() => {
    const DestructureAPI = selectedRows.map((singleObject) => {
      console.log("Destructure object output", singleObject);
      console.log("Destructure object output", singleObject.cardCode);
      console.log("Destructure object output", singleObject.objectType);
      console.log("Destructure object output", singleObject.docEntry);
      //console.log("Destructure object output", DestructureAPI);

      var cardCode1 = singleObject.cardCode;
      var docEntry1 = singleObject.docEntry;
      var objectType1 = singleObject.objectType;

      setCardCode(cardCode1);
      setDocEntry(docEntry1);
      setObjectType(objectType1);
    });
    DestructureAPI;

    console.log("Destructure object output1", cardCode);
    console.log("Destructure object output1", docEntry);
    console.log("Destructure object output1", objectType);
  }, [selectedRows]);

  const handleApplyProdFilter = (e) => {
    console.log("from date", fromDateOne);
    console.log("to date", toDateTwo);
    console.log("status", OSid);
    console.log("warehouse", whsid);
    console.log("series", seriesid);
    console.log("docNum", docNum);

    e.preventDefault();

    const status = OSid;
    const warehouse = whsid;
    const series = seriesid;

    setFromDateOneError(false);
    setToDateTwoError(false);

    //code for Error Field
    if (fromDateOne === "") {
      setFromDateOneError(true);
      //alert("Please Enter From Document Date & To Document Date, Both Fields are Mandatory");
      // <SoftAlert>
      //   Please Enter From Document Date & To Document Date, Both Fields are Mandatory
      // </SoftAlert>;
    }
    if (toDateTwo === "") {
      setToDateTwoError(true);
      // <SoftAlert color="dark" dismissible>
      //   Please Enter From Document Date & To Document Date, Both Fields are Mandatory
      // </SoftAlert>;
      //alert("From Document Date is Empty");
    }

    // if (fromDateOne === "" || toDateTwo === "") {
    //   alert("Please Enter From Document Date & To Document Date");
    // }

    const postData = {
      fromDateOne,
      toDateTwo,
      status,
      warehouse,
      series,
      docNum,
    };

    axios
      .post("http://localhost:9003/api/ProductionOrderFilters", postData)
      // .get("http://localhost:9003/api/ProductionOrderFilters")
      .then(function (response) {
        const newData = response.data.body;

        console.log("response.data : ", response.data);
        console.log("Initial List : ", initialList);
        console.log("response.data.body : ", response.data.body);

        console.log("response.data.body[0] : ", response.data.body[0]);
        console.log("Master Data POlines : ", response.data.body[0].poLines);

        const newList = newData;
        setList(newList);
        console.log("setlist", newList);

        //console.log("first API list destructure array", data.body[0]); //showing the data
        // console.log("docEntry", data[0].warehouse); //showing the data
        // console.log("docEntry", data[1].docEntry); //showing the data
        // console.log("docEntry", data[2].docEntry); //showing the data
        // console.log("docEntry", data[3].docEntry); //showing the data

        //const arrayItem = [newdata[0]];

        // console.log("Square Bracket", [arrayItem]);

        // console.log("Curly Bracket", { arrayItem });
        // console.log("Curly, Square Brackets", [{ arrayItem }]);
        // console.log("initialList", initialList);
        // console.log("dataAPIList", data);

        //setList(newList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block", error);
      });
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal1 = () => {
    setModal1(!modal1);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (modal1) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (modal2) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <SoftTypography
          mb={4}
          mt={1}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "27px",
            lineHeight: "30px",
            letterSpacing: 1,
          }}
        >
          PRODUCTION ORDER LIST
        </SoftTypography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} xl={4}></Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <Card>
              <SoftBox mb={4} textAlign="left">
                <SoftBox mt={3} ml={2} pt={1} pb={1} px={1}>
                  <SoftTypography
                    ml={4.5}
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    // style={{
                    //   color: "#0B2F8A",
                    // }}
                  >
                    SELECT FROM DOCUMENT DATE
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <Tooltip title="Mandatory Fill">
                      <SoftInput
                        type="date"
                        onChange={(e) => setFromDateOne(e.target.value)}
                        value={fromDateOne}
                        error={fromDateOneError}
                        icon={{
                          component: "error",
                          color: "#FF0000",
                          direction: "right",
                        }}
                      />
                    </Tooltip>
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-2} pb={3} px={1}>
                  <SoftTypography
                    ml={4.5}
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    // style={{
                    //   color: "#0B2F8A",
                    // }}
                  >
                    SELECT TO DOCUMENT DATE
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <Tooltip title="Mandatory Fill">
                      <SoftInput
                        type="date"
                        onChange={(e) => setToDateTwo(e.target.value)}
                        value={toDateTwo}
                        error={toDateTwoError}
                        icon={{
                          component: "error",
                          color: "#FF0000",
                          direction: "right",
                        }}
                      />
                    </Tooltip>
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-4} pb={3} px={1} onClick={toggleModal2}>
                  <SoftTypography ml={4.5} component="label" variant="caption" fontWeight="bold">
                    SELECT ORDER STATUS
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <SoftInput
                      type="text"
                      placeholder="Enter Order Status..."
                      onChange={() => setOSid(OSResultId)}
                      value={OSid}
                      icon={{
                        component: "false",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-4} pb={3} px={1}>
                  <SoftTypography ml={4.5} component="label" variant="caption" fontWeight="bold">
                    ENTER DOCUMENT NUMBER
                  </SoftTypography>
                  <SoftBox pb={3} px={4}>
                    <SoftInput
                      type="number"
                      placeholder="Document Number"
                      // maxlength="5"

                      onChange={handleNameChange}
                      value={docNum}
                      icon={{
                        component: "false",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>

                <SoftBox ml={2} mt={-4} pb={3} px={5} onClick={toggleModal1}>
                  <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                    SELECT WAREHOUSE
                  </SoftTypography>
                  <SoftBox pt={1} pb={3}>
                    <SoftInput
                      type="text"
                      placeholder="Enter Warehouse..."
                      onChange={() => setWhsid(whsResultId)}
                      value={whsid}
                      icon={{
                        component: "search",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>
                <SoftBox ml={2} mt={-4} pb={-2} px={5} onClick={toggleModal}>
                  <SoftTypography ml={1} component="label" variant="caption" fontWeight="bold">
                    SELECT SERIES
                  </SoftTypography>
                  <SoftBox pt={1} pb={2}>
                    <SoftInput
                      onChange={() => setSeriesid(seriesResultId)}
                      value={seriesid}
                      //onChange={handleSeriesSentValue}
                      //onClick={toggleModal}
                      placeholder="Enter Series..."
                      icon={{
                        component: "search",
                        direction: "right",
                      }}
                    />
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} xl={4}></Grid>
        </Grid>

        <SoftBox container spacing={1} mt={4}>
          <SoftButton
            onClick={handleApplyProdFilter}
            variant="contained"
            color="info"
            style={{
              backgroundColor: "#0B2F8A",
              boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
            }}
          >
            Apply Filter
          </SoftButton>
        </SoftBox>

        <SoftBox mt={6}>
          <SoftTypography
            mb={3}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "30px",
              letterSpacing: 1,
            }}
          >
            YOUR PRODUCTION ORDER LIST
          </SoftTypography>
        </SoftBox>
        <Card>
          <SoftBox ml={5} mt={5} style={{ marginRight: "50px", height: "400px" }}>
            <DataGrid
              experimentalFeatures={{ newEditingApi: true }}
              columns={columns}
              rows={list}
              editMode="row"
              disableColumnSelector
              disableSelectionOnClick
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = list.filter((row) => selectedIDs.has(row.id));
                setSelectedRows(selectedRows);
                console.log(selectedRows);
              }}
              options={{ selection: true }}
              getRowId={(row) => row.id} //mandatory
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{ color: "#0B2F8A" }}
            />
          </SoftBox>
        </Card>

        <SoftBox style={{ display: "flex" }} mt={4}>
          <SoftBox>
            <SoftButton
              onClick={handleAddITR}
              //onClick={() => setCheckboxSelection(!checkboxSelection)}
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                marginLeft: "100px",
              }}
            >
              Add ITR
            </SoftButton>
            <SoftButton
              component={Link}
              to="/dashboard"
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                marginLeft: "30px",
              }}
            >
              Cancel ITR
            </SoftButton>
          </SoftBox>
        </SoftBox>

        <SoftBox mt={6}>
          <SoftTypography
            mb={3}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "30px",
              letterSpacing: 1,
            }}
          >
            STATUS OF YOUR PRODUCTION ORDER LIST
          </SoftTypography>
        </SoftBox>
        <Card>
          <Box
            sx={{
              height: "490px",
              width: "100%",
              "& .super-app-theme--cell": {
                backgroundColor: "#61b33b",
                color: "black",
                fontWeight: "600",
              },
            }}
          >
            <SoftBox
              ml={5}
              mt={5}
              style={{
                marginRight: "50px",
                height: "400px",
              }}
            >
              <DataGrid
                experimentalFeatures={{ newEditingApi: true }}
                columns={statusColumns}
                rows={statusList}
                editMode="row"
                disableColumnSelector
                //checkboxSelection
                onSelectionModelChange={(itm) => console.log("itm", itm)}
                onSelectChange={(list) => console.log("newlist", list)}
                options={{ selection: true }}
                getRowId={(row) => row.id} //mandatory
                pageSize={4}
                rowsPerPageOptions={[4]}
                sx={{ color: "#0B2F8A" }}
              />
            </SoftBox>
          </Box>
        </Card>

        <Box sx={{ width: "100%", height: 400 }}>
          <DataGridPro
            columns={columnsnewPro}
            rows={rowsnewPro}
            //rowThreshold={0}
            checkboxSelection
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={getDetailPanelContent}
            sx={{ color: "#ffffff", backgroundColor: "#808080" }}
            //sx={{ color: "#000000", backgroundColor: "#ffffff" }}
          />
        </Box>

        <SoftBox style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h4 style={{ color: "#0B2F8A", marginTop: "100px" }}>
                  Please Select Series Filter
                </h4>

                <Grid container spacing={-110}>
                  <Grid item xs={12} sm={6} xl={4}></Grid>

                  <Grid item xs={12} sm={6} xl={4}>
                    <SoftBox mt={5} mb={5.5} px={5}>
                      <DataGrid
                        experimentalFeatures={{ newEditingApi: true }}
                        rows={seriesAPIList}
                        columns={seriesColumns}
                        pageSize={4}
                        options={{ selection: true }}
                        rowsPerPageOptions={[4]}
                        getRowId={(row) => row.id}
                        checkboxSelection={false}
                        disableMultipleSelection
                        disableColumnSelector
                        onSelectionModelChange={(ids) => {
                          onRowsSeriesHandler(ids);
                        }}
                        sx={{ color: "#0B2F8A" }}
                        style={{ height: "339px", width: "300px", margin: "auto" }}
                      />
                    </SoftBox>
                  </Grid>
                </Grid>

                <button
                  className="close-modal"
                  onClick={toggleModal}
                  style={{
                    backgroundColor: "#0B2F8A",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "30px",
                    marginBottom: "20px",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                  }}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}
        </SoftBox>
        <SoftBox style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
          {modal1 && (
            <div className="modal">
              <div onClick={toggleModal1} className="overlay"></div>
              <div className="modal-content">
                <h4 style={{ color: "#0B2F8A", marginTop: "100px" }}>
                  Please Select Warehouse Filter
                </h4>

                <Grid container spacing={-110}>
                  <Grid item xs={12} sm={6} xl={4}></Grid>

                  <Grid item xs={12} sm={6} xl={4}>
                    <SoftBox mt={5} mb={5.5} px={5}>
                      <DataGrid
                        experimentalFeatures={{ newEditingApi: true }}
                        rows={whsAPIList}
                        columns={whsColumns}
                        pageSize={4}
                        options={{ selection: true }}
                        rowsPerPageOptions={[4]}
                        getRowId={(row) => row.id}
                        checkboxSelection={false}
                        disableMultipleSelection
                        disableColumnSelector
                        onSelectionModelChange={(idsW) => {
                          onRowsWhsHandler(idsW);
                        }}
                        sx={{ color: "#0B2F8A" }}
                        style={{ height: "332px", width: "390px", margin: "auto" }}
                      />
                    </SoftBox>
                  </Grid>
                </Grid>

                <button
                  className="close-modal"
                  onClick={toggleModal1}
                  style={{
                    backgroundColor: "#0B2F8A",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "30px",
                    marginBottom: "20px",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                  }}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}
        </SoftBox>
        <SoftBox style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
          {modal2 && (
            <div className="modal">
              <div onClick={toggleModal2} className="overlay"></div>
              <div className="modal-content">
                <h4 style={{ color: "#0B2F8A", marginTop: "100px" }}>Please Select Order Status</h4>

                <Grid container spacing={-110}>
                  <Grid item xs={12} sm={6} xl={4}></Grid>

                  <Grid item xs={12} sm={6} xl={4}>
                    <SoftBox mt={5} mb={5.5} px={5}>
                      <DataGrid
                        experimentalFeatures={{ newEditingApi: true }}
                        rows={orderStatusRows}
                        columns={orderStatusColumns}
                        pageSize={4}
                        options={{ selection: true }}
                        rowsPerPageOptions={[4]}
                        getRowId={(row) => row.id}
                        checkboxSelection={false}
                        disableMultipleSelection
                        disableColumnSelector
                        onSelectionModelChange={(idsOS) => {
                          onOrderStatusHandler(idsOS);
                        }}
                        sx={{ color: "#0B2F8A" }}
                        style={{ height: "332px", width: "300px", margin: "auto" }}
                      />
                    </SoftBox>
                  </Grid>
                </Grid>

                <button
                  className="close-modal"
                  onClick={toggleModal2}
                  style={{
                    backgroundColor: "#0B2F8A",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "30px",
                    marginBottom: "20px",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                  }}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ProductionOrderList;
