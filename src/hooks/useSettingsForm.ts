// src/hooks/useSettings.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import {
  clearSuccessMessage,
  fetchSettings,
  selectError,
  selectLoading,
  selectSettings,
  selectSuccessMessage,
  updateSettings,
} from "../slices/settingsSlice";

export const useSettingsForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const settings = useSelector(selectSettings);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    if (id) {
      dispatch(fetchSettings(id));
    }
  }, [id, dispatch]);

  const formik = useFormik({
    initialValues: {
      deliveryMethods: settings?.deliveryMethods || [],
      fulfillmentFormat: settings?.fulfillmentFormat || {
        rfid: false,
        print: false,
      },
      printer: settings?.printer || { id: null },
      printingFormat: settings?.printingFormat || {
        formatA: false,
        formatB: false,
      },
      scanning: settings?.scanning || {
        scanManually: false,
        scanWhenComplete: false,
      },
      paymentMethods: settings?.paymentMethods || {
        cash: false,
        creditCard: false,
        comp: false,
      },
      ticketDisplay: settings?.ticketDisplay || {
        leftInAllotment: false,
        soldOut: false,
      },
      customerInfo: settings?.customerInfo || {
        active: false,
        basicInfo: false,
        addressInfo: false,
      },
    },
    onSubmit: (values) => {
      console.log("values :>> ", values);
      if (id) {
        dispatch(updateSettings({ id, settings: values }));
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  return {
    formik,
    loading,
    error,
    successMessage,
  };
};
