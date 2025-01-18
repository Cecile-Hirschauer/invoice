import { Invoice } from "@/types";
import React from "react";

type InvoiceInfoProps = {
  invoice: Invoice | null;
  setInvoice: (invoice: Invoice) => void;
};

const InvoiceInfo: React.FC<InvoiceInfoProps> = ({ invoice, setInvoice }) => {
  return <div></div>;
};

export default InvoiceInfo;
