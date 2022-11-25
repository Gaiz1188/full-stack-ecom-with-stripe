import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const test = req.body.map((item) => {
    const img = item.image[0].asset._ref
    const newImage = img
      .replace("image-", "https://cdn.sanity.io/images/h8s8ll5e/production/")
      .replace("-webp", ".webp")

    console.log(req.body)
    console.log(newImage)
    console.log(item.name)
    console.log(item.price)
    console.log(item.quantity)
  })

  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1M7MHTEF9d176cw8qZ9LFtDr",
          },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/h8s8ll5e/production/"
            )
            .replace("-webp", ".webp")
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)
      // res.redirect(303, session.url)
      console.log(session)

      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
