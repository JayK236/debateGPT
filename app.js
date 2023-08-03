//this API key has been disabled for github
const API_KEY = "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"
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const inputElement1 = document.querySelector('input1')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

function changeInput1(value) {
    const inputElement1 = document.querySelector('input1')
    inputElement1.value = value
}

async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "Write a debate between the following characters:" + inputElement.value}],
            max_tokens: 400
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value && inputElement1.value) {
            const pElement = document.createElement('p')
            pElement.textContent = "Write a debate between the following characters:" + inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error){
    console.error(error)
    }

}

submitButton.addEventListener('click',getMessage)

function clearInput () {
    inputElement.value = ''
    inputElement1.value = ''
}

buttonElement.addEventListener('click', clearInput)


