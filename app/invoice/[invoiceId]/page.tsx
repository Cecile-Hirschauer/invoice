"use client";
import { getInvoiceById } from "@/app/actions";
import InvoiceInfo from "@/app/components/InvoiceInfo";
import Wrapper from "@/app/components/Wrapper";
import { Invoice } from "@/types";
import { Save, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const InvoicePage = ({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [initialInvoice, setInitialInvoice] = useState<Invoice | null>(null);

  const fetchInvoice = async () => {
    try {
      const { invoiceId } = await params;
      const fetchedInvoice = await getInvoiceById(invoiceId);

      if (fetchedInvoice) {
        setInvoice(fetchedInvoice);
        setInitialInvoice(fetchedInvoice);
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération de la facture: ${error}`);
    }
  };

  useEffect(() => {
    fetchInvoice();
  });
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <p className="badge badge-ghost badge-lg uppercase">
          <span>Facture-</span> {invoice?.id}
        </p>
        <div className="flex mt-4 md:mt-0">
          <select
            value={invoice?.status}
            className="select select-sm select-bordered w-full"
          >
            <option value={1}>Brouillon</option>
            <option value={2}>En attente</option>
            <option value={3}>Payée</option>
            <option value={4}>Annulée</option>
            <option value={5}>Impayée</option>
          </select>
          <button className="btn btn-sm ml-4 btn-accent">
            Sauvegarder
            <Save className="w-4 h-4 ml-2" />
          </button>
          <button className="btn btn-sm ml-4 btn-accent">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div>
        <div className="flex w-full md:w-1/3 flex-col">
          <div>
            <InvoiceInfo invoice={invoice} setInvoice={setInvoice} />
          </div>
        </div>
        <div className="flex w-full md:w-2/3 flex-col"></div>
      </div>
    </Wrapper>
  );
};

export default InvoicePage;
