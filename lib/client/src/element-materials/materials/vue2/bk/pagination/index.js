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
    name: 'pagination',
    type: 'bk-pagination',
    displayName: '分页',
    icon: 'bk-drag-pagination',
    group: '数据',
    order: 1,
    document: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/pagination',
    events: [
        {
            displayName: '当前页码变化',
            name: 'change',
            tips: '当前页码变化时调用该事件函数，事件回调参数 (current: Number)',
            functionTemplates: [
                {
                    funcName: 'handlePageChange',
                    funcParams: ['current'],
                    funcBody: '// 先记录当前页码。下面的 lesscode[\'${prop:current}\'] 可以替换为绑定在分页组件 current 属性上的变量\n'
                    + 'lesscode[\'${prop:current}\'] = current\n'
                    + '// 请求接口获取最新的分页数据。下面的 url 替换为接口地址，参数根据接口进行修改\n'
                    + 'this.$http.get(\'url\', { params: { page: lesscode[\'${prop:current}\'], pageSize: lesscode[\'${prop:limit}\'] } }).then((data) => {\n'
                    + '    // 将接口返回的数据，赋值给绑定在 table 组件 data 属性的变量，table 就会自动展示新一页的数据。lesscode[\'${prop:tableData}\'] 为绑定在 data 属性上的变量\n'
                    + '    lesscode[\'${prop:tableData}\'] = data.list\n'
                    + '    // 记录总数，分页组件内部计算页码和总页数使用。lesscode[\'${prop:count}\'] 为绑定在 count 属性上的变量\n'
                    + '    lesscode[\'${prop:count}\'] = data.count\n'
                    + '})\n'
                }
            ]
        },
        {
            displayName: '当前分页尺寸变化',
            name: 'limit-change',
            tips: '当前每页展示数量变化时的回调',
            functionTemplates: [
                {
                    funcName: 'handleLimitChange',
                    funcParams: ['limit'],
                    funcBody: '// 先记录当前页码。下面的 lesscode[\'${prop:limit}\'] 可以替换为绑定在分页组件 limit 属性上的变量\n'
                    + 'lesscode[\'${prop:limit}\'] = limit\n'
                    + '// 请求接口获取最新的分页数据。下面的 url 替换为接口地址，参数根据接口进行修改\n'
                    + 'this.$http.get(\'url\', { params: { page: lesscode[\'${prop:current}\'], pageSize: lesscode[\'${prop:limit}\'] } }).then((data) => {\n'
                    + '    // 将接口返回的数据，赋值给绑定在 table 组件 data 属性的变量，table 就会自动展示新一页的数据。lesscode[\'${prop:tableData}\'] 为绑定在 data 属性上的变量\n'
                    + '    lesscode[\'${prop:tableData}\'] = data.list\n'
                    + '    // 记录总数，分页组件内部计算页码和总页数使用。lesscode[\'${prop:count}\'] 为绑定在 count 属性上的变量\n'
                    + '    lesscode[\'${prop:count}\'] = data.count\n'
                    + '})\n'
                }
            ]
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
        display: 'block'
    },
    groups: [
        { label: '数据量', value: 'data' },
        { label: '页码', value: 'pageNumber' },
        { label: '页数限制', value: 'amountLimit' },
        { label: '显示', value: 'display' },
        { label: '布局', value: 'layout' },
        { label: '样式', value: 'style' },
        { label: '其他', value: 'other' }
    ],
    props: {
        count: {
            type: 'number',
            val: 10,
            displayName: '总数据量',
            tips: '总数据量',
            belongGroup: 'data'
        },
        current: {
            type: 'number',
            val: 1,
            displayName: '当前页码',
            tips: '当前页码，正整数，支持.sync修饰符',
            modifiers: ['sync'],
            belongGroup: 'pageNumber'
        },
        limit: {
            type: 'number',
            val: 10,
            displayName: '每页条数',
            tips: '每页显示条数(须存在于limit-list中)',
            belongGroup: 'amountLimit'
        },
        'limit-list': {
            type: 'array',
            val: [10, 20, 50, 100],
            displayName: '每页条数可选列表',
            tips: '每页显示条数可选项配置',
            belongGroup: 'amountLimit'
        },
        'show-limit': {
            type: 'boolean',
            val: true,
            displayName: '显示每页条数',
            tips: '是否显示附加功能（调整每页显示条数）',
            belongGroup: 'display'
        },
        'show-total-count': {
            type: 'boolean',
            val: false,
            displayName: '是否显示数据数量',
            tips: '是否显示分页条中共计n条的信息',
            belongGroup: 'display'
        },
        location: {
            type: 'string',
            options: ['left', 'right'],
            val: 'right',
            displayName: '每页条数展示位置',
            tips: '每页显示条数控件位置',
            belongGroup: 'layout'
        },
        align: {
            type: 'string',
            options: ['left', 'center', 'right'],
            val: 'left',
            displayName: '分页展示位置',
            tips: '分页控件位置，优先级高于location',
            belongGroup: 'layout'
        },
        type: {
            type: 'string',
            options: ['default', 'compact'],
            val: 'default',
            displayName: '分页外观类型',
            tips: '组件外观类型',
            belongGroup: 'style'
        },
        size: {
            type: 'string',
            options: ['default', 'small'],
            val: 'default',
            displayName: '尺寸',
            tips: '页码尺寸大小',
            belongGroup: 'style'
        },
        small: {
            type: 'boolean',
            val: false,
            displayName: '是否是小型分页',
            tips: '小型分页',
            belongGroup: 'style'
        },
        popoverOptions: {
            type: 'object',
            displayName: '设置popover组件的tippyOptions选项',
            tips: '透传至翻页下拉列表所在的popover组件的tippyOptions选项',
            belongGroup: 'other'
        },
        showQuickJumper: {
            type: 'boolean',
            val: false,
            displayName: '是否可快速跳转至某页',
            tips: '是否可以快速跳转至某页，紧凑类型无效',
            belongGroup: 'other'
        },
        extCls: {
            type: 'string',
            displayName: '最外层元素的类名',
            tips: '配置自定义样式类名，传入的类会被加在组件最外层的DOM.bk-page上',
            belongGroup: 'style'
        }
    }
}
