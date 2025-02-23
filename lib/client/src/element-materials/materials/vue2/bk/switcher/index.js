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
    name: 'switcher',
    type: 'bk-switcher',
    displayName: '开关',
    icon: 'bk-drag-switcher',
    group: '表单',
    order: 1,
    document: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/switcher',
    events: [
        {
            displayName: '状态发生变化',
            name: 'change',
            tips: '状态发生变化时调用该事件函数，事件回调参数 (status: Boolean)'
        }
    ],
    styles: [
        'position',
        {
            name: 'size',
            include: ['display']
        },
        'margin',
        'pointer',
        'opacity'
    ],
    renderStyles: {
        display: 'inline-block'
    },
    directives: [
        {
            type: 'v-model',
            prop: 'value'
        }
    ],
    groups: [
        { label: '值', value: 'value' },
        { label: '文本', value: 'text' },
        { label: '状态', value: 'state' },
        { label: '样式', value: 'style' },
        { label: '其他', value: 'other' }
    ],
    props: {
        theme: {
            type: 'string',
            options: ['primary', 'success'],
            val: 'success',
            displayName: '开关主题',
            belongGroup: 'style'
        },
        size: {
            type: 'string',
            options: ['normal', 'large', 'small'],
            displayName: '开关尺寸',
            tips: '尺寸，显示文本时此属性无效',
            belongGroup: 'style'
        },
        value: {
            type: 'boolean',
            val: false,
            displayName: '是否打开',
            tips: '是否打开，支持v-model双向绑定，v-model优先级更高',
            belongGroup: 'value'
        },
        disabled: {
            type: 'boolean',
            val: false,
            displayName: '是否禁用',
            belongGroup: 'state'
        },
        'is-outline': {
            type: 'boolean',
            val: false,
            displayName: '是否为描边效果',
            tips: '是否为描边效果',
            belongGroup: 'style'
        },
        'is-square': {
            type: 'boolean',
            val: false,
            displayName: '是否为方形效果',
            tips: '是否为方形效果',
            belongGroup: 'style'
        },
        'show-text': {
            type: 'boolean',
            val: false,
            displayName: '是否显示文本',
            tips: '是否显示文本',
            belongGroup: 'text'
        },
        'on-text': {
            type: 'string',
            val: 'ON',
            displayName: '打开状态显示的文本',
            tips: '打开状态显示的文本',
            belongGroup: 'text'
        },
        'off-text': {
            type: 'string',
            val: 'OFF',
            displayName: '关闭状态显示的文本',
            tips: '关闭状态显示文本',
            belongGroup: 'text'
        },
        // trueValue: {
        //     type: ['boolean', 'string', 'number'],
        //     val: true,
        //     displayName: '打开状态对应的值',
        //     tips: 'switcher的真值',
        //     belongGroup: 'value'
        // },
        // falseValue: {
        //     type: ['boolean', 'string', 'number'],
        //     val: false,
        //     displayName: '关闭状态对应的值',
        //     tips: 'switcher的假值',
        //     belongGroup: 'value'
        // },
        preCheck: {
            type: 'function',
            displayName: '状态切换的前置检测接收操作后的状态',
            tips: '状态切换的前置检测接收操作后的状态（lastValue），返回true，false，Promise',
            belongGroup: 'other'
        }
    }
}
