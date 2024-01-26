import React, { useEffect, useState } from "react";

import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from "axios";
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';

const Companies = () => {

    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:8080/core/api/company/`)
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
                accessorKey: 'name',
                header: 'Company name',
                size: 150,
            },
            {
                accessorKey: 'recruitment_company',
                header: 'Recruitment company',
                size: 150,
                Cell: ({ cell, row }) => (
                    <span to={`${cell.row.original.id}`}>
                        {cell.row.original.recruitment_company ? <CheckIcon /> : ''}
                    </span>
                  ),
            },
            {
                accessorKey: 'location',
                header: 'Location',
                size: 150,
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
        <div id="companies" style={{"padding": "20px", "height": "100%"}}>
            {loaded && <MaterialReactTable table={table} />}
        </div>
    )
};

export default Companies;

