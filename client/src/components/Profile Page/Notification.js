import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaBell,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimes,
  FaClock,
  FaTrash,
  FaFilter
} from 'react-icons/fa';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}user/me`, {
          withCredentials: true
        });
        setNotifications(res.data.notifications || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast.error('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'orderPlaced':
        return <FaBox className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <FaTruck className="w-4 h-4 text-yellow-500" />;
      case 'out-for-delivery':
        return <FaTruck className="w-4 h-4 text-orange-500" />;
      case 'delivered':
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <FaTimes className="w-4 h-4 text-red-500" />;
      default:
        return <FaBell className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get notification color based on type
  const getNotificationColor = (type) => {
    switch (type) {
      case 'orderPlaced':
        return 'border-l-blue-500 bg-blue-50';
      case 'shipped':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'out-for-delivery':
        return 'border-l-orange-500 bg-orange-50';
      case 'delivered':
        return 'border-l-green-500 bg-green-50';
      case 'cancelled':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  // Format notification type for display
  const formatNotificationType = (type) => {
    switch (type) {
      case 'orderPlaced':
        return 'Order Placed';
      case 'shipped':
        return 'Order Shipped';
      case 'out-for-delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Order Delivered';
      case 'cancelled':
        return 'Order Cancelled';
      default:
        return 'Notification';
    }
  };

  // Format time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMs = now - notificationDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  // Get filter counts
  const getFilterCounts = () => {
    const counts = {
      all: notifications.length,
      orderPlaced: notifications.filter(n => n.type === 'orderPlaced').length,
      shipped: notifications.filter(n => n.type === 'shipped').length,
      'out-for-delivery': notifications.filter(n => n.type === 'out-for-delivery').length,
      delivered: notifications.filter(n => n.type === 'delivered').length,
      cancelled: notifications.filter(n => n.type === 'cancelled').length,
    };
    return counts;
  };

  const counts = getFilterCounts();

  const filterOptions = [
    { key: 'all', label: 'All', count: counts.all, color: 'bg-gray-100 text-gray-700' },
    { key: 'orderPlaced', label: 'Placed', count: counts.orderPlaced, color: 'bg-blue-100 text-blue-700' },
    { key: 'shipped', label: 'Shipped', count: counts.shipped, color: 'bg-yellow-100 text-yellow-700' },
    { key: 'delivered', label: 'Delivered', count: counts.delivered, color: 'bg-green-100 text-green-700' },
    { key: 'cancelled', label: 'Cancelled', count: counts.cancelled, color: 'bg-red-100 text-red-700' },
  ];

  // Clear all notifications
  const handleClearAll = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}user/me`, {
        notifications: []
      }, { withCredentials: true });
      
      setNotifications([]);
      toast.success('All notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast.error('Failed to clear notifications');
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      {/* Compact Header with integrated actions */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBell className="w-5 h-5 text-gray-600" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Notifications</h1>
              {notifications.length > 0 && (
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="sm:hidden">{notifications.length} notifications</span>
                  <span className="hidden sm:inline">{filteredNotifications.length} of {notifications.length}</span>
                </p>
              )}
            </div>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <FaTrash className="w-3 h-3" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>

        {/* Desktop Filter Tabs with underline effect - Hidden on mobile */}
        {notifications.length > 0 && (
          <div className="hidden sm:block mt-4 border-b border-gray-200">
            <div className="flex gap-6 overflow-x-auto">
              {filterOptions.map((option) => (
                option.count > 0 && (
                  <button
                    key={option.key}
                    onClick={() => setFilter(option.key)}
                    className={`flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      filter === option.key
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                    {option.count > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        filter === option.key
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {option.count}
                      </span>
                    )}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="px-4 sm:px-6">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <FaBell className="mx-auto text-4xl text-gray-300 mb-3" />
            <h3 className="text-base font-medium text-gray-700 mb-1">
              {filter === 'all' ? 'No notifications yet' : `No ${formatNotificationType(filter).toLowerCase()}`}
            </h3>
            <p className="text-sm text-gray-500">
              {filter === 'all' 
                ? 'New updates will appear here' 
                : 'Check back later for updates'
              }
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-3">
            {filteredNotifications
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((notification, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-r-lg p-3 shadow-sm hover:shadow-md transition-shadow ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {formatNotificationType(notification.type)}
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {getTimeAgo(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;