"use server";

import { randomBytes } from "node:crypto";
import prisma from "./lib/prisma";

export async function checkAndAddUser(email: string, name: string) {
  if (!email) {
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser && name) {
      await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

const generateUniqueId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = randomBytes(3).toString("hex");
    const existingInvoice = await prisma.invoice.findUnique({
      where: {
        id: uniqueId,
      },
    });
    if (!existingInvoice) {
      isUnique = true;
    }
  }
  return uniqueId;
};

export async function createEmptyInvoice(email: string, name: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const invoiceId = (await generateUniqueId()) as string;

    if (user) {
      const newInvoice = await prisma.invoice.create({
        data: {
          id: invoiceId,
          name: name,
          userId: user?.id,
          issuerName: "",
          issuerAddress: "",
          clientName: "",
          clientAddress: "",
          invoiceDate: "",
          dueDate: "",
          vatActive: false,
          vatRate: 20,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}
