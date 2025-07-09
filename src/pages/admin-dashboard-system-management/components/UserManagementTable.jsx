import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('lastLogin');
  const [sortOrder, setSortOrder] = useState('desc');

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "recruiter",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      joinDate: "2023-08-15",
      activityScore: 95,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "job-seeker",
      status: "active",
      lastLogin: "2024-01-15T09:15:00Z",
      joinDate: "2023-11-20",
      activityScore: 87,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15T11:45:00Z",
      joinDate: "2023-05-10",
      activityScore: 98,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      role: "job-seeker",
      status: "suspended",
      lastLogin: "2024-01-10T14:20:00Z",
      joinDate: "2023-12-01",
      activityScore: 45,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      role: "recruiter",
      status: "inactive",
      lastLogin: "2024-01-05T16:30:00Z",
      joinDate: "2023-09-25",
      activityScore: 72,
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ];

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const handleUserAction = (userId, action) => {
    console.log(`User action: ${action} for user:`, userId);
  };

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-warning bg-warning/10';
      case 'suspended': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-white/10';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-primary bg-primary/10';
      case 'recruiter': return 'text-secondary bg-secondary/10';
      case 'job-seeker': return 'text-accent bg-accent/10';
      default: return 'text-text-secondary bg-white/10';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'lastLogin') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-text-primary">User Management</h3>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 glass-surface rounded-lg border border-white/20 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="recruiter">Recruiter</option>
            <option value="job-seeker">Job Seeker</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl mb-4">
          <span className="text-sm text-text-primary">
            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('suspend')}
              iconName="UserX"
            >
              Suspend
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('activate')}
              iconName="UserCheck"
            >
              Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('delete')}
              iconName="Trash2"
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-white/20 bg-white/10 text-primary focus:ring-primary/50"
                />
              </th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">User</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Role</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Last Login</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Activity</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="rounded border-white/20 bg-white/10 text-primary focus:ring-primary/50"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-text-primary">{user.name}</div>
                      <div className="text-sm text-text-secondary">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role.replace('-', ' ')}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-text-secondary">
                  {formatLastLogin(user.lastLogin)}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          user.activityScore >= 80 ? 'bg-success' :
                          user.activityScore >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${user.activityScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-text-secondary">{user.activityScore}%</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'view')}
                      iconName="Eye"
                      className="h-8 w-8 p-0"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'edit')}
                      iconName="Edit"
                      className="h-8 w-8 p-0"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction(user.id, 'message')}
                      iconName="MessageCircle"
                      className="h-8 w-8 p-0"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-text-secondary">
          Showing {sortedUsers.length} of {users.length} users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;