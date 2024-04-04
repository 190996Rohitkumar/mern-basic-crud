import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [dataList, setDataList] = useState([])
  const [datarefresh, setdatarefresh] = useState(new Date().getMilliseconds())
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    getdatalist()
  }, [datarefresh])

  const getdatalist = async () => {
    const response = await fetch("http://localhost:5000/getalluser", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const body = await response.json()
    setDataList([...body])
  }

  const deletedata = async (_id) => {
    const response = await fetch("http://localhost:5000/deleteuser/" + _id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const body = await response.json()
    if (body.error) {
      setError(body.error)
      setSuccess(false)
    } else {
      setError("")
      setSuccess(true)
    }
    setdatarefresh(new Date().getMilliseconds())
  }

  return (
    <div className="container " >
      {
        error && <div className="alert alert-danger" role="alert">
          {error}
        </div>
      }
      {success && <div className="alert alert-success" role="alert">
        User Deleted Successfully
      </div>}
      <div className="d-flex flex-wrap justify-content-between">
        {dataList.map((data, key) => {

          return (
            <div className="card my-2" style={{ width: "18rem" }} key={key}>
              <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.email} <br /> {data.age}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={() => { deletedata(data._id) }}>Delete</button>
                  <Link to={`/updateuser/${data._id}`} className="btn btn-primary">Update</Link>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default Read;