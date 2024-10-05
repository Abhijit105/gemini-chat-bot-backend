const { chat } = require('../src/controllers/gemini-controller')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 8080, async () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`)
})

// app.post('/start', async (req, res) => {
//   const reply = await startChat()
//   return res.json({ status: 'success', message: reply })
// })

app.post('/generate', async (req, res) => {
  const { messageUser, history } = req.body
  try {
    const { status, messageError, messageGemini } = await chat(
      messageUser,
      history
    )
    if (status === 'success') {
      return res.json({ status: 'success', messageGemini })
    } else {
      return res.status(500).json({ status: 'failure', messageError })
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'failure', messageError: error.message })
  }
})
