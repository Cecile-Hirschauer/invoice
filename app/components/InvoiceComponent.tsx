import { Invoice } from "@/types";
import {
  CheckCircle,
  Clock,
  FileQuestion,
  FileText,
  LucideSquareArrowOutUpRight,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import Link from "next/link";

type InvoiceComponentProps = {
  invoice: Invoice;
  index: number;
};

const getStatusBadges = (status: number) => {
  switch (status) {
    case 1:
      return (
        <div className="flex badge badge-xl gap-2 items-center">
          <FileText className="w-4 h-4" />
          Brouillon
        </div>
      );
    case 2:
      return (
        <div className="flex badge badge-warning badge-xl gap-2 items-center">
          <Clock className="w-4 h-4" />
          En attente
        </div>
      );
    case 3:
      return (
        <div className="flex badge badge-success badge-xl gap-2 items-center">
          <CheckCircle className="w-4 h-4" />
          Payée
        </div>
      );
    case 4:
      return (
        <div className="flex badge badge-info badge-xl gap-2 items-center">
          <XCircle className="w-4 h-4" />
          Annulée
        </div>
      );
    case 5:
      return (
        <div className="flex badge badge-error badge-xl gap-2 items-center">
          <TriangleAlert className="w-4 h-4" />
          Impayée
        </div>
      );
    default:
      return (
        <div className="flex badge badge-xl gap-2 items-center">
          <FileQuestion className="w-4 h-4" />
          Indéfini
        </div>
      );
  }
};

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({
  invoice,
  index,
}) => {
  const calculateTotal = () => {
    const totalExcludingVAT = invoice?.lines?.reduce((acc, line) => {
      const quantity = line.quantity ?? 0;
      const unitPrice = line.unitPrice ?? 0;
      return acc + quantity * unitPrice;
    }, 0);

    const VAT = totalExcludingVAT * (invoice.vatRate / 100);

    return totalExcludingVAT + VAT;
  };

  return (
    <div key={index} className="bg-base-200/90 space-y-2 p-5 rounded-xl shadow">
      <div className="flex justify-between items-center w-full">
        <div>{getStatusBadges(invoice.status)}</div>
        <Link className="btn btn-sm btn-accent" href={`/invoice/${invoice.id}`}>
          Détails
          <LucideSquareArrowOutUpRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-full">
        <div>
          <div className="stat-title">
            <div className="uppercase text-sm">Fact-{invoice.id}</div>
          </div>
        </div>
        <div>
          <div className="stat-value">{calculateTotal().toFixed(2)} € </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
