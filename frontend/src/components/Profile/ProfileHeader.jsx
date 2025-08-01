import React from 'react';
import { useUser } from '../../store';

const ProfileHeader = ({ 
  profileData, 
  isOwner, 
  isFollowing, 
  followLoading, 
  followerCount, 
  followingCount, 
  handleFollowToggle 
}) => {
  const { userData } = useUser();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light dark:from-chef-orange-dark dark:to-chef-orange p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <img
              src={profileData.user.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"}
              alt={profileData.user.fullName || profileData.user.username}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
              <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">
                {profileData.user.fullName || profileData.user.username}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                @{profileData.user.username}
              </span>
            </div>
            <p className="text-white/90 text-lg mb-4 max-w-2xl">
              {profileData.user.bio || `Passionate home chef sharing delicious recipes and culinary adventures!`}
            </p>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                🏆 {profileData.user.cookingLevel || 'Home Chef'}
              </span>
              {profileData.stats.totalRecipes > 10 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  🔥 Recipe Creator
                </span>
              )}
              {profileData.stats.averageRating >= 4.5 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  ⭐ 5-Star Chef
                </span>
              )}
            </div>

            {/* Social Links */}
            {profileData.user.socialLinks && (
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.user.socialLinks.instagram && (
                  <a href={profileData.user.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                    📷 Instagram
                  </a>
                )}
                {profileData.user.socialLinks.youtube && (
                  <a href={profileData.user.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                    📹 YouTube
                  </a>
                )}
                {profileData.user.socialLinks.x && (
                  <a href={profileData.user.socialLinks.x} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                    🐦 X
                  </a>
                )}
              </div>
            )}

            {/* Follow Button - Only visible to other users */}
            {userData && !isOwner && (
              <div className="mt-4">
                <button
                  onClick={handleFollowToggle}
                  disabled={followLoading}
                  className={`inline-flex items-center px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    isFollowing
                      ? 'bg-white/20 text-white border border-white hover:bg-white/30'
                      : 'bg-white text-chef-orange hover:bg-gray-100'
                  } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {followLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : isFollowing ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Following
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Follow
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
