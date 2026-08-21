import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import PostService from '../appwrite/database/PostService'
import type { Post } from '../types/post'

function EditPost() {
    // CHANGE: Use Models.Row instead of Models.Document
    const [post, setPost] = useState<Post | null>(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return

            try {
                // CHANGE: Explicitly type the result as Models.Row
                const postDetails = await PostService.getPostDetailsById(slug) as unknown as Post
                
                if (postDetails) {
                    setPost(postDetails)
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

    if (!post) {
        return null 
    }

    return (
        <Container>
            <PostForm post={post} />
        </Container>
    )
}

export default EditPost
