// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

interface _id {
    timestamp: number
}
export interface ITODO {
    id: _id,
    title: string,
    description: string,
    status: string,
    list_index: number,
    list_position: number
}

export interface UpdateTODO {
    id: _id,
    title: string,
    description: string,
    status: string,
    list_index: number
}
export interface updateRequest {
    _id: _id,
    title: string,
    description: string,
    status: string,
    list_index: number
}

export interface DragandDropModel {
    droppableId: string,
    index: number
}
export interface dragandDroprequest {
    updateRequest: updateRequest,
    source: DragandDropModel,
    designation: DragandDropModel
}

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7258/' }),
    tagTypes: ["todo"],
    endpoints: (builder) => ({
        getAllTODO: builder.query<ITODO[], void>({
            query: (name) => `TODO/Get_All`,
            providesTags: ['todo']
        }),
        getTODObyID: builder.query<ITODO, string>({
            query: (id) => `TODO/Get_Todo_by_Id?Todo_Id=${id}`,
            providesTags: ['todo']
        }),
        updateTodo: builder.mutation<void, updateRequest>({
            query: (todolist) => ({
                url: "/TODO/UpdateTODOTask",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: todolist,
            }),
            invalidatesTags: ["todo"],
        }),
        dragAndDropTodo: builder.mutation<void, dragandDroprequest>({
            query: (todolist) => ({
                url: "/TODO/DragAndDrop",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: todolist,
            }),
            invalidatesTags: ["todo"],
        }),
        addNewToDo: builder.mutation<void, ITODO>({
            query: (todolist) => ({
                url: "/TODO/Insert",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: todolist,
            }),
            invalidatesTags: ["todo"],
        }),
        deleteToDo: builder.mutation<void, string>({
            query: (todolist) => ({
                url: `/TODO/DeleteTODOTask?Todo_Id=${todolist}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }),
            invalidatesTags: ["todo"],
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTODOQuery, useAddNewToDoMutation, useDeleteToDoMutation, useUpdateTodoMutation, useGetTODObyIDQuery, useDragAndDropTodoMutation } = todoApi