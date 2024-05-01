import {create} from 'zustand'

const userStore =create((set)=>({
	user:{},
	loginWithToken: async ()=> set(),
	loginWithEmail: async ()=>set(),
	logout:async ()=> set(),
	loginWithGoogle: async ()=>set(),
	registerUser: async()=>set(),

}))

export default userStore;