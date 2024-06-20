import React, { useState } from 'react';

const Notifications = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const notifications = [
    {
      id: 1,
      message: 'New message from John',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      message: 'You have a meeting at 3 PM',
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      message: 'Reminder: Pay your bills',
      timestamp: '1 hour ago',
    },
  ];

  const clearNotifications = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    // Logic to clear notifications
    setShowConfirm(false);
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <div className="container mx-auto mt-10 px-4 relative">
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-4">Clear Notifications?</p>
            <div className="flex justify-end">
              <button
                className="text-red-600 mr-4 hover:text-red-700"
                onClick={cancelClear}
              >
                Cancel
              </button>
              <button
                className="text-blue-600 hover:text-blue-700"
                onClick={confirmClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-6 text-black">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center transition duration-300 ease-in-out hover:bg-blue-100 transform hover:scale-105"
          >
            <div>
              <p className="text-lg font-semibold">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.timestamp}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 focus:outline-none">
              View
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-8 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        onClick={clearNotifications}
      >
        Clear Notifications
      </button>
    </div>
  );
};

export default Notifications;
