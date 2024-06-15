import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { getMetaDetails, getYoutubeVideosHandler } from '../../../handlers';

const YoutubeGallery = () => {
    const { youtubePage = {} } = getMetaDetails() || {};
    const youtubeVideos = [
        { url: 'HKHIwQuJ_1U', title: 'Sample alerts' },
        { url: 'EP33MdHj3AU' },
        { url: 'HKHIwQuJ_1U' },
    ];
    // const [youtubeVideos, setYoutubeVideo] = useState([]);

    // const fetchYoutubeVideos = async () => {
    //     setYoutubeVideo(await getYoutubeVideosHandler());
    // };

    // useEffect(() => {
    //     fetchYoutubeVideos();
    // }, []);
    
    return (
        <Wrapper>
            <h2>{youtubePage.heading}</h2>
            <div className="cards">
                {youtubeVideos.map(({ url, title }) => {
                    return (
                        <div key={url} className='youtube-videos'>
                            <div className='title'>{title || 'SDF On Youtube'}</div>
                            <iframe src={`https://www.youtube.com/embed/${url}`} allowfullscreen />
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
}

export default YoutubeGallery;
