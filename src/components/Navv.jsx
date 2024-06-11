import { useState } from "react"


const nav = () => {
  const [items,setitems]=useState([{id:1,Name:"task 1",Discription:"reading",checked:false}
  ,{id:2,Name:"task 2",Discription:"playing cricket",checked:false}
  ,{id:3,Name:"task 3",Discription:"office work",checked:false}

])
    const handledelete=(id)=>{
          const listitem=items.filter((val)=>
                    val.id!==id)
                 setitems(listitem)
                 localStorage.setItem("todolist",JSON.stringify(listitem))  
    
    }


  const [name,setname]=useState("")
  const [discription,setdiscription]=useState("")
  const [filter, setFilter] = useState("All");
  const [body, setbody] = useState(false);
  const [ids, setid] = useState("");
const listitem=()=>{
  const id=items.length?items[items.length-1].id+1:1;
  const additem={id,Name:name,Discription:discription,checked:false}
  const listitems=[...items,additem]
  setitems(listitems)
  localStorage.setItem("todolist",JSON.stringify(listitems)) 
  setname("")
  setdiscription("")
}
const handleedit=(id)=>{
     items.filter((val)=>{
      if(id==val.id){
        setname(val.Name)
        setdiscription(val.Discription)
      }
     })
     setbody(true)
     setid(id)
     }

    const handlechange=(id)=>{
        const change=  items.map((val)=>
            val.id==id?{...val,checked:!val.checked}:val
          )
          setitems(change)
    }
    const filterItems = (item) => {
      if (filter === "All") {
        return true;
      } else if (filter === "Completed") {
        return item.checked;
      } else {
        return !item.checked;
      }
    };
const listitemm=(e)=>{
    const num=Number(e.target.value)
  const change=items.map((val)=>val.id==num?{...val,Name:name,Discription:discription}:val)
      setbody(false)
      setitems(change)
      setname("")
      setdiscription("")
}
  
  return (
    <>
    <div>
    <div className="head">My todo</div>
    <div id="input"><input type="text" placeholder="Name" required value={name} onChange={(e)=>setname(e.target.value)}/>
    <input type="text" placeholder="Discription" required value={discription} onChange={(e)=>setdiscription(e.target.value)} />
    {body?(<button className="btn btn-success" value={ids} onClick={(e)=>listitemm(e)}>Okk</button>):null}
    <button className="btn btn-success" disabled={body} style={{backgroundColor:body?"gray":"#198754"}} onClick={()=>listitem()}>Add Todo</button>
    </div>
    <div id="filter"><h4>My Todos</h4><span><h4>Status Filter :</h4><select id="select"   value={filter}
              onChange={(e) => setFilter(e.target.value)} ><option>All</option><option >Completed</option><option>Not completed</option></select></span></div>
   {items.length?(
    <div className='container'>{
        items.filter(filterItems).map((val,ind)=>(
            <div key={ind} className='box'>
                <h4>Name : {val.Name}</h4>
                <p>Discription : {val.Discription}</p>
                <p>status : <span id="status" onClick={()=>handlechange(val.id)} style={(val.checked)?{backgroundColor:"green"}:{backgroundColor:"orangered"}}>{val.checked?"completed":"Not Completed"}</span></p>
                <div className='button'><button onClick={()=>handleedit(val.id)} style={{backgroundColor:body?"gray":"#198754"}} disabled={body}>Edit</button>
                <button onClick={()=>handledelete(val.id) } style={{backgroundColor:body?"gray":"red"}} disabled={body}>Delete</button>
                
                </div>
            </div>
        ))
        }</div>):(<h1 className="center">List is Empty click add todo to add your todos</h1>)}
        </div>
    </>
  )
}

export default nav