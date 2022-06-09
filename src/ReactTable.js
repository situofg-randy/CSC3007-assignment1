import React from "react";  
import axios from "axios";
import { useEffect, useState } from "react";


const psi_url = "https://api.data.gov.sg/v1/environment/psi";

type Response = {
    metric: string,
    national: number,
    central: number,
    west: number,
    east: number,
    north: number,
    south: number
}

export default function ReactTable() {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(psi_url).catch(err => console.log(err));
    
        if (response) {
            setData(data.pop())
            setData(data.push(response.data.items[0].readings));
            Object.keys(response.data.items[0].readings).forEach((key) => {setColumns(columns.push(key)); setRows(rows.push(response.data.items[0].readings[key]))})
            Object.keys(data[0]).forEach((key) => console.log(key))
        }
    };

    useEffect(() => {
        fetchData();
    }, []);   

    // useEffect(() => {
        
    // }, data);   

    return (
      <div>
        <table>
            <tbody>
                {Object.keys(data[0]).forEach((key) => (<tr>{key}</tr>))}
            </tbody>
        </table>
      </div>
    )
}














































// import react from "React";  
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//     createTable,
//     getCoreRowModel,
//     useTableInstance,
//   } from '@tanstack/react-table'
// import React from "React";

// const psi_url = "https://api.data.gov.sg/v1/environment/psi";

// type Response = {
//     metric: string,
//     national: number,
//     central: number,
//     west: number,
//     east: number,
//     north: number,
//     south: number
// }

// const table = createTable().setRowType<Response>(); 

// const defaultColumns = [
//     table.createGroup({
//       header: 'Name',
//       footer: props => props.column.id,
//       columns: [
//         table.createDataColumn('metric', {
//           cell: info => info.getValue(),
//         }),
//         table.createDataColumn('national', {
//             cell: info => info.getValue(),
//         }),
//         table.createDataColumn('central', {
//             cell: info => info.getValue(),
//         }),
//           table.createDataColumn('west', {
//             cell: info => info.getValue(),
//         }),
//           table.createDataColumn('east', {
//             cell: info => info.getValue(),
//         }),
//           table.createDataColumn('north', {
//             cell: info => info.getValue(),
//         }),
//           table.createDataColumn('south', {
//             cell: info => info.getValue(),
//         }),
//       ],
//     }),
// ]

// export default function ReactTable() {
//     const [data, setData] = useState([]);

//     const [columns] = React.useState<typeof defaultColumns>(() => [
//         ...defaultColumns,
//     ])
      
//     const instance = useTableInstance(table, {
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     })

//     const fetchData = async () => {
//         const response = await axios.get(psi_url).catch(err => console.log(err));
    
//         if (response) {
//             console.log(response.data.items[0].readings);
//             setData(response.data.items[0].readings);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);   

//     // useEffect(() => {
        
//     // }, data);   

//     return (
//         <div>
//       <table>
//         <thead>
//           {instance.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {instance.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>{cell.renderCell()}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//     </table>
//     </div>
//     )
// }






















