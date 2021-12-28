  import { ToastContainer, toast } from 'react-toastify';
  import { useEffect, useRef, useState } from 'react';
  import getQuestion from "./apis/questionApi"
  import questionApi from './apis/questionApi';
  import 'react-toastify/dist/ReactToastify.css';
  import './App.css';
function App() {
  const [selectAnswer, setSelectAnswer] = useState({
    idQuestion: null,
    idAnswer: null
  })
  const [questionId, setQuestionId] =  useState(1);
  const [dataQuestion, setDataQuestion ]= useState();
  const [count, setCount] = useState(30);
  const listColor = ["#E21B3C", "#1368CE", "#D89E00", "#298F0D"];

  useEffect(()=>{
    (async()=>{
      const {data} =  await getQuestion.getQuestion({
        question:questionId
      })
      setDataQuestion(data)
    })()
  },[questionId])

  const handleSelect =  (idQuestion, idAnswer) => {
    setSelectAnswer({
      idQuestion,
      idAnswer
    })
  }
  const refInterVal = useRef();
  useEffect(() => {
    refInterVal.current = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)
    return () => {
      clearInterval(refInterVal.current)
    }
  }, [])
  useEffect(() => {
    if (count === 0) {
      clearInterval(refInterVal.current);
     handleNext();
      
    }
  }, [count])

  const handleNext = async () => {

    // const question = listData.find(item => item.id === selectAnswer?.idQuestion);
    // const answer = question?.listAnswer.find(item => item.id === selectAnswer?.idAnswer);
    const {answer} = await questionApi.postAnswer({
      answer: selectAnswer?.idAnswer,
      question  :  selectAnswer?.idQuestion
    });
     clearInterval(refInterVal.current)
    if (answer) {
      toast("Chúc mừng đáp án đúng!")
    } else {
      toast("Đáp án sai rồi!")
    }
    setQuestionId(prevData=>prevData+1);
    setSelectAnswer({
    idQuestion: null,
    idAnswer: null
  })
  }

  useEffect(() => {

  }, []);

  return (
    <div className="App" >
          <div className='question'><h1>{`Câu hỏi: ${dataQuestion?.question}`}</h1></div>
          <div className='skip'>
            <div className='skin_time' >
              <span>
                {count}
              </span>
            </div>
            <div >
          <image style={{width:"200px", height:"200px"}} src="https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg" />
            </div>
            <button  disabled={!selectAnswer?.idAnswer} onClick={handleNext} className='btn'>Skip</button>
          </div>
          <div className='answer' style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "10px" }}>
            {
              dataQuestion&& dataQuestion.listAnswer.map((items, index) => <div className={selectAnswer?.idAnswer === items.id ? "selectAnswer" : null} onClick={() => handleSelect(dataQuestion.id, items.id)} style={{ background: listColor[index], color: 'white', padding: "30px" }} >
                {items.answer}
              </div>)
            }
          </div>
                
       <ToastContainer />
    </div>
  );
}

export default App;
