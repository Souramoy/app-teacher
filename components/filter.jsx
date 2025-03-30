import React, { useState, useEffect } from 'react';
const { getJson } = require("serpapi");


function Filter() {
    const [jobRoles, setJobRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        // Fetch data dynamically
        getJson(
            {
                engine: "google",
                api_key: process.env.SERPAPI_API_KEY,
                q: "job roles",
                location: "Austin, Texas",
            },
            (json) => {
                const results = json["organic_results"] || [];
                setJobRoles(results);
                setFilteredRoles(results); // Initialize filtered roles
            }
        );
    }, []);

    // Handle filter input change
    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        const filtered = jobRoles.filter((role) =>
            role.title.toLowerCase().includes(value)
        );
        setFilteredRoles(filtered);
    };

    return (
        <div>
            <h1>Filter Job Roles</h1>
            <input
                type="text"
                placeholder="Filter job roles..."
                value={filter}
                onChange={handleFilterChange}
            />
            <ul>
                {filteredRoles.map((role, index) => (
                    <li key={index}>{role.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Filter;