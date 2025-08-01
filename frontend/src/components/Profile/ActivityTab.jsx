import React from 'react';

const ActivityTab = ({ 
  activityPosts, 
  isOwner, 
  showPostForm, 
  setShowPostForm, 
  newPost, 
  setNewPost, 
  handleCreatePost, 
  hasMoreActivity, 
  loadActivityFeed 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
          Activity Feed
        </h2>
        {isOwner && (
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create Post</span>
          </button>
        )}
      </div>

      {/* Post Creation Form */}
      {isOwner && showPostForm && (
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Create a New Post</h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share something with your followers..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent resize-none placeholder-gray-400 dark:placeholder-gray-500"
            rows="4"
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setShowPostForm(false);
                setNewPost('');
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              disabled={!newPost.trim()}
              className="px-6 py-2 bg-chef-orange text-white rounded-lg hover:bg-chef-orange-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {activityPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📢</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No activity yet</h3>
          <p className="text-gray-500 dark:text-gray-400">This user hasn't shared any posts yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {activityPosts.map((post, index) => (
              <div key={post._id || index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.author?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt={post.author?.username || 'User'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {post.author?.fullName || post.author?.username || 'Anonymous'}
                      </h4>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
                    
                    {post.images && post.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {post.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt="Post content"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likesCount || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.commentsCount || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreActivity && (
            <div className="text-center mt-8">
              <button
                onClick={() => loadActivityFeed()}
                className="bg-chef-orange text-white px-6 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Load More Posts</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityTab;
