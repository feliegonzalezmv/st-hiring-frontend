// src/components/SettingsForm.tsx
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
  const { formik, isLoading, error, successMessage, mutation } =
    useSettingsForm();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

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
      <form onSubmit={formik.handleSubmit}>
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
        {Object.keys(formik.values.ticketDisplay).map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                name={`ticketDisplay.${option}`}
                checked={formik.values.ticketDisplay[option]}
                onChange={formik.handleChange}
              />
            }
            label={option.charAt(0).toUpperCase() + option.slice(1)}
          />
        ))}

        <Typography variant="h6" gutterBottom>
          Customer Info
        </Typography>
        {Object.keys(formik.values.customerInfo).map((info) => (
          <FormControlLabel
            key={info}
            control={
              <Checkbox
                name={`customerInfo.${info}`}
                checked={formik.values.customerInfo[info]}
                onChange={formik.handleChange}
              />
            }
            label={info.charAt(0).toUpperCase() + info.slice(1)}
          />
        ))}

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default SettingsForm;
