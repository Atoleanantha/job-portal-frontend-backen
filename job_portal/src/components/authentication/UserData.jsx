import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserData = () => {
  const [data, setData] = useState([]);
  console.log("*******************************" , data);
  useEffect(() => {
    axios.get("http://localhost:8000/seeker/findall")
      .then((res) => {
        setData(res.data.data)

        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div>
      <table>
        <th>
          <tr>
            <th>FName</th>
            <th>MName</th>
            <th>LName</th>
          </tr>
        </th>
        <tbody>
        {
        data.map((item)=>{
          return(
            <>
            <tr>
              <td>{item.fName}</td>
              <td>{item.lName}</td>
              <td>{item.mName}</td>
            </tr>
            </>
          )
        })
      }
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
