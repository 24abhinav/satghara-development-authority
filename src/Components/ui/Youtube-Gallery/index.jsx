import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './style';
import { getMetaDetails, getYoutubeVideosHandler } from '../../../handlers';
import Modal from '../Modal';
import Alert from '../Alert';
import ADMIN_STATIC from '../../Admin/constant';
import { addVideoHandler } from '../../Admin/handlers';

const AddNewVideo = ({
    onClose,
    onSuccess
}) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState();
    const btnRef = useRef();

    const onSubmit = async e => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);
        const formData = {};
        const form  = new FormData(e.currentTarget);
        for (let [key, value] of form.entries()) {
            if (value) {
                formData[key] = value;
            }
        }
        formData.url = new URLSearchParams(formData.url.split('?')[1] || '').get('v');
        const { ok } = await addVideoHandler(formData);
        if (ok) {
            onSuccess();
        } else {
            setLoading(false);
            setAlert({ type: 'error', alert: 'Something went wrong' });
        }
    };

    return (
        <Modal loading={loading} onClose={onClose} onProceed={() => btnRef.current.click()}>
            {alert && <Alert { ...alert } />}
            <form onSubmit={onSubmit}>
                {ADMIN_STATIC.youtube.form.map(({ label, name, type, required }) => (
                    <div key={name} className="form-field">
                        <label>{label} {required && <span className='asterisk'>*</span>}</label>
                        <input type={type} name={name} required={required} />
                    </div>
                ))}
                <button ref={btnRef} className='primary btn' type='submit' style={{display: 'none'}} />
            </form>
        </Modal>
    )
};

const YoutubeGallery = ({
    admin,
    refresh,
    setRefresh,
    deleteVideo,
    loading
}) => {
    const { youtubePage = {} } = getMetaDetails() || {};
    const [youtubeVideos, setYoutubeVideo] = useState([]);
    const [modal, setModal] = useState();

    const fetchYoutubeVideos = async (force) => {
        setYoutubeVideo(await getYoutubeVideosHandler(force));
    };

    useEffect(() => {
        fetchYoutubeVideos();
    }, []);

    useEffect(() => {
        if (refresh) {
            fetchYoutubeVideos(true);
            if (setRefresh) {
                setRefresh(false);
            }
        }
    }, [refresh]);

    const addedNewVideo = () => {
        fetchYoutubeVideos(true);
        setModal();
    };
    
    return (
        <Wrapper>
            {modal && <AddNewVideo onClose={setModal} onSuccess={addedNewVideo}/>}
            <div className='d-flex j-space-between a-center'>
                <h2>
                    <span> {youtubePage.heading} </span>
                    <span> ({youtubeVideos.length}) </span>
                </h2>
                {admin && <button onClick={() => setModal(true)} className="btn primary">Add New Video</button>}
            </div>
            <div className="cards">
                {youtubeVideos.map(({ id, url, title }) => {
                    return (
                        <div key={id} className='youtube-videos'>
                            <div className='title d-flex j-space-between a-center'>
                                <h4>{title || 'SDF On Youtube'}</h4>
                                {admin && (
                                    <button disabled={loading} className='btn' onClick={() => deleteVideo(id)} title='Delete'>
                                        <span className="fa fa-trash-o" />
                                    </button>
                                )}
                            </div>
                            <iframe src={`https://www.youtube.com/embed/${url}`} allowFullScreen />
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
}

export default YoutubeGallery;
