import React from "react";
import { useEffect, useState } from "react";
import "./table.css"

export default function UseFetch() {
  const [data, setData] = useState({});

  const url = "https://api.data.gov.sg/v1/environment/psi";

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  
  const [headers, setHeaders] = useState([])
  const [lastUpdate, setLastUpdate] = useState()

  const [headersHtml, setHeadersHtml] = useState([])
  const [rowsHtml, setRowsHtml] = useState([])
  let headersHtmlArray = []
  let rowsHtmlArray = []

  useEffect(() => {
    fetch(url)
    .then((json) => json.json())
    .then((res) => {
      let date = new Date(res.items[0].update_timestamp)
      let mins = ('0'+date.getMinutes()).slice(-2)
      let months = date.toLocaleString('default', { month: 'short' });
      setLastUpdate(date.getDay().toString()+" "+months+" "+date.getFullYear().toString()+", "+date.getHours()+":"+mins)
      setData(res.items[0].readings)
      setLoading(false)
    }).catch(error => setError(error))
  }, []);

  useEffect(() => {
    rowsHtmlArray = []
    Object.keys(data).forEach((key) => {
      rowsHtmlArray.push(
        <tr>
          <td>{key}</td>
          <td>{data[key].national}</td>
          <td>{data[key].central}</td>
          <td>{data[key].west}</td>
          <td>{data[key].east}</td>
          <td>{data[key].north}</td>
          <td>{data[key].south}</td>
        </tr>
      )
    })

    if (Object.keys(data).length > 0) {
      setHeaders(Object.keys(Object.values(data)[0]))
    }
    
    headersHtmlArray = []
    headersHtmlArray.push(<th>metric</th>)
    for (const i in headers) {
      headersHtmlArray.push(<th>{headers[i]}</th>)
    }

    setHeadersHtml(headersHtmlArray)
    setRowsHtml(rowsHtmlArray)
  }, [data])

  if (loading) return <div>loading</div>

  if (error) return <div>error</div>

  return (
    <div>
      <h4>Last updated {lastUpdate} </h4>
        <table>
        <thead>
          <tr>
            {headersHtml}
          </tr>
        </thead>
        <tbody>
          {rowsHtml}
        </tbody>
      </table>
    </div>
  )  
}

