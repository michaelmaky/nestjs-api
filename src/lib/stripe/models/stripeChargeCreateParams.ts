export class StripeChargeCreateParams {
  /**
   * Amount intended to be collected by this payment.
   * A positive integer representing how much to charge
   * in the smallest currency unit
   * (https://stripe.com/docs/currencies#zero-decimal)
   * (e.g.
   *   100 cents to charge $1.00
   *    or 100 to charge ¥100, a zero-decimal currency).
   *
   * The minimum amount is $0.50 US or [equivalent in charge currency]
   * (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts).
   * The amount value supports up to eight digits
   * (e.g., a value of 99999999 for a USD charge of $999,999.99).
   */
  amount: number;

  /**
   * Whether to immediately capture the charge.
   * Defaults to `true`. When `false`, the charge issues an authorization,
   * and will need to be
   *    [captured](https://stripe.com/docs/api#capture_charge) later.
   * Uncaptured charges expire in _seven days_.
   * For more information, see the
   *    [authorizing charges and settling later] documentation.
   */
  capture: boolean;

  /**
   * Three-letter [ISO currency code], in lowercase.
   * Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * The ID of an existing customer that will be charged in this request.
   */
  customer?: string;

  /**
   * A payment source to be charged.
   * This can be the ID of a [card](https://stripe.com/docs/api#cards),
   * a [bank account](https://stripe.com/docs/api#bank_accounts),
   * a [source](https://stripe.com/docs/api#sources),
   * a [token](https://stripe.com/docs/api#tokens),
   *
   * For certain sources---namely,
   * [cards](https://stripe.com/docs/api#cards),
   * [bank accounts](https://stripe.com/docs/api#bank_accounts),
   * and attached [sources](https://stripe.com/docs/api#sources)
   * ---you must also pass the ID of the associated customer.
   */
  source: string;

  /**
   * An arbitrary string which you can attach to a `Charge` object.
   * It is displayed when in the web interface alongside the charge.
   * Note that if you use Stripe to send automatic email receipts to your customers,
   * your receipt emails will include the `description` of the charge(s) that they are describing.
   */
  description?: string;
}
