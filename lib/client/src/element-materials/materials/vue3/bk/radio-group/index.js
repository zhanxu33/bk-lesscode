/**
 * Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 * Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

export default {
    name: 'radio-group',
    type: 'bk-radio-group',
    displayName: '单选框',
    icon: 'bk-drag-radio',
    group: '表单',
    order: 1,
    document: 'https://magicbox.bk.tencent.com/magicbox/3.0/radio',
    events: [
        {
            displayName: '选中值变化',
            name: 'change',
            tips: '单选组选中的值改变时调用该事件函数，事件回调参数 (value: String | Number | Boolean)'
        }
    ],
    styles: [
        'position',
        {
            name: 'size',
            exclude: ['height', 'maxHeight', 'minHeight']
        },
        'margin',
        'pointer',
        'opacity'
    ],
    renderStyles: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    directives: [
        {
            type: 'v-model',
            prop: 'modelValue'
        }
    ],
    groups: [
        { label: '数值', value: 'value' },
        { label: '状态', value: 'state' },
        { label: '样式', value: 'style' },
        { label: '其他', value: 'other' }
    ],
    props: {
        'modelValue': {
            type: ['string', 'number'],
            val: '1',
            directive: 'v-model',
            displayName: '选中的数值',
            tips: '选中的数值，支持v-model双向绑定，v-model优先级更高',
            belongGroup: 'value'
        },
        name: {
            type: 'string',
            val: '',
            displayName: '单选框组名称',
            belongGroup: 'other'
        },
        disabled: {
            type: 'boolean',
            val: false,
            displayName: '是否禁用',
            belongGroup: 'state'
        },
        'with-validate': {
            type: 'boolean',
            val: true,
            displayName: '值改变时触发字段校验规则',
            belongGroup: 'other'
        },
        size: {
            type: 'string',
            options: ['large', 'small'],
            displayName: '尺寸',
            tips: '尺寸',
            belongGroup: 'style'
        },
        beforeChange: {
            type: 'function',
            displayName: '值改变之前的回调函数',
            tips: '值改变之前的回调函数，返回值为false会终止值改变',
            belongGroup: 'other'
        }
    },
    slots: {
        default: {
            name: ['bk-radio'],
            type: ['list', 'remote'],
            displayName: '可选项',
            tips: '默认插槽，填写的数据需要是数组且每个元素需包含label和value字段',
            remoteValidate (data) {
                if (!Array.isArray(data)) return '返回值需要是数组'
            },
            keys: [
                { id: 'label', label: '名称', tips: '从数据中获取名称的字段key，不填取 label 字段' },
                { id: 'value', label: '值', tips: '从数据中获取值的字段key，不填取 value 字段' }
            ],
            val: [
                { label: '单选一', value: '1', checked: false },
                { label: '单选二', value: '2', checked: false },
                { label: '单选三', value: '3', checked: false }
            ],
            payload: {}
        }
    }
}
