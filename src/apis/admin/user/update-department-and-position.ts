import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

type updateUserDepartmentPayload = {
    userId: number,
    departmentId: number,
    jobPositionId: number,
}

type updateRoleDepartmentResponse = {
    data: {
        updateRoleDepartmentResponses: {
            userId: number;
            success: boolean;
        }
    }
}

export const updateUserDepartment = async (payload: updateUserDepartmentPayload) => {
    const url = '/api/users/update-role-department';
    const result: updateRoleDepartmentResponse = await axiosInstance.post(url, {
        updateRoleDepartmentRequests: [payload]
    });

    return result.data.updateRoleDepartmentResponses
};

export type useUpdateUserDepartmentParams = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useUpdateUserDepartment = ({ onSuccess, onError }: useUpdateUserDepartmentParams) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { userId: number; departmentId: number; jobPositionId: number }) =>
        updateUserDepartment(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [api.USER] });
            onSuccess?.();
            },
        onError: () => {
            onError?.();
        }
    });
}