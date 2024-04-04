import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
    const {id}=useParams()
    const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const handleupdateform = async (e) => {
    e.preventDefault()
    const data = { name, email, age }
    const response = await fetch("http://localhost:5000/updateuser/"+id, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const body = await response.json()
    console.log(body)
    if (body.error) {
      setError(body.error)
      setSuccess(false)
    } else {
      setError("")
      setSuccess(true)
      
    }
    setName("")
    setEmail("")
    setAge("")

    setTimeout(() => {
        navigate("/read")
    }, 2000);
  }
  const getsingleuser=async()=>{
    //console.log(id)
    const response = await fetch("http://localhost:5000/singleuser/"+id, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const body = await response.json()
      setName(body.name)
      setEmail(body.email)
      setAge(body.age)
  }

  useEffect(()=>{
    getsingleuser()
  },[])

  return (
    <div className="container">
      {error && <div className="alert alert-danger" role="alert">
        {error}
      </div>}
      {success && <div className="alert alert-success" role="alert">
        User Updated Successfully
      </div>}

      <form method="" onSubmit={(e) => { handleupdateform(e) }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" value={name} placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" value={email} placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" id="exampleFormControlInput1" value={age} placeholder="Enter Age" onChange={(e) => { setAge(e.target.value) }} />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default Update;