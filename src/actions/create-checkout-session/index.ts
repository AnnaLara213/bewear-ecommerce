"use server";

import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import {
  cartItemTable,
  cartTable,
  orderItemTable,
  orderTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export const createCheckoutSession = async (
  data: CreateCheckoutSessionSchema,
) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set");
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const { orderId } = createCheckoutSessionSchema.parse(data);

  // Validate that the order exists and belongs to the user
  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });

  // Additional validation: ensure cart still exists and hasn't been modified
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: true,
        },
      },
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  // Validate that cart exists and has items
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty or has been cleared");
  }

  // Validate that order total matches cart total
  const cartTotal = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (cartTotal !== order.totalPriceInCents) {
    throw new Error("Order total does not match cart total");
  }

  // Additional validation: check if cart items still exist and haven't been modified
  const cartItemIds = cart.items.map((item) => item.id);
  const existingCartItems = await db
    .select()
    .from(cartItemTable)
    .where(inArray(cartItemTable.id, cartItemIds));

  if (existingCartItems.length !== cart.items.length) {
    throw new Error("Some cart items have been removed or modified");
  }
  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: { with: { product: true } },
    },
  });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
            description: orderItem.productVariant.product.description,
            images: [orderItem.productVariant.imageUrl],
          },
          // Em centavos
          unit_amount: orderItem.priceInCents,
        },
        quantity: orderItem.quantity,
      };
    }),
  });
  return {
    id: checkoutSession.id,
    url: checkoutSession.url,
  };
};
