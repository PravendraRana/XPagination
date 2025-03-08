import React, { useEffect, useState } from 'react';
import "./Index.css";

const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(false);
    const rowsPerPage = 10;

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(true);
                alert('failed to fetch data');
            }
        };
        fetchData();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

    // Total number of pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle navigation
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="pagination-container">
            <h1>Employee Data table</h1>
            {error ? (
                <p>Error fetching data</p>
            ) : (
                <>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination-controls">
                        <button onClick={handlePrevious} className="pagination-button">
                            Previous
                        </button>

                        <button
                            key={currentPage}
                            onClick={() => handlePageChange(page + 1)}
                            className="pagination-button"
                        >
                            {currentPage}
                        </button>


                        <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-button">
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EmployeeTable;