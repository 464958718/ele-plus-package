import type { FormRules } from "element-plus"

const COMPONENT_TYPES = [
    "input",
    "select",
    "date",
    "time",
    "timeSelect",
    "switch",
    "radio",
    "checkbox",
    "number",
] as const

export type ComponentType = (typeof COMPONENT_TYPES)[number]

// 表单项类型定义
export interface FormFieldType {
    label: string
    prop: string
    type: ComponentType
    colSpan?: number
    rules?: any[]
    componentProps?: Record<string, any>
    options?: any[]
    defaultValue?: any
    visible?: boolean | ((model: Record<string, any>) => boolean)
    disabled?: boolean
    readonly?: boolean
}

// 表单分组
export interface FormGroupType {
    title?: string
    fields: FormFieldType[]
}

// props 类型
export interface PropsType {
    modelValue: Record<string, any>
    schema: FormGroupType[]
    rules?: FormRules
    labelWidth?: string
}

export interface OptionItem {
    label: string
    value: any
}

export interface OptionFieldType {
    type: "select" | "radio" | "checkbox"
    options?: (OptionItem | string)[]
    prop?: string
}
