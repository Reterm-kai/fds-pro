import { useQuery } from '@tanstack/react-query'
import { get } from '@/shared/api/client'
import { formOptionsKeys } from '../model/queryKeys'
import type { FormGroupOptionsResponse } from '../model/types'

const fetchFormGroupOptions = () =>
  get<FormGroupOptionsResponse>('/options/form-group')

export function useFormGroupOptions() {
  return useQuery({
    queryKey: formOptionsKeys.group(),
    queryFn: fetchFormGroupOptions,
    staleTime: 5 * 60 * 1000,
  })
}
