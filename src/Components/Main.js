import React, { useState, useEffect } from "react";
import Title from "./Title";

function Main() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const ACCESS_KEY = "O0700x2aYaAS-0GpQxAOX-CzsEDC4IC1_XuSTKdaLBQ";
        const API_URL = "https://api.unsplash.com/photos?client_id=" + ACCESS_KEY;

        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const fetchedPosts = data.map(photo => ({
                    id: photo.id,
                    description: photo.alt_description || "No description",
                    imageLink: photo.urls.small
                }));
                setPosts(fetchedPosts);
            })
            .catch(error => console.error("Error fetching photos from Unsplash:", error));
    }, []); 

    const removePhoto = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    return (
        <div className="App">
            <Title title={"Photo wall"} />

            <div className="photoGrid">
                {posts.map((post) => (
                    <div key={post.id} className="photoBox">
                        <figure className="figure">
                            <img src={post.imageLink} alt={post.description} className="photoImage"/>
                            <figcaption className="photoCaption">{post.description}</figcaption>
                        </figure>
                        <button className="removeButton" onClick={() => removePhoto(post.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;
