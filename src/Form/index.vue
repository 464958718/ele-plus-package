<template>
    <el-form
        ref="formRef"
        :model="internalModel"
        :rules="computedRules"
        :label-width="labelWidth"
        v-bind="attrs"
    >
        <template v-for="(group, groupIndex) in groupedSchema" :key="groupIndex">
            <el-row :gutter="20" v-if="group.title">
                <el-col :span="24">
                    <h3 style="margin-top: 1rem">{{ group.title }}</h3>
                </el-col>
            </el-row>
            <el-row :gutter="20"
                ><template v-for="item in group.fields" :key="item.prop">
                    <el-col :span="item.colSpan || 12"
                        ><el-form-item
                            v-if="isVisible(item)"
                            :label="item.label"
                            :prop="item.prop"
                            :rules="item.rules"
                        >
                            <slot :name="item.prop" v-bind="slotScope(item)">
                                <component
                                    :is="getComponent(item.type)"
                                    v-model="internalModel[item.prop]"
                                    v-bind="item.componentProps"
                                    :disabled="item.disabled"
                                    :readonly="item.readonly"
                                >
                                    <OptionRender v-if="hasOptions(item)" :item="item" />
                                </component>
                            </slot>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </template>
    </el-form>
</template>

<script setup lang="ts">
import { ref, useAttrs, computed, watch, reactive } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { PropsType, FormFieldType, ComponentType } from "./type/form"
import OptionRender from "./components/OptionRender"

const props = defineProps<PropsType>()

const emits = defineEmits<{
    (e: "update:modelValue", value: Record<string, any>): void
}>()

const formRef = ref<FormInstance | null>(null)

const internalModel = reactive({ ...props.modelValue })

const attrs = useAttrs()

// 监听内部 model 的变化，发出事件同步到父组件
watch(
    () => internalModel,
    val => {
        emits("update:modelValue", { ...val })
    },
    { deep: true }
)

// 动态规则计算（可使用组件级 rules + schema 中的 rules）
const computedRules = computed(() => {
    const rules: FormRules = props.rules || {}
    props.schema.forEach(group => {
        group.fields.forEach(item => {
            if (item.rules) {
                rules[item.prop] = item.rules
            }
        })
    })
    return rules
})

// 字段是否显示
const isVisible = (item: FormFieldType): boolean => {
    if (typeof item.visible === "boolean") {
        return item.visible
    }
    if (typeof item.visible === "function") {
        return item.visible(internalModel)
    }
    return true
}

// 生成插槽绑定作用域
const slotScope = (item: FormFieldType) => {
    return {
        model: internalModel.value,
        field: item,
    }
}

// 分组后的 schema，默认传入即为分组结构
const groupedSchema = computed(() => {
    return props.schema
})

// 表单控件映射
const getComponent = (type: ComponentType = "input") => {
    const map: Record<ComponentType, string> = {
        input: "el-input",
        number: "el-input-number",
        select: "el-select",
        timeSelect: "el-time-select",
        date: "el-date-picker",
        time: "el-time-picker",
        switch: "el-switch",
        radio: "el-radio-group",
        checkbox: "el-checkbox-group",
    }
    return map[type] || "el-input"
}

const hasOptions = (item: FormFieldType): boolean => {
    return ["select", "radio", "checkbox"].includes(item.type) && !!item.options
}

// 暴露方法
const validate = () => formRef.value?.validate()
const resetFields = () => formRef.value?.resetFields()
const clearValidate = (props?: string | string[]) => formRef.value?.clearValidate(props)

defineExpose({
    validate,
    resetFields,
    clearValidate,
})
</script>

<style scoped>
.form-footer {
    margin-top: 20px;
    text-align: right;
}
</style>
