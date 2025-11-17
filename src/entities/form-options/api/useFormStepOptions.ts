import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import { formOptionsKeys } from '../model/queryKeys'
import type { FormStepOptionsResponse } from '../model/types'

const fetchFormStepOptions = () =>
  get<FormStepOptionsResponse>('/options/form-step')

export function useFormStepOptions() {
  return useQuery({
    queryKey: formOptionsKeys.step(),
    queryFn: fetchFormStepOptions,
    staleTime: 5 * 60 * 1000,
  })
}
