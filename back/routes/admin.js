import express from "express"
import path from "path"
import Quiz from "../models/quiz.js";

const adminRouter = express.Router();  
adminRouter.get("/quiz" , (req, res)=>{
    res.render("addQuiz",{
        loginButton: "Submit"
    })
})

adminRouter.post("/savePost", async (req,res) => {
    try{
         const {question , option1 ,option2 ,option3 ,option4 , answer} = req.body;
         const options = JSON.stringify({option1 , option2, option3, option4})
         const quiz = new Quiz({question, options, answer})
         await quiz.save()
         res.status(201).json(quiz)
     }
     catch(error){
         console.log(error)
         res.status(500).send('Internal server error.')
     }
})
adminRouter.get("/quizListing", async (req,res) => {
    try{
        let quizListing = await Quiz.find()
       // res.status(201).json(quizListing)
       let quizes = []
       quizes = quizListing.map((quiz_arr,index)=>{
            var exp = JSON.parse(quiz_arr.options)
            let quiz_arr1 =[]
            quiz_arr1['id'] = quiz_arr['_id']
            quiz_arr1['question'] = quiz_arr['question']
            quiz_arr1['option1'] = exp.option1
            quiz_arr1['option2'] = exp.option2
            quiz_arr1['option3'] = exp.option3
            quiz_arr1['option4'] = exp.option4
            quiz_arr1['answer'] = quiz_arr['answer']
            return quiz_arr1
       })
       //console.log(quizes)
      // console.log(quizListing)
        res.render("quizListing",{
            quizes,
        })
     }
     catch(error){
         console.log(error)
         res.status(500).send('Internal server error.')
     } 
})

adminRouter.post("/checkAnswer", async (req,res) => {
    try{
        //console.log(req.body.answer)
        const answers = req.body.answer
        let quizListing = await Quiz.find()
        let id=''
        let correctAnswer=''
        let correctAnswerCount = 0;
        
        for (let x in quizListing) {
            id = quizListing[x]['id']
            correctAnswer = quizListing[x]['answer']
                if(correctAnswer === answers[id])
                    correctAnswerCount++
            }
       console.log(correctAnswerCount)
        //  const {question , option1 ,option2 ,option3 ,option4 , answer} = req.body;
        //  const options = JSON.stringify({option1 , option2, option3, option4})
        //  const quiz = new Quiz({question, options, answer})
        //  await quiz.save()
        //  res.status(201).json(quiz)
     }
     catch(error){
         console.log(error)
         res.status(500).send('Internal server error.')
     }
})

export default adminRouter