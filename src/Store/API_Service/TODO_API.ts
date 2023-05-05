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
    status: string
}

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7258/' }),
    tagTypes: ["todo"],
    endpoints: (builder) => ({
        getAllTODO: builder.query<ITODO[], void>({
            query: (name) => `todo`,
            providesTags: ['todo']
        }),
        addNewToDo: builder.mutation<void, ITODO>({
            query: (todolist) => ({
                url: "/TODO",
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
                url: `/TODO?Todo_Id=${todolist}`,
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
export const { useGetAllTODOQuery, useAddNewToDoMutation, useDeleteToDoMutation } = todoApi