import { defineComponent, PropType, h } from "vue"
import { OptionItem, FormFieldType } from "../type/form"
import { ElOption, ElRadio, ElCheckbox } from "element-plus"

export default defineComponent({
    name: "OptionRender",
    props: {
        item: {
            type: Object as PropType<FormFieldType>,
            required: true,
        },
    },
    setup(props) {
        const renderOption = (opt: OptionItem | string) => {
            const value = typeof opt === "object" ? opt.value : opt
            const label = typeof opt === "object" ? opt.label : opt
            switch (props.item.type) {
                case "select":
                    return h(ElOption, {
                        key: value,
                        label,
                        value,
                    })
                case "radio":
                    return h(
                        ElRadio,
                        {
                            key: value,
                            value: value,
                        },
                        () => label
                    )
                case "checkbox":
                    return h(
                        ElCheckbox,
                        {
                            key: value,
                            label,
                            value,
                            name: props.item.prop,
                        },
                        () => label
                    )
                default:
                    return null
            }
        }
        return () => {
            const options = props.item.options || []
            return Array.isArray(options) ? options.map(renderOption) : null
        }
    },
})
