import { useForm } from 'react-hook-form';
import { FilePenLine, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ initialData, onSubmit, isSubmitting }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: '',
      authorName: '',
      email: '',
      category: '',
      tags: '',
      status: 'Draft',
      thumbnailUrl: '',
      shortDescription: '',
      content: '',
    },
  });

  const categories = ['Technology', 'Design', 'Business', 'Lifestyle', 'Other'];
  const statuses = ['Draft', 'Published'];

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="editor-shell">
      <div className="form-card">
        <div className="form-hero">
          <span className="form-icon">
            <FilePenLine size={28} />
          </span>
          <div>
            <p className="eyebrow">{initialData ? 'Editorial update' : 'New story'}</p>
            <h1>{initialData ? 'Edit Post' : 'Create New Post'}</h1>
            <p>Shape the metadata, summary, and body before it reaches readers.</p>
          </div>
        </div>

        <section className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid two-column">
            <div className="form-group">
              <label className="form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="Enter post title"
                {...register('title', {
                  required: 'Title is required',
                  maxLength: {
                    value: 200,
                    message: 'Title must not exceed 200 characters',
                  },
                })}
              />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Author Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.authorName ? 'error' : ''}`}
                placeholder="Enter author name"
                {...register('authorName', {
                  required: 'Author name is required',
                })}
              />
              {errors.authorName && <p className="form-error">{errors.authorName.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="author@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>Classification</h2>
          <div className="form-grid two-column">
            <div className="form-group">
              <label className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                className={`form-control ${errors.category ? 'error' : ''}`}
                {...register('category', {
                  required: 'Category is required',
                })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="form-error">{errors.category.message}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="react, design, launch"
                {...register('tags')}
              />
              <small className="help-text">Separate tags with commas.</small>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Status <span className="required">*</span>
            </label>
            <select
              className={`form-control ${errors.status ? 'error' : ''}`}
              {...register('status', {
                required: 'Status is required',
              })}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <p className="form-error">{errors.status.message}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>Media</h2>
          <div className="form-group">
            <label className="form-label">Thumbnail URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://example.com/image.jpg"
              {...register('thumbnailUrl')}
            />
            <small className="help-text">Optional image URL for the detail view.</small>
          </div>
        </section>

        <section className="form-section">
          <h2>Content</h2>
          <div className="form-group">
            <label className="form-label">
              Short Description <span className="required">*</span>
            </label>
            <textarea
              className={`form-control ${errors.shortDescription ? 'error' : ''}`}
              placeholder="Brief summary of the post"
              rows="3"
              {...register('shortDescription', {
                required: 'Short description is required',
                maxLength: {
                  value: 300,
                  message: 'Short description must not exceed 300 characters',
                },
              })}
            />
            {errors.shortDescription && <p className="form-error">{errors.shortDescription.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Post Content <span className="required">*</span>
            </label>
            <textarea
              className={`form-control content-input ${errors.content ? 'error' : ''}`}
              placeholder="Write your full blog post content here"
              rows="12"
              {...register('content', {
                required: 'Post content is required',
              })}
            />
            {errors.content && <p className="form-error">{errors.content.message}</p>}
          </div>
        </section>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={isSubmitting}
          >
            <X size={16} />
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {initialData ? 'Update Post' : 'Publish Post'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
