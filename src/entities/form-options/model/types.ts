export interface SelectOption {
  value: string
  label: string
}

export interface RegionOption extends SelectOption {
  cities: SelectOption[]
}

export interface FormGroupOptionsResponse {
  projectTypes: SelectOption[]
  tags: string[]
  regions: RegionOption[]
}

export interface FormStepOptionsResponse {
  environments: SelectOption[]
  rolloutWindows: SelectOption[]
}
