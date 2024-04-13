import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const RegisteredStudents = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState([]);

    const handleDeleteStudent = async (campaignId, studentId) => {
    try {
        const response = await fetch(`https://project-software-z6dy.onrender.com/applicant/${campaignId}/${studentId}`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

        // Handle the response data here
        if (response.ok) {
            console.log('Student deleted successfully:', data);
            // Thực hiện các hành động khác sau khi xóa sinh viên thành công
        } else {
            // Handle the error response here
            console.error('Failed to delete student:', data?.message);
        }
    } catch (error) {
        // Handle any errors here
        console.error('Error deleting student:', error);
    }
}




    const CustomButton = () => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <Button style={{ backgroundColor: 'green', margin: '6px' }}>Xác nhận</Button>
            </div>
            <div>
                <Button style={{ backgroundColor: 'red', margin: '6px' }}>Hủy</Button>
            </div>
        </div>
    );

    const columns = [
        {
            name: 'Họ và Tên',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
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
    ];

    const token = JSON.parse(localStorage.getItem('token'));
    const apiUrl = `https://project-software-z6dy.onrender.com/applicant?strategy=${id}&status=0`;

    const handleGetApplicant = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token
                },
            });

            const data = await response.json();

            // Handle the response data here
            if (response.ok) {
                setApplicant(data.data);
            } else {
                // Handle the error response here
                console.error(data?.message);
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetApplicant();
    }, [id]);

    const handleFilter = (event) => {
        const newData = applicant.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setApplicant(newData);
    };

    return (
        <div className="location-list">
            <div className='text-end'>
           
            </div>
            <DataTable
                columns={columns}
                data={applicant}
                fixedHeader
                selectableRows
                pagination
            />
        </div>
    );
};

export default RegisteredStudents;
