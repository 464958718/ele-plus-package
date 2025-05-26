<template>
    <EleForm
        v-model="formData"
        :schema="formSchema"
        :rules="formRules"
        label-width="120px"
        ref="formWrapper"
    />
</template>

<script lang="ts" setup>
import { ref } from "vue"

const formData = ref({
    username: "",
    password: "",
    gender: "1",
    address: "2",
    confirmPassword: "",
    time: "",
    topic: ["1"],
    date: "",
    timeRange: "",
})

const formRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    confirmPassword: [
        { required: true, message: "请再次输入密码", trigger: "blur" },
        {
            validator: (_, value, callback) => {
                if (value !== formData.value.password) {
                    callback(new Error("两次密码不一致"))
                } else {
                    callback()
                }
            },
            trigger: "blur",
        },
    ],
}

const formSchema = [
    {
        title: "账号信息",
        fields: [
            { label: "用户名", prop: "username", type: "input" },
            {
                label: "密码",
                prop: "password",
                type: "input",
                componentProps: { type: "password" },
            },
            {
                label: "确认密码",
                prop: "confirmPassword",
                type: "input",
                componentProps: { type: "password" },
            },
        ],
    },
    {
        title: "时间",
        fields: [
            { label: "月份", prop: "date", type: "date" },
            { label: "时间", prop: "time", type: "time" },
            { label: "时间选择", prop: "timeRange", type: "timeSelect" },
        ],
    },
    {
        title: "个人信息",
        fields: [
            {
                label: "性别",
                prop: "gender",
                type: "radio",
                options: [
                    { label: "男", value: "1" },
                    { label: "女", value: "2" },
                ],
                colSpan: 24,
            },
            {
                label: "地址",
                prop: "address",
                type: "select",
                options: [
                    { label: "杭州", value: "1" },
                    {
                        label: "成都",
                        value: "2",
                    },
                ],
            },
            {
                label: "兴趣",
                prop: "topic",
                type: "checkbox",
                options: [
                    { label: "睡觉", value: "1" },
                    {
                        label: "吃饭",
                        value: "2",
                    },
                    { label: "打豆豆", value: "3" },
                ],
            },
        ],
    },
]
</script>
