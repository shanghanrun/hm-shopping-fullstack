import {create} from 'zustand'
//status는 success, error,info,warning

const uiStore =create((set)=>({
	toastMessage:{message:'', status:''},
	isFullyLoaded:true, 
	popupContent:{message:'', data:{}, status:''},
	showPopup:(message, data, status)=>{
		set({popupContent: {message, data, status}})
	}, 
	showToastMessage: (message, status) => {
    set({ toastMessage: { message, status } });
 	},
}))


export default uiStore;