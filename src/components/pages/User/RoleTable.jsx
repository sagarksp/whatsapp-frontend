"use client";
import React, { useState, useEffect } from "react";

const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editRole, setEditRole] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0
    })
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${backendUrl}/api/get-roles?page=${pagination.page}&limit=${pagination.limit}`, {
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch roles");
                }
                const data = await response.json();
                setRoles(data.data);
                setPagination({
                    ...pagination,
                    totalItems: data.pagination.paginate.totalItems,
                })
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, [pagination.page, pagination.limit]);

    const handlePageChange = (newPage) => {
        setPagination({ ...pagination, page: newPage });
    };

    const handleLimitChange = (e) => {
        setPagination({ ...pagination, limit: parseInt(e.target.value), page: 1 });
    };


    const renderPaginationButtons = () => {
        const { page, limit, totalItems } = pagination;
        const totalPages = Math.ceil(totalItems / limit);
        const buttons = [];

        const maxButtons = 5; // Number of pagination buttons to show

        let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
        if(totalPages <= 1){
            return;
        }

        if (page > 1) {
            buttons.push(
                <button key="prev" onClick={() => handlePageChange(page - 1)}  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l">
                    «
                </button>
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                   className={`py-1 px-2 border border-gray-300 hover:bg-gray-200 ${page === i ? 'bg-blue-500 text-white font-bold' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (page < totalPages) {
            buttons.push(
                <button key="next" onClick={() => handlePageChange(page + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r">
                    »
                </button>
            );
        }

        return buttons;
    };
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateRole = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await fetch(`${backendUrl}/api/create-role`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create role");
            }
            const data = await response.json();
            setSuccessMessage(data.message)
            setFormData({name: '', description:''})
            fetchRoles(); // Re-fetch roles to update the list
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleEditRole = async(role)=>{
        setEditRole(role);
        setFormData({
            name: role.name,
            description: role.description
        })
    }

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await fetch(`${backendUrl}/api/update-role/${editRole._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update role");
            }
            const data = await response.json();
            setSuccessMessage(data.message);
            setEditRole(null);
            setFormData({name: '', description:''})
            fetchRoles();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () =>{
        setEditRole(null);
        setFormData({name:'', description:''});
    };

    if (loading) {
        return <div className="text-center py-4">Loading roles...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-4">Error: {error}</div>;
    }
    if(roles.length === 0){
        return <div className="text-center py-4">No Roles found.</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4 border rounded bg-white shadow">
            <h2 className="text-2xl font-semibold mb-4">Roles</h2>
            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">{successMessage}</div>}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium">Roles per page</label>
                    <select value={pagination.limit} onChange={handleLimitChange} className="border rounded p-1 text-sm">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {roles.map((role) => (
                    <tr key={role._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{role.name}</td>
                        <td className="px-4 py-2">{role.description}</td>
                        <td className="px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm" onClick={() => handleEditRole(role)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {renderPaginationButtons()}
            </div>
            <div className="mt-6 border rounded shadow p-4">
                <h3 className="text-xl font-semibold mb-4">{editRole ? 'Edit Role' : 'Create Role'}</h3>
                <form onSubmit={editRole ? handleUpdateRole : handleCreateRole} className="flex flex-col">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            {editRole ? "Save" : "Create"}
                        </button>
                        {editRole && (
                            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleTable;