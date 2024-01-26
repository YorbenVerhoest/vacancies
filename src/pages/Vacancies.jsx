import React, { useEffect, useState } from "react";

import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from "axios";
import { Link } from "react-router-dom";

const Vacancies = () => {

    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const getData = async () => {
            axios.get(`http://localhost:8080/core/api/vacancy/`)
                .then((res) => {
                    setData(res.data)
                    setLoaded(true)
                })
        }

        getData()

    }, [])


    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 150,
                Cell: ({ cell, row }) => (
                    <Link to={`${cell.row.original.id}`}>
                        {cell.row.original.id}
                    </Link>
                  ),
            },
            {
                accessorKey: 'actual_company.name',
                header: 'Company name',
                size: 150,
            },
            {
                accessorKey: 'recruitment_company.name',
                header: 'Recruitment company',
                size: 150,
            },
            {
                accessorKey: 'role',
                header: 'Role',
                size: 150,
            },
            {
                accessorKey: 'offered_conditions',
                header: 'Offered conditions',
                size: 150,
                Cell: ({ cell, row }) => (
                    <span>
                        {cell.row.original.offered_conditions.map(item => item.condition_type.name).join(', ')}
                    </span>
                  ),

            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableDensityToggle: false,
        initialState: { density: 'compact', pagination: { pageSize: 25, } },
    });


    return (
        <div id="vacancies" style={{"padding": "20px", "height": "100%"}}>
            {loaded && <MaterialReactTable table={table} />}
        </div>
    )
};

export default Vacancies;

