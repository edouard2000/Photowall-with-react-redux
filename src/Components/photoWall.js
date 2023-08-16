import React from 'react'
import Photo from './Photo'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
function PhotoWall(props) {
    return (
        <div>
            <div className="addPhotoContainer">
                <Link className="addPhotoLink" to="/AddPhoto">Add Photos</Link>
            </div>
            <div className="photoGrid">
                {props.posts
                    .sort((x, y) => y.id - x.id)
                    .map((post, index) => (
                        <Photo key={index} post={post} onRemovePhoto={props.onRemovePhoto} />
                    ))}
            </div>
        </div>
    );
}


PhotoWall.propTypes = {
    posts: PropTypes.array.isRequired,
    onRemovePhoto: PropTypes.func.isRequired
}


 export default PhotoWall