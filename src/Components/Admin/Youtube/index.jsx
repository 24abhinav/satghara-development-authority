import React, { useState } from 'react';
import Wrapper from './style';
import Toast from '../../ui/Toast';
import YoutubeGallery from '../../ui/Youtube-Gallery';
import { deleteVideoHandler } from '../handlers';

const responseMsg = {
    success: 'Video Deleted successfully',
    error: 'Something went wrong..'
};
const YoutubeSection = () => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [toast, setToast] = useState();

    const deleteVideo = async id => {
        setLoading(true);
        const { ok } = await deleteVideoHandler({ id });
        if (ok) {
            setRefresh(true);
        }
        setLoading(false);
        setToast({ msg: ok ? responseMsg.success : responseMsg.error });
    };

    return (
        <Wrapper className='m-b-20'>
            {toast && <Toast { ...toast } onClose={setToast} /> }
            <YoutubeGallery loading={loading} admin deleteVideo={deleteVideo} refresh={refresh} setRefresh={setRefresh} />
        </Wrapper>
    );
}

export default YoutubeSection;
