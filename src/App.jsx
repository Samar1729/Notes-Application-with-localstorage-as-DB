import { useState } from 'react'

const App = () => {


  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [task, setTask] = useState(() => {
    const savedTask = localStorage.getItem("myTasks")
    if (savedTask){
      // console.log("sam is here",JSON.parse(savedTask));
      
      return JSON.parse(savedTask)
    } else {
      console.log("kuch nhi hai local storage me abhi");
      // return []
    }
  
  })

  console.log(task);

  const submitHandler = (e) => {
    e.preventDefault()

    const copyTask = [...task];

    copyTask.push({ title, details })

    setTask(copyTask) //ab mai react ko bol rha hu ki state task array ko empty se update karke copy task me jo hai wo daal do

    // console.log(copyTask);
    localStorage.setItem("myTasks", JSON.stringify(copyTask))


    setTitle("")  //ab mai react ko bol rha hu ki jaise hi ye task array me task heading and task detail wala data chala jaye to title ko empty kar do
    setDetails("") //ab mai react ko bol rha hu ki jaise hi ye task array me task heading and task detail wala data chala jaye to detail ko empty kar do


  }

  const deleteNote = (idx) => {
    const copyTask = [...task]

    copyTask.splice(idx, 1)

    setTask(copyTask)
    localStorage.setItem("myTasks", JSON.stringify(copyTask))


  }

  return (
    <div className='h-screen lg:flex'>

      <form onSubmit={(e) => {
        submitHandler(e)
      }} className='flex flex-col gap-4 lg:w-1/2 items-start p-10'>

        <h1 className='text-3xl font-bold'>Add Task</h1>

        {/* ------------------------------------------------------ */}

        <input
          className='px-5 py-2 w-full border-2 border-blue-600 rounded outline-none '
          type="text"
          placeholder='Enter Task Heading'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            // console.log(e.target.value);
          }}

        />

        {/* ------------------------------------------------------- */}

        <textarea
          className='px-5 h-32 w-full flex items-start flex-row border-2 border-blue-600 rounded outline-none'
          type="text" name="" id=""
          placeholder='Enter Task Details'
          value={details}
          onChange={(e) => {
            setDetails(e.target.value)
            // console.log(e.target.value);


          }}
        />

        {/* ------------------------------------------------------------ */}

        <button
          className='bg-blue-500 text-black px-5 w-full py-5 mt-0 rounded outline-none'>Add Task</button>
      </form >

      <div className='px-15 py-10 h-full lg:w-1/2 lg:border-l-2'>
        <h1 className='text-3xl font-bold'>Your Tasks</h1>
        <div className='flex flex-wrap gap-5 mt-5 h-full overflow-auto'>
          {task.map(function (elem, idx) {
            // console.log(elem);
            return <div key={idx} className='flex justify-between flex-col relative overflow-x-auto py-6 px-4 bg-cover h-52 w-40 bg-[url("https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png")] rounded-2xl text-black'>
              <div className='overflow-y-auto [&::-webkit-scrollbar]:hidden'>
                <h3 className='text-xl font-bold border-b-black border-b pb-2'>{elem.title}</h3>
                <p className='mt-2 text-xs leading-tight font-medium text-gray-700'>{elem.details}</p>
              </div>
              <button onClick={() => {
                deleteNote(idx)
              }} className='bg-red-500 cursor-pointer active:scale-95 rounded mt-5 font-light text-sm px-1 text-amber-50'>done</button>
            </div>
          })}
        </div>
      </div>
    </div >
  )
}

export default App
