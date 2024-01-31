const { pool } = require("./index");

const getOrders = (request, response) => {
  pool.query(
    `SELECT * FROM "order" ORDER BY order_id ASC`,
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to get orders" });
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const getOrderById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT * FROM "order" WHERE order_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to get order" });
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createOrder = async (request, response) => {
  const { order_date, status, tracking_number, user_id, checkout_id } =
    request.body;
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = `INSERT INTO "order" (order_date, status, tracking_number) VALUES ($1,$2,$3) RETURNING order_id`;
    const res = await client.query(queryText, [
      order_date,
      status,
      tracking_number,
    ]);
    console.log(res.rows);

    const insertIntoUserOrder = `INSERT INTO User_Order (user_id, order_id) VALUES ($1, $2)`;
    await client.query(insertIntoUserOrder, [user_id, res.rows[0].order_id]);
    const insertIntoCheckoutOrder = `INSERT INTO checkout_order (checkout_id, order_id) VALUES ($1, $2)`;
    await client.query(insertIntoCheckoutOrder, [
      checkout_id,
      res.rows[0].order_id,
    ]);
    await client.query("COMMIT");
    response.status(201).send(`Order added`);
  } catch (e) {
    await client.query("ROLLBACK");
    response.status(500).json({ msg: "Failed to add order" });
    throw e;
  } finally {
    client.release();
  }
};

const updateOrder = (request, response) => {
  // TODO: CHANGE A SINGLE FIELD
  const id = parseInt(request.params.id);
  const { order_date, status, tracking_number } = request.body;

  pool.query(
    `UPDATE "order" SET order_date = $1, status = $2, tracking_number = $3 WHERE order_id = $4`,
    [order_date, status, tracking_number, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to update order" });
        throw error;
      }
      response.status(200).send(`Order modified with ID : ${id}`);
    }
  );
};
const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM "order" WHERE order_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        response.status(500).json({ msg: "Failed to delete order" });
        throw error;
      }
      response.status(200).send(`Order deleted with ID : ${id}`);
    }
  );
};

const orderItems = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const statement = `SELECT p.name, SUM(ci.quantity) AS total_quantity, price,image_url, SUM(ci.quantity * price) AS total FROM "order" o
    JOIN checkout_order co ON o.order_id = co.order_id
    JOIN checkout_cart cc ON co.checkout_id = cc.checkout_id
    JOIN cart_cartitem cci on cc.cart_id = cci.cart_id
    JOIN cart_item ci on cci.cart_item_id = ci.cart_item_id
    JOIN product_cartitem pci on cci.cart_item_id = pci.cart_item_id
    JOIN product p on pci.product_id = p.product_id
    WHERE o.order_id=$1
    GROUP BY p.name, p.price, p.image_url`;

    const values = [id];
    await pool.query(statement, values, (error, results) => {
      console.log(`Fetched Order Items`);
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error(`Fetching Order Items Failed`);
    console.error(`${error}`);
    response.status(500).json({ msg: "Fetching Order Items Failed" });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  orderItems,
};
