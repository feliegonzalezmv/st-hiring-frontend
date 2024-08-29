import React from "react";
import {
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Alert,
} from "@mui/material";
import { useSettingsForm } from "../hooks/useSettingsForm";

const SettingsForm: React.FC = () => {
  const { formik, loading, error, successMessage } = useSettingsForm();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box padding={2} maxWidth="800px" margin="auto">
      <Typography variant="h4" component="h1" gutterBottom>
        Update Settings
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Typography variant="h6" gutterBottom>
          Delivery Methods
        </Typography>
        <Grid container spacing={2}>
          {formik.values.deliveryMethods.map((method, index) => (
            <Grid item xs={6} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`deliveryMethods.${index}.selected`}
                    checked={method.selected}
                    onChange={formik.handleChange}
                  />
                }
                label={method.name}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>
          Fulfillment Format
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="fulfillmentFormat.rfid"
              checked={formik.values.fulfillmentFormat.rfid}
              onChange={formik.handleChange}
            />
          }
          label="RFID"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="fulfillmentFormat.print"
              checked={formik.values.fulfillmentFormat.print}
              onChange={formik.handleChange}
            />
          }
          label="Print"
        />

        <Typography variant="h6" gutterBottom>
          Printing Format
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="printingFormat.formatA"
              checked={formik.values.printingFormat.formatA}
              onChange={formik.handleChange}
            />
          }
          label="Format A"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="printingFormat.formatB"
              checked={formik.values.printingFormat.formatB}
              onChange={formik.handleChange}
            />
          }
          label="Format B"
        />

        <Typography variant="h6" gutterBottom>
          Scanning
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="scanning.scanManually"
              checked={formik.values.scanning.scanManually}
              onChange={formik.handleChange}
            />
          }
          label="Scan Manually"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="scanning.scanWhenComplete"
              checked={formik.values.scanning.scanWhenComplete}
              onChange={formik.handleChange}
            />
          }
          label="Scan When Complete"
        />

        <Typography variant="h6" gutterBottom>
          Payment Methods
        </Typography>
        {Object.keys(formik.values.paymentMethods).map((method) => (
          <FormControlLabel
            key={method}
            control={
              <Checkbox
                name={`paymentMethods.${method}`}
                checked={formik.values.paymentMethods[method]}
                onChange={formik.handleChange}
              />
            }
            label={method.charAt(0).toUpperCase() + method.slice(1)}
          />
        ))}

        <Typography variant="h6" gutterBottom>
          Ticket Display
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="ticketDisplay.leftInAllotment"
              checked={formik.values.ticketDisplay.leftInAllotment}
              onChange={formik.handleChange}
            />
          }
          label="Left in Allotment"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="ticketDisplay.soldOut"
              checked={formik.values.ticketDisplay.soldOut}
              onChange={formik.handleChange}
            />
          }
          label="Sold Out"
        />

        <Typography variant="h6" gutterBottom>
          Customer Info
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              name="customerInfo.active"
              checked={formik.values.customerInfo.active}
              onChange={formik.handleChange}
            />
          }
          label="Active"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="customerInfo.basicInfo"
              checked={formik.values.customerInfo.basicInfo}
              onChange={formik.handleChange}
            />
          }
          label="Basic Info"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="customerInfo.addressInfo"
              checked={formik.values.customerInfo.addressInfo}
              onChange={formik.handleChange}
            />
          }
          label="Address Info"
        />

        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SettingsForm;
