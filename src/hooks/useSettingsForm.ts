// src/hooks/useSettingsForm.ts
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useUpdateSettings } from "./useUpdateSettings";
import { useSettings } from "./useSettings";

export const useSettingsForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSettings(id!);
  const mutation = useUpdateSettings();
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      deliveryMethods: data?.deliveryMethods || [],
      fulfillmentFormat: data?.fulfillmentFormat || {
        rfid: false,
        print: false,
      },
      printer: data?.printer || { id: null },
      printingFormat: data?.printingFormat || {
        formatA: false,
        formatB: false,
      },
      scanning: data?.scanning || {
        scanManually: false,
        scanWhenComplete: false,
      },
      paymentMethods: data?.paymentMethods || {
        cash: false,
        creditCard: false,
        comp: false,
      },
      ticketDisplay: data?.ticketDisplay || {
        leftInAllotment: false,
        soldOut: false,
      },
      customerInfo: data?.customerInfo || {
        active: false,
        basicInfo: false,
        addressInfo: false,
      },
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      mutation.mutate(
        { id: id!, settings: values },
        {
          onSuccess: () => {
            setSuccessMessage("Settings updated successfully!");
          },
          onError: () => {
            setSuccessMessage("");
          },
        }
      );
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return { formik, isLoading, error, successMessage, mutation };
};
