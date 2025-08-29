"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const clearCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
  });

  if (cart) {
    await db.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
    await db.delete(cartTable).where(eq(cartTable.id, cart.id));
  }
};
