import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Signal, LegalPurpose, DataRequest, CreateDataRequestDTO, UpdateStatusDTO } from '../../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Signal', 'LegalPurpose', 'DataRequest'],
  endpoints: (builder) => ({
    // Signals
    getSignals: builder.query<Signal[], void>({
      query: () => '/signals',
      providesTags: ['Signal'],
    }),
    
    // Legal Purposes
    getLegalPurposes: builder.query<LegalPurpose[], void>({
      query: () => '/legal-purposes',
      providesTags: ['LegalPurpose'],
    }),
    
    // Data Requests
    getDataRequests: builder.query<DataRequest[], void>({
      query: () => '/data-requests',
      providesTags: ['DataRequest'],
    }),
    
    getDataRequestById: builder.query<DataRequest, string>({
      query: (id) => `/data-requests/${id}`,
      providesTags: ['DataRequest'],
    }),
    
    createDataRequest: builder.mutation<DataRequest, CreateDataRequestDTO>({
      query: (body) => ({
        url: '/data-requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DataRequest'],
    }),
    
    updateDataRequestStatus: builder.mutation<DataRequest, { id: string; status: UpdateStatusDTO }>({
      query: ({ id, status }) => ({
        url: `/data-requests/${id}/status`,
        method: 'PATCH',
        body: status,
      }),
      invalidatesTags: ['DataRequest'],
    }),
    
    deleteDataRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/data-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DataRequest'],
    }),
  }),
});

export const {
  useGetSignalsQuery,
  useGetLegalPurposesQuery,
  useGetDataRequestsQuery,
  useGetDataRequestByIdQuery,
  useCreateDataRequestMutation,
  useUpdateDataRequestStatusMutation,
  useDeleteDataRequestMutation,
} = apiSlice;