import React, { Component } from 'react';
import Title from './Title';
import PhotoWall from './photoWall';
import AddPhoto from './AddPhoto';
import { Route, Routes, useNavigate } from 'react-router-dom';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            posts: [{
                id: 0,
                description: "beautiful landscape",
                imageLink: "https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i4eeacaa2dbf12d6d/version/1490299332/most-beautiful-landscapes-in-europe-lofoten-european-best-destinations-copyright-iakov-kalinin.jpg"
              }, {
                id: 1,
                description: "Time Square",
                imageLink: "https://a.cdn-hotels.com/gdcs/production2/d1963/0f6d0b5b-499c-4d1c-8995-1d2ea4f9a9a4.jpg?impolicy=fcrop&w=800&h=533&q=medium.png"
              }, {
                id: 2,
                description: "On a vacation!",
                imageLink: "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/08/24/104670887-VacationExplainsTHUMBWEB.1910x1000.jpg"
              }]
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
                            <PhotoWall posts={this.state.posts} onRemovePhoto={this.removePhoto} onNavigate={this.navigate} />
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

// Wrapper component
function MainWrapper(props) {
    const navigate = useNavigate();
    return <Main navigate={navigate} {...props} />;
}

export default MainWrapper;
