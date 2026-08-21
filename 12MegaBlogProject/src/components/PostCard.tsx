import React from 'react'
import { Link } from 'react-router-dom'
import PostStorageService from '../appwrite/storage/PostStorageService'; 

function PostCard({ id, title, featuredImage }: { id: string | null; title: string; featuredImage: string | null }) {
  return (
    <Link to={`/posts/${id}`} className="post-card">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <img src={PostStorageService.getFilePreview(featuredImage)} alt={title} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-lg font-semibold text-center">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard