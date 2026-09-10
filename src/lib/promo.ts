// Site-wide promo highlight for the active Shopify discount code.
// Set `active: false` to hide every promo badge/notice at once.
// Keep `code` and `pct` in sync with the discount configured in the Shopify admin.
export const PROMO = {
  active: true,
  code: 'AUREA10',
  pct: 10,
} as const;

export const promoBadgeLabel = `${PROMO.pct}% OFF`;

export const promoNote = `Get ${PROMO.pct}% off your first order — use code ${PROMO.code} at checkout.`;

export const promoBarMessage = `${PROMO.pct}% off your first order · Code ${PROMO.code}`;

// Sitewide sale. The displayed discount MUST match a Shopify AUTOMATIC discount
// of the same percentage (no code, applies at checkout) so customers pay
// exactly what they see. Set active:false to end the sale everywhere at once.
export const SALE = {
  active: true,
  pct: 15,
} as const;
