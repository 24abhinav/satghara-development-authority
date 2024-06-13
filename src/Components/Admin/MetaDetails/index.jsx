import React, { useEffect, useState } from 'react';
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import Table from '../../ui/Table';
import Wrapper from './style';
import { deleteMetaHandler, fetchAllMeta, saveMetaDetailsHandler, updateMetaStatueHandler } from '../handlers';
import Toast from '../../ui/Toast';
import Loader from '../../Loader';
import { getIstTime } from '../../../helper';

const MetaDetails = () => {
    const [loading, setLoading] = useState(false);
    const [activeMeta, setActiveMeta] = useState({});
    const [metaList, setMetaList] = useState([]);
    const [toast, setToast] = useState();

    const getPageMeta = async () => {
        const { ok, data: { allMeta = [], active = {} } = {} } = await fetchAllMeta();
        if (ok) {
            setActiveMeta(active);
            setMetaList(allMeta);
        }
    };

    useEffect(() => {
        getPageMeta();
    }, []);

    const onMetaSave = async () => {
        const { ok } = await saveMetaDetailsHandler(activeMeta);
        if (ok) {
            setToast({ msg: 'Meta details saved '});
            await getPageMeta();
        } else {
            setToast({ msg: 'Server error'});
        }
    };

    const activateMeta = async ({ id } = {}) => {
        const { ok } = await updateMetaStatueHandler({ id, activeId: activeMeta.id });
        if (ok) {
            await getPageMeta();
        } else {
            alert('Something went wrong...');
        }
        setLoading(false);
    };

    const deleteMeta = async ({ id } = {}) => {
        const { ok } = await deleteMetaHandler({ id });
        if (ok) {
            await getPageMeta();
        } else {
            alert('Something went wrong...');
        }
        setLoading(false);
    };

    const editMeta = (element) => {
        setActiveMeta(element);
        setLoading(false);
    };

    const actions = [
        { handler: activateMeta, label: 'Activate', className: 'warning-btn'},
        { handler: editMeta, label: 'Edit', className: 'primary-btn'},
        { handler: deleteMeta, label: 'Delete', className: 'danger-btn'},
    ];

    const actionButtonsHandler = (handler, params) => {
        if (window.confirm('Are you sure?')) {
            setLoading(true);
            handler(params);
        }
    };

    return (
        <Wrapper className='m-b-20'>
            <Table className="meta-history">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created Date</th>
                        <th>Modified By</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {metaList.map((element) => {
                        const { createdat = '', active = false, id, modifiedby } = element;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{getIstTime(createdat)}</td>
                                <td>{modifiedby}</td>
                                <td className={active ? 'active': 'in-active'}>{active ? 'Live' : 'not-live'}</td>
                                <td className='action-buttons'>
                                    {actions.map(({ handler, label, className }) => (
                                        <button
                                            key={label}
                                            disabled={
                                                (active && (['Delete', 'Activate'].includes(label))) ||
                                                loading
                                            }
                                            onClick={() => actionButtonsHandler(handler, element)}
                                            className={`btn ${className}`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <h4>Active page meta</h4>
            {toast && <Toast { ...toast } /> }
            <JsonView src={activeMeta} editable onChange={({ src }) => setActiveMeta(src)} />
            <hr />
            <button disabled={loading} className='primary-btn btn' onClick={onMetaSave}>Save</button>
        </Wrapper>
    );
}

export default MetaDetails;
