import React, { useEffect, useState } from 'react'
import { Button, Container } from '../components'
import PostStorageService from '../appwrite/storage/PostStorageService'
import type { Post } from '../types/post'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostService from '../appwrite/database/PostService'
import parse from "html-react-parser"

function PostDetails() {
    const [postData, setPostData] = useState<Post>()
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.user)

    const isAuthor = postData && userData ? userData.$id === postData?.userId : false

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return

            try {
                // CHANGE: Explicitly type the result as Models.Row
                const postDetails = await PostService.getPostDetailsById(slug) as unknown as Post
                
                if (postDetails) {
                    setPostData(postDetails)
                } else {
                    navigate('/')
                }
            } catch (error) {
                console.error("Failed to fetch post details:", error)
                navigate('/')
            }
        }

        fetchPost()
    }, [slug, navigate])

    const deletePost = () => {
        const deletePostbyId = async () => {
            if (!slug) return

            try {
                // CHANGE: Explicitly type the result as Models.Row
                await PostService.deletePostById(slug);
            } catch (error) {
                console.error("Failed to fetch post details:", error)
            }

            navigate('/')

        }

        deletePostbyId()
    }

  return (
    postData ? (
        <Container>
            <div className='flex w-full h-[calc(100vh-64px)] relative'>
                <img 
                    src={PostStorageService.getFilePreview(postData?.featuredImage || "")}
                    alt={postData?.title}
                    className='rounded-xl'
                />
                {isAuthor && (
                    <div className='absolute top-2 right-2 flex flex-row gap-2 z-10' >
                        <Link to={`/posts/edit/${postData?.$id}`} className="w-full p-2 bg-blue-500 text-white rounded">
                            Edit
                        </Link>
                        <Button onClick={deletePost} className='p-2'>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{postData?.title}</h1>
                </div>
            <div className="browser-css">
                {parse(postData.content)}
            </div>
        </Container>
    ): <div>Loading...</div>
  )
}

export default PostDetails