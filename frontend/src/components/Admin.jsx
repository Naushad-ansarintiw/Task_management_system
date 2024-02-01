import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Admin = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Track the selected user

    const handleOpen = (user) => {
        setSelectedUser(user); // Set the selected user when opening the modal
        console.log(user);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedUser(null); // Reset selected user when closing the modal
        setOpen(false);
    };


    const [userEmails, setUserEmails] = useState([]);
    const [assignTaskForm, setAssignTaskForm] = useState({
        email: '',
        title: '',
        description: '',
        due_date: '',
    });

    const fetchUserEmails = async () => {
        try {
            const response = await fetch('http://localhost:4040/api/getUserEmails'); // Replace with your API endpoint
            const data = await response.json();
            console.log("DJF", data.users);

            setUserEmails(data.users);
        } catch (error) {
            console.error('Error fetching user emails:', error);
        }
    };

    useEffect(() => {
        fetchUserEmails();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignTaskForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleAssignTaskSubmit = async (e) => {
        e.preventDefault();

        try {
            // Replace '/api/assignTask' with your actual API endpoint
            const response = await fetch('http://localhost:4040/api/assignTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignTaskForm),
            });

            if (response.ok) {
                console.log('Task assigned successfully!');
                // Optionally, you can reset the form after successful submission
                setAssignTaskForm({
                    email: '',
                    title: '',
                    description: '',
                    due_date: '',
                });
            } else {
                console.error('Error assigning task:', response.statusText);
            }
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };
    // console.log(userEmails, window.location.pathname);
    return (
        <div className="flex h-screen">
            {/* Left Sidebar (20%) */}
            <div className="flex-none w-1/5 bg-blue-500 p-4 text-white">
                <h3 className="text-lg font-bold mb-4">Sidebar</h3>
                <ul className="list-none p-0">
                    <li>
                        <NavLink to="/admin" className="block py-2 hover:bg-white hover:text-blue-500">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/assign-task" className="block py-2 hover:bg-white hover:text-blue-500">
                            Assign Task
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Right Content Area (80%) */}
            <div className="flex-grow p-4 bg-white">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

                {/* Render content based on the route */}
                {userEmails && window.location.pathname === '/admin' && (
                    <div>
                        <h3 className="text-lg font-bold mb-2">User Emails:</h3>
                        <ul>
                            {userEmails?.length > 0 && (
                                <>
                                    {userEmails.map((user) => (
                                        (user.role === 'employee') ? (
                                            <Button key={user._id} onClick={() => handleOpen(user)}>
                                                {user.email}
                                            </Button>
                                        ) : null
                                    ))}
                                </>
                            )}
                        </ul>
                        {/* Move Modal outside the loop */}
                        {selectedUser && (
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    {selectedUser.tasks?.map((task) => (
                                        <React.Fragment key={task._id}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                {task.title}
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {task.description}
                                            </Typography>
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Modal>
                        )}
                    </div>
                )}

                {window.location.pathname === '/admin/assign-task' && (
                    <form onSubmit={handleAssignTaskSubmit}>
                        <h3 className="text-lg font-bold mb-2">Assign Task:</h3>
                        <label>Email:</label>
                        <select
                            name="email"
                            value={assignTaskForm.email}
                            onChange={handleInputChange}
                            className="border p-2 mb-2"
                        >
                            <option value="" disabled>
                                Select an email
                            </option>
                            {userEmails.map((user) => (
                                (user.role === 'employee') ? <option key={user._id} value={user.email}>
                                    {user.email}
                                </option> : null
                            ))}
                        </select>

                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={assignTaskForm.title}
                            onChange={handleInputChange}
                            className="border p-2 mb-2"
                        />

                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={assignTaskForm.description}
                            onChange={handleInputChange}
                            className="border p-2 mb-2"
                        ></textarea>

                        <label>Due Date:</label>
                        <input
                            type="date"
                            name="due_date"
                            value={assignTaskForm.due_date}
                            onChange={handleInputChange}
                            className="border p-2 mb-2"
                        />

                        <button type="submit" className="bg-blue-500 text-white p-2">
                            Assign Task
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Admin
