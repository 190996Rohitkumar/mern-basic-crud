import { useState } from "react";

function Create() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const handlecreateform = async (e) => {
    e.preventDefault()
    const data = { name, email, age }
    const response = await fetch("http://localhost:5000/post", {
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
  }

  return (
    <div className="container">
      {error && <div className="alert alert-danger" role="alert">
        {error}
      </div>}
      {success && <div className="alert alert-success" role="alert">
        User Added Successfully
      </div>}

      <form method="" onSubmit={(e) => { handlecreateform(e) }}>
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Create;