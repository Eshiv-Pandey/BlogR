import {
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Layers3,
  Plus,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postAPI } from '../../services/api';
import toast from 'react-hot-toast';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const PostList = ({ posts, pagination, onDelete, onFilterChange, searchQuery, onSearch }) => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All Categories', 'Technology', 'Design', 'Business', 'Lifestyle', 'Other'];
  const statuses = ['All Status', 'Draft', 'Published'];

  const stats = useMemo(() => {
    const published = posts.filter((post) => post.status === 'Published').length;
    const draft = posts.filter((post) => post.status === 'Draft').length;
    const uniqueCategories = new Set(posts.map((post) => post.category)).size;

    return [
      { label: 'Total posts', value: pagination.totalItems || posts.length, tone: 'blue' },
      { label: 'Published here', value: published, tone: 'green' },
      { label: 'Drafts here', value: draft, tone: 'amber' },
      { label: 'Categories here', value: uniqueCategories, tone: 'slate' },
    ];
  }, [pagination.totalItems, posts]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    onFilterChange(value, statusFilter);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterChange(categoryFilter, value);
  };

  const handleExport = async () => {
    try {
      const category = categoryFilter === 'All Categories' ? '' : categoryFilter;
      const status = statusFilter === 'All Status' ? '' : statusFilter;

      const blob = await postAPI.exportToCSV(category, status, searchQuery);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success('Posts exported successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to export posts');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Editorial dashboard</p>
          <h1>Welcome to BlogR</h1>
          <p className="hero-copy">
            Create, curate, and publish your stories. Your entire content library in one clean workspace.
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters((value) => !value)}
          >
            <Filter size={16} />
            {showFilters ? 'Hide Filters' : 'Filters'}
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            Export CSV
          </button>
          <Link to="/add" className="btn btn-primary">
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </section>

      <section className="stats-grid" aria-label="Post statistics">
        {stats.map((item) => (
          <div className="stat-card" data-tone={item.tone} key={item.label}>
            <span className="stat-label">{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <SearchBar onSearch={onSearch} initialQuery={searchQuery} />

      {showFilters && (
        <section className="filter-panel">
          <div className="panel-title">
            <Layers3 size={18} />
            <span>Refine list</span>
          </div>
          <div className="filter-grid">
            <div className="form-group compact">
              <label className="form-label">Category</label>
              <select className="form-control" value={categoryFilter} onChange={handleCategoryChange}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group compact">
              <label className="form-label">Status</label>
              <select className="form-control" value={statusFilter} onChange={handleStatusChange}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FileText size={40} />
          </div>
          <h3 className="empty-state-title">No posts found</h3>
          <p className="empty-state-description">
            {searchQuery
              ? 'Try a different search term or loosen the filters.'
              : 'Create your first post to start building the library.'}
          </p>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post._id}>
                    <td className="muted-cell">
                      {index + 1 + (pagination.currentPage - 1) * pagination.itemsPerPage}
                    </td>
                    <td className="title-cell">{post.title}</td>
                    <td>{post.authorName}</td>
                    <td>
                      <span className="badge badge-info">{post.category}</span>
                    </td>
                    <td>
                      <span className={`badge ${post.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{formatDate(post.createdAt)}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary btn-icon btn-sm"
                          onClick={() => navigate(`/view/${post._id}`)}
                          title="View"
                          aria-label={`View ${post.title}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn btn-secondary btn-icon btn-sm"
                          onClick={() => navigate(`/edit/${post._id}`)}
                          title="Edit"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-danger btn-icon btn-sm"
                          onClick={() => onDelete(post._id)}
                          title="Delete"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="pagination-info">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
            {pagination.totalItems} records
          </p>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => onFilterChange(categoryFilter, statusFilter, page)}
          />
        </>
      )}
    </div>
  );
};

export default PostList;
