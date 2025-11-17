import { http } from 'msw'
import type { ApiResponse } from '@/shared/api/types'
import type {
  FormGroupOptionsResponse,
  FormStepOptionsResponse,
} from '@/entities/form-options'
import { getFormGroupOptions, getFormStepOptions } from '../data/options'
import { MOCK_API_BASE_URL } from '../config'
import { createSuccessResponse } from '../lib/response'

const BASE_URL = MOCK_API_BASE_URL
type EmptyParams = Record<string, never>

export const optionsHandlers = [
  http.get<EmptyParams, undefined, ApiResponse<FormGroupOptionsResponse>>(
    `${BASE_URL}/options/form-group`,
    () => {
      return createSuccessResponse<FormGroupOptionsResponse>(
        getFormGroupOptions(),
        'OK'
      )
    }
  ),
  http.get<EmptyParams, undefined, ApiResponse<FormStepOptionsResponse>>(
    `${BASE_URL}/options/form-step`,
    () => {
      return createSuccessResponse<FormStepOptionsResponse>(
        getFormStepOptions(),
        'OK'
      )
    }
  ),
]
