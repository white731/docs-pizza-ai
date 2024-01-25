const functions = require('firebase-functions')
const admin = require('firebase-admin')
const OpenAI = require('openai')

if (admin.apps.length === 0) {
  admin.initializeApp()
}

exports.chatCompletion = functions.https.onCall(async (data, context) => {
  const { prompt } = data
  const OPEN_API_KEY = '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'
  const openai = new OpenAI({ apiKey: OPEN_API_KEY })
  const aiModel = 'gpt-3.5-turbo-1106'
  const systemContent =
    "You are an assistant that reads people's pizza orders and determines exactly what they are ordering. You will need to tell them a summary of their order in a way that the store can create the order for them. Here are the things that people can order. They can order a small, medium or large pizza. Their sauce options are marinara, ranch or bbq. The toppings options are Pepperoni, Shrimp, Onions, Green, Peppers, Black Olives, Pineapple, Tomato, Mushrooms, Hot Cheese, Jalapenos, Bacon, Anchovies, Minced Garlic, Saurekraut. A small pizza with no toppings (just cheese and sauce) costs 10.70. Each topping on top costs .91 extra. The Medium pizza with no toppings (just cheese and sauce) cost 13.86. Each topping on top costs 1.25 extra. The Large pizza with no toppings (just cheese and sauce)  costs 16.17. Each topping on top costs 1.55 extra. When people are done with their order, you will need to give them a summary of their order with the amount that they will owe when they pick up the pizza."

  const messages = [
    {
      role: 'system',
      content: systemContent,
    },
    {
      role: 'user',
      content: prompt,
    },
  ]

  const completion = await openai.chat.completions.create({
    model: aiModel,
    messages: messages,
  })

  const aiResponse = completion.choices[0].message.content

  return { aiResponse }
})
