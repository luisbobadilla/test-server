/**
 * InvoiceController
 *
 * @description :: Server-side logic for managing invoices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create(req, res) {
    const product = req.product;
    const quantity = parseInt(req.param('quantity') || 0, 10);
    const client = req.client;

    return Invoice
      .create({
        client: client.id
      })
      .then((invoice) => {
        return InvoiceProduct.create({
          product: product.id,
          invoice: invoice.id,
          price: quantity * product.price,
          quantity,
        });
      })
      .then(res.created)
      .catch(res.negotiate);
  },

};

