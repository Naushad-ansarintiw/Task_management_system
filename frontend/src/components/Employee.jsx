import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Employee = () => {
  const { employeeId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4040/api/getUserData/${employeeId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Initial fetch
    fetchUserData();

    // Polling interval in milliseconds (e.g., 5 minutes)
    const pollingInterval = 3 * 1000;

    // Set up polling using setInterval
    const intervalId = setInterval(() => {
      fetchUserData();
    }, pollingInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [employeeId]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Assign Tasks</h1>

      {userData && (
        <ul className="list-none p-0">
          {userData.tasks.map((task) => (
            <li key={task._id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <input type="checkbox" id={`task${task._id}`} name={`task${task._id}`} className="mr-2" />
                <label htmlFor={`task${task._id}`} className="cursor-pointer text-lg font-semibold">
                  {task.title}
                </label>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="col-span-3 sm:col-span-1 font-semibold">Title:</div>
                <div className="col-span-3 sm:col-span-2">{task.title}</div>
                <div className="col-span-3 sm:col-span-1 font-semibold">Description:</div>
                <div className="col-span-3 sm:col-span-2">{task.description}</div>
                <div className="col-span-3 sm:col-span-1 font-semibold">Due Date:</div>
                <div className="col-span-3 sm:col-span-2">{task.due_date}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Employee;
