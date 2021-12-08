let fs = require('fs')
let rl = require('readline')
let keys = ['A', 'B', 'C', 'D']
let allInfo = {}
let answer = []
let realAnswers = []
let index = 0
let score = 0


let tests = fs.readFileSync('test.json', 'utf-8')
tests = tests ? JSON.parse(tests) : []

let userInfo = fs.readFileSync('users.json', 'utf-8')
userInfo = userInfo ? JSON.parse(userInfo) : []
const readline = rl.createInterface({
	output: process.stdout,
	input: process.stdin,
})

function shuffle (array) {
    let result = []
    for(let i = array.length; i >= 0; i--){
        let index = parseInt(Math.random() * i)
        result.push(array[index])
        array.splice(index, 1)
    }
    result.length = result.length - 1
    return result
}
tests = shuffle(tests)


for(let i of tests){
    console.log(i.trueAnswer);
    realAnswers.push(i.trueAnswer)
}

function askName () {
    readline.question('Ismingizni kiriting ', (data) => {
		if(!data) return askName()
		allInfo.name = data
		return askQuestion(index)
	})
}



function askQuestion(innerIndex) {
    readline.question( `${innerIndex + 1} - savol: ${tests[innerIndex].questionText}
        A) ${tests[innerIndex].options[0].A}
        B) ${tests[innerIndex].options[1].B}
        C) ${tests[innerIndex].options[2].C}
        D) ${tests[innerIndex].options[3].D} \n ` , data => {
        if(!data || !keys.includes(data.toUpperCase())) return askQuestion(innerIndex)
        answer.push(data.toUpperCase())
        if((tests.length - 1) == innerIndex ){
            for(let i = 0; i < tests.length; i++){
                if(answer[i] == realAnswers[i]){
                    score ++
                }

            }
            allInfo.quesNum = tests.length
            allInfo.trueAnswers = score
            allInfo.wrongAnswer = (tests.length) - score
            console.table(allInfo);
            userInfo.push(allInfo)
            fs.writeFileSync('users.json', JSON.stringify(userInfo,null,4))
            console.log(answer, realAnswers);

            return readline.close()
        }else {
            return askQuestion(++innerIndex)
        }

        

    })
}

askName()






































// let fs = require('fs')
// let rl = require('readline')
// let tests = fs.readFileSync('test.json', 'UTF-8')

// const readline = rl.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// })

// let users = fs.readFileSync("users.json", 'UTF-8')
// users = users ? JSON.parse(users) : []
// tests = tests ? JSON.parse(tests) : []
// let trueAnswer = []





// function* gen () {
//     yield `Ismingizni kiriting: `
//     for (let i = 0; i < tests.length; i++){
//         trueAnswer.push(tests[i].trueAnswer)
//         yield i + 1 + "-savol " + tests[i].questionText + '\n' +
//         "A) " + tests[i].options[0].A + '\n' +
//         "B) " + tests[i].options[1].B + '\n' +
//         "C) " + tests[i].options[2].C + '\n' +
//         "D) " + tests[i].options[3].D + '\n' 
//     }
// }



// let generator = gen()

// readline.setPrompt(generator.next().value)
// readline.prompt()

// let userAnswer = []
// readline.on('line', (data) => {
//     if (!data) return gen()
//     userAnswer.push(data.toUpperCase())
// 	let ques = generator.next().value
// 	if(!ques) {
//         let score = 0, result = {}, correct = [], missed = []
//         for(let i = 0; i < userAnswer.length-1; i ++){
//             if(userAnswer[i+1] == trueAnswer[i]){
//                 score ++
//                 correct.push(i+1)
//             }else {
//                 missed.push(i+1)
//             }
//         }
        
//         result.userName = userAnswer[0]
//         result.correctAnswer = score
//         result.wrongAnswer = missed.length
//         users.push(result)
//         fs.writeFileSync("users.json", JSON.stringify(users,null,4))
//         users = JSON.parse(fs.readFileSync('users.json', 'UTF-8'))
//         console.table(users)
//         return readline.close()
        
//     }
// 	readline.setPrompt(ques)
// 	readline.prompt()

// })

