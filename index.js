const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.KEY);
const PORT = process.env.PORT || 5001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
  return items.amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(items);
  console.log(req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
  catch(exception){
    console.log(exception)
  }

});

app.listen(PORT, () => console.log("Node server listening on port!",PORT));
