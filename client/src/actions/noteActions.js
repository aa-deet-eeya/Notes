import {GET_NOTES, ADD_NOTES, DELETE_NOTE } from './types'

export const getNotes = ()=>{
    return {
        type : GET_NOTES
    }
}