import {create} from 'zustand'
//status는 success, error,info,warning

const uiStore =create((set)=>({
	toastMessage:{message:'', status:''},
	isFullyLoaded:true, 
	showToastMessage: (message, status) => {
    set({ toastMessage: { message, status } });
 	},
}))


export default uiStore;