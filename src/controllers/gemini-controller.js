const { GoogleGenerativeAI } = require('@google/generative-ai')

const cropHistory = history => {
  while (history.length !== 0) {
    if (history.at(-history.length).role === 'model') {
      history.shift()
    } else {
      break
    }
  }
}

const chat = async (messageUser, history) => {
  console.log(process.env.API_KEY)
  cropHistory(history)
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-exp-0827',
      generationConfig: { temperature: 2, topK: 64, topP: 0.95 },
      systemInstruction: '',
    })
    const chat = model.startChat({
      history,
    })
    const result = await chat.sendMessage(messageUser)
    console.log(result)
    console.log(result.response.text())
    return { status: 'success', messageGemini: result.response.text() }
  } catch (error) {
    return { status: 'failure', messageError: error.message }
  }
}

module.exports = { chat }
