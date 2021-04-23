import _Stripe from 'stripe';

import { StripeChargeCreateParams } from './models';

export class Stripe {
  private _stripe: _Stripe;

  /**
   * private constructor
   * only accessable through getInstance()
   * to implement singleton pattern
   */
  constructor(key) {
    this._stripe = new _Stripe(key || '', {
      apiVersion: '2020-08-27',
    });
  }

  /**
   * add new customer with his/her email addr
   *
   * @param email customer's email address
   */
  public async addCustomer(email: string) {
    return this._stripe.customers.create({ email });
  }

  /**
   * add new card to customer
   *
   * @param customerId customer id
   * @param sourceId new source id (card that registered to stripe)
   * @param isDefault is default payment method
   */
  public async addCustomerSource(
    customerId: string,
    sourceId: string,
    isDefault = false,
  ) {
    const newSource = await this._stripe.customers.createSource(customerId, {
      source: sourceId,
    });

    // update to default if isDefault = true
    if (isDefault) {
      await this.updateCustomerDefaultSource(customerId, sourceId);
    }

    return newSource;
  }

  /**
   * update customer's default payment method (e.g. different credit card)
   *
   * @param customerId customer stripe id
   * @param sourceId source (e.g. credit card) id in stripe
   */
  public async updateCustomerDefaultSource(
    customerId: string,
    sourceId: string,
  ) {
    return this._stripe.customers.update(customerId, {
      default_source: sourceId,
    });
  }

  /**
   * create charge for customer
   *
   * @param charge charge model
   */
  public async createCharge(
    charge: StripeChargeCreateParams,
    convertChargeAmount = true,
  ) {
    if (convertChargeAmount)
      charge.amount = this.convertChargeAmount(charge.amount);
    return this._stripe.charges.create(charge);
  }

  /**
   * convert charge amount to stripe format (* 100 and no decimal place)
   *
   * @param charge original charge amount
   */
  public convertChargeAmount(charge: number) {
    return Math.floor(charge * 100);
  }
}
