import { ArrowLeft, Calendar, Edit, Mail, Tag, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostView = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="detail-page">
      <div className="detail-toolbar">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to Posts
        </button>
        <div className="toolbar-actions">
          <button className="btn btn-primary" onClick={() => navigate(`/edit/${post._id}`)}>
            <Edit size={16} />
            Edit Post
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(post._id)}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <article className="post-detail-card">
        <div className="post-detail-header">
          <span className={`badge ${post.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>
            {post.status}
          </span>
          <span className="badge badge-info">{post.category}</span>
        </div>

        {post.thumbnailUrl && (
          <div className="thumbnail-frame">
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              onError={(e) => {
                e.currentTarget.parentElement.style.display = 'none';
              }}
            />
          </div>
        )}

        <h1 className="post-title">{post.title}</h1>

        <div className="meta-grid">
          <div className="meta-item">
            <User size={16} />
            <span>{post.authorName}</span>
          </div>
          <div className="meta-item">
            <Mail size={16} />
            <span>{post.email}</span>
          </div>
          <div className="meta-item">
            <Calendar size={16} />
            <span>Created {formatDate(post.createdAt)}</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="tags-row">
            <Tag size={16} />
            <div>
              {post.tags.map((tag) => (
                <span key={tag} className="badge badge-neutral">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <section className="detail-section summary-section">
          <h2>Summary</h2>
          <p>{post.shortDescription}</p>
        </section>

        <section className="detail-section">
          <h2>Content</h2>
          <div className="post-content">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? <p key={index}>{paragraph}</p> : null
            ))}
          </div>
        </section>

        <footer className="detail-footer">
          <span>Last updated: {formatDate(post.updatedAt)}</span>
          <span>Post ID: {post._id}</span>
        </footer>
      </article>
    </div>
  );
};

export default PostView;
