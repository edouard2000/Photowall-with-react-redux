import React, { Component } from 'react';
import axios from 'axios'; 
import Title from './Title';
import PhotoWall from './photoWall';
import AddPhoto from './AddPhoto';
import { Route, Routes, useNavigate } from 'react-router-dom';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
        this.removePhoto = this.removePhoto.bind(this);
    }

    removePhoto(postRemoved) {
        this.setState((state) => ({
            posts: state.posts.filter(post => post !== postRemoved)
        }));
    }

    addPhoto(postSubmitted) {
        this.setState(state => ({
            posts: state.posts.concat([postSubmitted])
        }));
    }

    componentDidMount() {
        const accessKey = 'O0700x2aYaAS-0GpQxAOX-CzsEDC4IC1_XuSTKdaLBQ';
        axios.get(`https://api.unsplash.com/photos?client_id=${accessKey}`)
            .then(response => {
                const photos = response.data.map(photo => ({
                    id: photo.id,
                    description: photo.alt_description || "Unsplash Image",
                    imageLink: photo.urls.small
                }));
                this.setState({ posts: photos });
            })
            .catch(error => {
                console.error("Error fetching photos from Unsplash:", error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.posts);
        console.log(this.state);
    }

    render() {
        const { navigate } = this.props; 
        
        return (
            <div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <Title title={'Photowall'} />
                            <PhotoWall posts={this.state.posts} onRemovePhoto={this.removePhoto} />
                        </div>
                    } />
                    
                    <Route path="/AddPhoto" element={
                        <AddPhoto onAddPhoto={(addedPost) => {
                            this.addPhoto(addedPost);
                            navigate('/');  
                        }} />
                    } />
                </Routes>
            </div>
        );
    }
}

function MainWrapper(props) {
    const navigate = useNavigate();
    return <Main navigate={navigate} {...props} />;
}

export default MainWrapper;
