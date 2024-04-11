import React from 'react'
import img from '../../images/chair.png'
// import DataTable from 'react-data-table-component';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { Button } from 'react-bootstrap';




const Confirmed = () => {
    const CustomButton = ({ onClick }) => (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            {/* <div>
   <Button style={{backgroundColor: 'green', margin: '6px'}}>Xác nhận</Button>
            </div> */}
   
            <div>

<Button style={{backgroundColor: 'red', margin: '6px'}}>Xóa</Button>
         </div>
    </div>
     
      );
    const columns = [
        {
            name: 'Họ và Tên',
            selector: row => row.name,
              sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
              sortable: true,
        },
        {
            name: 'Trường',
            selector: row => row.school,
              sortable: true,
        },
        {
            name: 'Kỹ năng',
            selector: row => row.skill,
              sortable: true,
        },
        {
            name: ' ',
            selector: row => <CustomButton/>,
              sortable: true,
           
              
        },
        // {
        //     name: 'Xác nhận',
        //     cell: row => <CustomButton onClick={() => console.log("Xác nhận", row.id)} />,
        //     // ignoreRowClick: true,
        //     // allowOverflow: true,
        //     button: true,
        //   },
    ];

    const data = [
        {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            school: 'Đại Học Nông Lâm TP.Hồ Chí Minh',
            skill: 'Bơi lội'
        },

        {
            id: 2,
            name: 'John',
            email: 'john@example.com',
            school: '30',
            skill: 'Bơi lội'
        },
        {
            id: 3,
            name: 'John',
            email: 'john@example.com',
            school: '30',
            skill: 'Bơi lội'
        },
        {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            school: '30',
            skill: 'Bơi lội'
        },

      
    ];

    const [records, setRecords] = useState(data);
    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setRecords(newData);
    };



    return (
        <div className="location-list ">
          
            <div className='text-end'>
            <input type="text" placeholder="Filter by name" onChange={handleFilter} />

            </div>
            <DataTable
            columns={columns}
            data={data}
            fixedHeader
            selectableRows
            pagination>

            </DataTable>


        </div>


    )
}

export default Confirmed