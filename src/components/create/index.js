import { useState, useEffect } from 'react'
import axios from '../../lib/axios'
import { message } from 'antd';

const Default = {
    exchange: '',
    name: '',
    pagelink: 'ru',
    googlelink: ''
}


export const Create = ({ setUsers, activeUsers }) => {
    const [ state, setState ] = useState(Default)
    const [ update, setUpdate ] = useState(false)

    const onChange = (e) => {
        const copy = {...state}
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    useEffect(() => {
        if(activeUsers) {
            setState(activeUsers)
            setUpdate(true)
        }
    }, [activeUsers])

    const DeleteUser = async () => {
        if(state.id) {
            await axios.post("userdelete", {id: state.id})
            .then(res => {
                setUsers(res)
                setState(Default)
                setUpdate(false)
                message.success('User delete')
            })
            .catch(() => {
                message.error('something went wrong');
            })
        }
    }

    const Clearuser = () => {
        setState(Default)
        setUpdate(false)
    }

    const onCreate = async () => {
        let status = true
        for (var prop in state) {
            if(!state[prop] && prop !== "pagelink") status = false
        }

        if(status) {
            await axios.post(update ? "userupdate" : "userpost", state)
            .then(res => {
                setUsers(res)
                if(!update) { setState(Default) }
                message.success('User ' + (update ? "update" : "create"))
            })
            .catch(() => {
                message.error('something went wrong');
            })
        } else {
            message.error('Fill in all the fields');
        }
        
    }

    return (
        <div className="bg-white px-6 md:px-12 lg:px-24 py-8 pb-0 rounded-lg" style={{boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)"}} >
            <div className={update ? "w-full flex pb-4 delete" : "w-full flex pb-4 hidden delete"}>
                <button
                    onClick={() => DeleteUser()}
                    className="ml-auto inline-block px-6 py-2 text-white tracking-widest rounded-full" 
                    style={{backgroundColor: "#EB5757", boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}} 
                >
                    Delete
                </button>
            </div>
            <div className={update ? "w-full flex pb-4 " : "w-full flex pb-4 hidden"}>
                <button
                    onClick={() => Clearuser()}
                    className="ml-auto inline-block px-6 py-2 text-white tracking-widest rounded-full" 
                    style={{backgroundColor: "#EB5757", boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}} 
                >
                    Clear
                </button>
            </div>
            <div className="title text-xl md:text-3xl font-semibold mb-8">Create user statistic page</div>
            <div className="flex flex-wrap">
                <div className="form-input w-full md:w-1/3 md:pl-0 md:px-3 my-2">
                    <label htmlFor="">Exchange</label>
                    <input type="text" name="exchange" value={state.exchange} className="px-2 py-1 mt-2 w-full border border-gray-200 rounded-lg" onChange={onChange}/>
                </div>
                <div className="form-input w-full md:w-1/3 md:px-3 my-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={state.name} className="px-2 py-1 mt-2 w-full border border-gray-200 rounded-lg"  onChange={onChange}/>
                </div>
                <div className="form-input w-full md:w-1/3 md:pr-0 md:px-3 my-2">
                    <label htmlFor="page-link">Page Link</label>
                    <input type="text" name="pagelink" value={state.pagelink} className="px-2 py-1 mt-2 w-full border border-gray-200 rounded-lg" onChange={onChange} />
                </div>
                <div className="form-input w-full mt-2 md:mt-4">
                    <label htmlFor="google-link">Google table link id</label>
                    <input type="text" name="googlelink" value={state.googlelink} className="px-2 py-1 mt-2 w-full border border-gray-200 rounded-lg"  onChange={onChange}/>
                </div>
            </div>
            <div className="w-full flex py-8">
                <button 
                    className="ml-auto inline-block px-6 py-2 text-white tracking-widest rounded-full create-update" 
                    style={{backgroundColor: "#2ECD99", boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}} 
                    onClick={() => onCreate()}
                >
                    {update ? "Update" : "Create"}
                </button>
            </div>
        </div>
    )
}