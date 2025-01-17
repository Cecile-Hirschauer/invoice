"use client";
import { Invoice } from "@/types";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti";
import { Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { createEmptyInvoice, getInvoicesByEmail } from "./actions";
import InvoiceComponent from "./components/InvoiceComponent";
import Wrapper from "./components/Wrapper";

export default function Home() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [invoiceName, setInvoiceName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoicesByEmail(email);
      if (data) {
        setInvoices(data);
      }
    } catch (error) {
      console.error(`Erreur lors du chargement des factures: ${error}`);
    }
  };

  useEffect(() => {
    setIsValidName(invoiceName.length <= 60);
  }, [invoiceName]);

  useEffect(() => {
    fetchInvoices();
  }, [email]);

  const handleCreateInvoice = async () => {
    try {
      if (email) {
        await createEmptyInvoice(email, invoiceName);
      }
      fetchInvoices();
      setInvoiceName("");

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 999,
      });
    } catch (error) {
      console.error(`Erreur lors de la création de la facture: ${error}`);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col space-y-4">
        <h1 className="font-bold text-lg">Mes factures</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="cursor-pointer border border-accent flex flex-col justify-center items-center rounded-xl p-5"
            onClick={() =>
              (
                document.getElementById("my_modal_3") as HTMLDialogElement
              ).showModal()
            }
          >
            <p className="text-accent font-bold">Créer une facture</p>
            <div className="bg-accent-content text-accent rounded-full p-2 mt-2">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          {invoices.length > 0 &&
            invoices.map((invoice, index) => (
              <div key={index}>
                <InvoiceComponent invoice={invoice} index={index} />
              </div>
            ))}
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Nouvelle facture</h3>
            <input
              type="text"
              className="input input-bordered w-full my-4"
              placeholder="Nom de la facture (max 60 caractères)."
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
            />
            {!isValidName && (
              <p className="text-sm mb-4 text-error">
                Le nom ne peut pas dépassser 60 caractères.
              </p>
            )}
            <button
              disabled={!isValidName || invoiceName.length === 0}
              className="btn btn-accent"
              onClick={handleCreateInvoice}
            >
              Créer
            </button>
          </div>
        </dialog>
      </div>
    </Wrapper>
  );
}
