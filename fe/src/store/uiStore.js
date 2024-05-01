import {create} from 'zustand'
import * as types from "../constants/commonUI.constants";

const uiStore =create((set)=>({
	showToastMessage:async(message,status)=>set()
}))

export default uiStore;