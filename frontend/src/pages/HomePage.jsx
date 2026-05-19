import { useState, useEffect } from 'react';
import { postAPI } from '../services/api';
import toast from 'react-hot-toast';
import PostList from '../components/Posts/PostList';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async (page = 1, category = '', status = '', query = '') => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (query) {
        data = await postAPI.searchPosts(query, page, 10, category, status);
      } else {
        data = await postAPI.getAllPosts(page, 10, category, status);
      }

      setPosts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postAPI.deletePost(id);
      toast.success('Post deleted successfully!');
      // Refresh the list
      fetchPosts(pagination.currentPage, '', '', searchQuery);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFilterChange = (category, status, page = 1) => {
    const cat = category === 'All Categories' ? '' : category;
    const stat = status === 'All Status' ? '' : status;
    fetchPosts(page, cat, stat, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchPosts(1, '', '', query);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <PostList
      posts={posts}
      pagination={pagination}
      onDelete={handleDelete}
      onFilterChange={handleFilterChange}
      searchQuery={searchQuery}
      onSearch={handleSearch}
    />
  );
};

export default HomePage;
