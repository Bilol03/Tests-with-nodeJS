const rl = require('readline')
const fs = require('fs')
const options = ['A', 'B', 'C', 'D']
const newQuestion = {}
let index = 0
let userQuestion = fs.readFileSync('test.json', 'UTF-8')
userQuestion = userQuestion ? JSON.parse(userQuestion) : []

const readline = rl.createInterface({
	output: process.stdout,
	input: process.stdin,
})

function askQuestionText () {
	readline.question('Savol matnini kirit: ', (data) => {
		if(!data) return askQuestionText()
		newQuestion.questionText = data
		return askQuestionVariants(index)
	})
}

function askQuestionVariants (innerIndex) {
	readline.question(options[innerIndex] + ') ', data => {
		if(!data) return askQuestionVariants(innerIndex)
		newQuestion.options = newQuestion.options || []
		newQuestion.options.push({ [options[innerIndex]]: data })
		if((options.length - 1) == innerIndex) return askQuestionAnswer()
		else return askQuestionVariants(++index)
	})
}

function askQuestionAnswer () {
	readline.question('To\'g\'ri javobni kirit: ', data => {
		if(!data || !options.includes(data)) return askQuestionAnswer()
		newQuestion.answer = data
        userQuestion.push(newQuestion)
        fs.writeFileSync('test.json', JSON.stringify(userQuestion, null, 4))
		readline.close()
	})
}

askQuestionText()














































// let fs = require('fs')
// let rl = require('readline')
// let tests = fs.readFileSync('test.json', 'UTF-8')


// tests = tests ? JSON.parse(tests) : []
// let obj = {}

// let questions = [
//     "Savolni kiriting: ",
//     "A) Javobni kiriting: ",
//     "B) Javobni kiriting: ",
//     "C) Javobni kiriting: ",
//     "D) Javobni kiriting: ",
//     "To'g'ri javobni kiriting: "

// ]



// const readline = rl.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// })

// function* gen() {
//     for(let i of questions){
//         yield i
//     }
// }

// let generator = gen()

// readline.setPrompt(generator.next().value)
// readline.prompt()
// let userQuestion = []
// readline.on('line', data => {
//     userQuestion.push(data)
// 	let ques = generator.next().value
//     if(!ques){
//         obj.questionText = userQuestion[0]
//         obj.options = [{A: userQuestion[1]},{B: userQuestion[2]},{C: userQuestion[3]},{D: userQuestion[4]}]
//         obj.trueAnswer = userQuestion[5]
//         tests.push(obj)
//         fs.writeFileSync('test.json', JSON.stringify(tests, null, 4))
//         return readline.close()
//     }
//     readline.setPrompt(ques)
// 	readline.prompt()
// })