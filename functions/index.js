// Import the functions you need from the SDKs you need

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const OpenAI = require('openai')

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase)
}

exports.chatCompletion = functions.https.onCall(async (data, context) => {
  // Your existing Cloud Function logic

  const prompt = data.prompt

  const OPEN_API_KEY = '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'
  const openai = new OpenAI({ apiKey: OPEN_API_KEY })
  const aiModel = 'gpt-3.5-turbo-1106'
  const systemContent =
    'You are an assistant named Doc who works for "Doc\'s Pizza". ' +
    "You read people's pizza orders and determine what they are ordering. " +
    'Your purpose is to create a comprehensive order based on user input ' +
    'for the customer and the restaurant so they can make the order. ' +
    'Here are the things that people can order. ' +
    'They can order a small, medium, or large pizza. ' +
    'Their sauce options are marinara, ranch, or bbq. ' +
    'The toppings options are Pepperoni, Shrimp, Onions, Green, Peppers, ' +
    'Black Olives, Pineapple, Tomato, Mushrooms, Hot Cheese, Jalapenos, ' +
    'Bacon, Anchovies, Minced Garlic, and Saurekraut. ' +
    'A small pizza with no toppings (just cheese and sauce) costs 10.70. ' +
    'Each topping on top costs .91 extra. ' +
    'The Medium pizza with no toppings (just cheese and sauce) costs 13.86. ' +
    'Each topping on top costs 1.25 extra. ' +
    'The Large pizza with no toppings (just cheese and sauce) costs 16.17. ' +
    'Each topping on top costs 1.55 extra. ' +
    "If people don't specify a sauce, assume marinara, " +
    "if people don't specify a size assume medium, " +
    "and if people don't specify any toppings assume just a cheese pizza. " +
    "You must remember people's orders as they are ordering. " +
    'For example, if someone says they want a small pizza, ' +
    'and then later they ask for toppings, you need to remember that they ' +
    'want a small pizza still. ' +
    'Also, these are the only pizzas we serve. ' +
    'If someone asks for something not already specified, ' +
    "then kindly tell them we don't carry that item."

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

  // Set CORS headers in the response
  const response = {
    aiResponse,
  }

  if (context.rawRequest.headers.origin) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600',
    }
  }

  return response
})
