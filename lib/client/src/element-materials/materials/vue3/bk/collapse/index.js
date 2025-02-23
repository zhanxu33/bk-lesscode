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
    name: 'collapse',
    type: 'bk-collapse',
    displayName: '折叠面板',
    icon: 'bk-drag-collapse',
    document: 'https://magicbox.bk.tencent.com/magicbox/3.0/collapse',
    group: '数据',
    order: 1,
    events: [
        { displayName: '点击标题', name: 'item-click', tips: '点击时触发，回调参数为点击的面板对象 (item)' }
    ],
    styles: ['position', 'size', 'margin', 'pointer', 'opacity'],
    directives: [
        {
            type: 'v-model',
            prop: 'model-value'
        }
    ],
    groups: [
        { label: '激活面板', value: 'activePanel' },
        { label: '头部', value: 'header' },
        { label: '图标', value: 'icon' },
        { label: '样式', value: 'style' }
    ],
    props: {
        'model-value': {
            type: ['array', 'string', 'number'],
            val: [],
            displayName: '当前激活面板的key',
            directive: 'v-model',
            tips: '当前激活面板的key，支持v-model双向绑定，v-model优先级更高',
            belongGroup: 'activePanel'
        },
        accordion: {
            type: 'boolean',
            val: false,
            displayName: '是否使用手风琴效果',
            belongGroup: 'style'
        },
        hasHeaderBorder: {
            type: 'boolean',
            val: false,
            displayName: '是否显示头部边框',
            tips: '是否显示头部边框',
            belongGroup: 'header'
        },
        hasHeaderHover: {
            type: 'boolean',
            val: true,
            displayName: '是否在头部悬停时显示效果',
            tips: '是否在头部悬停时显示效果',
            belongGroup: 'header'
        },
        headerIcon: {
            type: 'string',
            displayName: '自定义图标',
            tips: '自定义图标',
            belongGroup: 'icon'
        },
        useCardTheme: {
            type: 'boolean',
            val: false,
            displayName: '是否使用卡片样式',
            tips: '是否使用卡片样式',
            belongGroup: 'style'
        },
        headerIconAlign: {
            type: 'string',
            options: ['left', 'right'],
            val: 'left',
            displayName: '图标位置',
            tips: '图标位置',
            belongGroup: 'icon'
        },
        useBlockTheme: {
            type: 'boolean',
            val: false,
            displayName: '是否使用色块样式',
            tips: '是否使用色块样式',
            belongGroup: 'style'
        }
    },
    slots: {
        default: {
            name: ['bk-collapse-panel'],
            type: ['list', 'remote'],
            displayName: '面板项配置',
            tips: '默认插槽，填写的数据需要是数组且每个元素需包含name字段、label字段、content字段',
            remoteValidate (data) {
                if (!Array.isArray(data)) return '返回值需要是数组'
            },
            keys: [
                { id: 'name', label: '唯一标识符', tips: '唯一标识符，相当于 ID，不填取 name字段' },
                { id: 'label', label: '面板标题', tips: '面板项展示标题，不填取 label字段' },
                { id: 'content', label: '面板内容', tips: '面板项展示内容，不填取 content字段' }
            ],
            val: [
                { name: '1', label: '方案成熟', content: '拥有支撑数百款业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维;' },
                { name: '2', label: '覆盖全面', content: '从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。' },
                { name: '3', label: '开放平台', content: '开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。' }
            ]
        }
    }
}
