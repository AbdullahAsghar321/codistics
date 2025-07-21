"use client"
import { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiFileText, FiGrid, FiSettings, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('teams');
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState('add');
  const [isLoading, setIsLoading] = useState(false);

  // State for all data
  const [teams, setTeams] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [teamsRes, blogsRes, projectsRes, servicesRes] = await Promise.all([
        fetch('/api/teams'),
        fetch('/api/blogs'),
        fetch('/api/projects'),
        fetch('/api/services')
      ]);
      
      setTeams(await teamsRes.json());
      setBlogs(await blogsRes.json());
      setProjects(await projectsRes.json());
      setServices(await servicesRes.json());
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setAction('add');
    setCurrentItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setAction('edit');
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setIsLoading(true);
      const endpoint = `/api/${activeTab}/${id}`;
      
      const response = await fetch(endpoint, { 
        method: 'DELETE' 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }

      toast.success(`${activeTab.slice(0, -1)} deleted successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error(`Failed to delete ${activeTab.slice(0, -1)}: ${error.message}`);
      console.error('Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      let endpoint = '';
      let method = '';
      
      // Create a clean body without MongoDB's __v field
      const { __v, _id, ...cleanData } = formData;
      const body = JSON.stringify(cleanData);

      if (action === 'add') {
        method = 'POST';
        endpoint = `/api/${activeTab}`;
      } else {
        method = 'PUT';
        if (!_id) throw new Error('Missing ID for update');
        endpoint = `/api/${activeTab}/${_id}`;
      }

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Operation failed');
      }

      const data = await response.json();
      toast.success(action === 'add' ? 'Item added successfully' : 'Item updated successfully');
      setShowModal(false);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error(`Failed to ${action === 'add' ? 'add' : 'update'} item: ${error.message}`);
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTable = () => {
    if (isLoading) return <div className="text-center py-8">Loading...</div>;

    switch (activeTab) {
      case 'teams':
        return (
          <DataTable 
            data={teams}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Role', accessor: 'role' },
              { header: 'Skills', accessor: 'skills', format: (val) => val.join(', ') },
              { header: 'Actions', accessor: '_id', render: (id, row) => (
                <ActionButtons onEdit={() => handleEdit(row)} onDelete={() => handleDelete(id)} />
              )}
            ]}
          />
        );
      case 'blogs':
        return (
          <DataTable 
            data={blogs}
            columns={[
              { header: 'Title', accessor: 'title' },
              { header: 'Author', accessor: 'author' },
              { header: 'Category', accessor: 'category' },
              { header: 'Date', accessor: 'date', format: (val) => new Date(val).toLocaleDateString() },
              { header: 'Actions', accessor: '_id', render: (id, row) => (
                <ActionButtons onEdit={() => handleEdit(row)} onDelete={() => handleDelete(id)} />
              )}
            ]}
          />
        );
      case 'projects':
        return (
          <DataTable 
            data={projects}
            columns={[
              { header: 'Title', accessor: 'title' },
              { header: 'Category', accessor: 'category' },
              { header: 'Tags', accessor: 'tags', format: (val) => val.join(', ') },
              { header: 'Actions', accessor: '_id', render: (id, row) => (
                <ActionButtons onEdit={() => handleEdit(row)} onDelete={() => handleDelete(id)} />
              )}
            ]}
          />
        );
      case 'services':
        return (
          <DataTable 
            data={services}
            columns={[
              { header: 'Title', accessor: 'title' },
              { header: 'Summary', accessor: 'summary' },
              { header: 'Recommended', accessor: 'recommended', format: (val) => val ? 'Yes' : 'No' },
              { header: 'Actions', accessor: '_id', render: (id, row) => (
                <ActionButtons onEdit={() => handleEdit(row)} onDelete={() => handleDelete(id)} />
              )}
            ]}
          />
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <SidebarItem 
            icon={<FiHome />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem 
            icon={<FiUsers />} 
            text="Teams" 
            active={activeTab === 'teams'} 
            onClick={() => setActiveTab('teams')}
          />
          <SidebarItem 
            icon={<FiFileText />} 
            text="Blogs" 
            active={activeTab === 'blogs'} 
            onClick={() => setActiveTab('blogs')}
          />
          <SidebarItem 
            icon={<FiGrid />} 
            text="Projects" 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}
          />
          <SidebarItem 
            icon={<FiGrid />} 
            text="Services" 
            active={activeTab === 'services'} 
            onClick={() => setActiveTab('services')}
          />
          <SidebarItem 
            icon={<FiSettings />} 
            text="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
            <button 
              onClick={handleAdd}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              <FiPlus className="mr-2" />
              Add New
            </button>
          </div>

          {renderTable()}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <Modal 
          item={currentItem}
          action={action}
          type={activeTab}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

// Reusable Components
const SidebarItem = ({ icon, text, active, onClick }) => (
  <div 
    className={`flex items-center p-3 mb-2 rounded-md cursor-pointer ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </div>
);

const DataTable = ({ data, columns }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.render 
                    ? column.render(item[column.accessor], item)
                    : column.format
                      ? column.format(item[column.accessor])
                      : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex space-x-2">
    <button 
      onClick={onEdit} 
      className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
      aria-label="Edit"
    >
      <FiEdit2 />
    </button>
    <button 
      onClick={onDelete} 
      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
      aria-label="Delete"
    >
      <FiTrash2 />
    </button>
  </div>
);

const Modal = ({ item, action, type, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(item || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const array = value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, [name]: array }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">
            {action === 'add' ? 'Add New' : 'Edit'} {type.slice(0, -1)}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {type === 'teams' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills ? formData.skills.join(', ') : ''}
                    onChange={handleArrayChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </>
            )}

            {type === 'blogs' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </>
            )}

            {type === 'projects' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags ? formData.tags.join(', ') : ''}
                    onChange={handleArrayChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Link</label>
                  <input
                    type="text"
                    name="link"
                    value={formData.link || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </>
            )}

            {type === 'services' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Summary</label>
                  <input
                    type="text"
                    name="summary"
                    value={formData.summary || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Icon</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Href</label>
                  <input
                    type="text"
                    name="href"
                    value={formData.href || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    name="recommended"
                    checked={formData.recommended || false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700">Recommended</label>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : action === 'add' ? 'Add' : 'Save'} {type.slice(0, -1)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;