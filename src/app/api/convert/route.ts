import { openai } from '@/lib/openai'

export async function POST(request: Request) {
  const { value } = await request.json()

  const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  })

  const response = {
    message: 'Successful',
    response: completion.data.choices[0].message?.content.trim(),
  }

  return new Response(JSON.stringify(response))
}
