<!--
  Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
  Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
  Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://opensource.org/licenses/MIT
  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
-->

<template>
    <main :class="['help-main', helpRootCls]">
        <div class="main-container">
            <aside v-show="isShowAside" class="main-left-sidebar">
                <div class="sidebar-panel">
                    <div class="sidebar-bd">
                        <div class="nav-list">
                            <div class="nav-item" v-for="item in navList" :key="item.name">
                                <div class="item-title">{{item.title}}</div>
                                <template v-for="child in item.childs">
                                    <div :key="child.id">
                                        <template v-if="!isSingleTree(child)">
                                            <div class="nav-child"
                                                :title="child.name"
                                                :class="selectDoc === child.id ? 'nav-active' : ''"
                                                @click="jump(child.id)">
                                                {{child.name}}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <bk-big-tree
                                                ext-cls="tree-cls"
                                                ref="trees"
                                                selectable
                                                enable-title-tip
                                                default-expand-all
                                                :default-selected-node="selectDoc"
                                                :data="child"
                                                @select-change="handlerSelectTreeData">
                                            </bk-big-tree>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div class="main-content">
                <div v-if="isExistDoc" :class="['doc-container', detailBodyCls]">
                    <components :is="selectDoc" />
                </div>
                <bk-exception v-else type="empty" scene="part" ext-cls="excep-cls">
                    <span>暂无该文档</span>
                </bk-exception>
            </div>
        </div>
    </main>
</template>

<script>
    import { getActualTop } from '@/common/util'
    import { defineComponent, ref, watch, computed, onMounted } from 'vue'
    import { useRoute } from '@/router'
    import { getDocsMenuList } from './docs-menu'
    import docComs from './docs'
    export default defineComponent({
        name: 'HelpDocDetail',
        components: {
            ...docComs
        },
        props: {
            selectDoc: {
                type: String,
                default: 'intro'
            },
            isShowAside: {
                type: Boolean,
                default: true
            },
            // 根节点样式添加
            helpRootCls: {
                type: String,
                default: ''
            },
            // 详情外部样式
            detailBodyCls: {
                type: String,
                default: ''
            }
        },
        emits: ['pageSwitchMethod'],
        setup (props, ctx) {
            const navList = getDocsMenuList()

            const jumpAnchor = (anchor) => {
                const node = document.getElementById(anchor)
                if (!node) {
                    document.querySelector('.main-content').scrollTo(0, 0)
                    return
                }
                const top = getActualTop(node)
                this.$nextTick(() => {
                    document.querySelector('.main-content').scrollTo(0, top - 80)
                })
            }
            const route = useRoute()
            const adjustAnchor = () => {
                const hash = route.hash
                const anchor = hash.replace('#/?anchor=', '')
                if (!anchor) {
                    document.querySelector('.main-content').scrollTo(0, 0)
                    return
                }
                setTimeout(() => {
                    jumpAnchor(anchor)
                }, 0)
            }

            const isSingleTree = computed(() => {
                return (child) => {
                    if (!child) return false
                    if (!Array.isArray(child)) return false
                    return child.length > 0
                }
            })

            const isExistDoc = computed(() => {
                const comKeys = Object.keys(docComs)?.map(item => item.toLocaleUpperCase())
                const selectDoc = props.selectDoc?.toUpperCase()?.replaceAll('-', '')
                if (comKeys.includes(selectDoc)) {
                    return true
                }
                return false
            })

            // 切换页面详情时，滚动条位置
            watch(() => props.selectDoc, (newVal, oldVal) => {
                setTreeSelect(props.selectDoc)
                adjustAnchor()
            })

            const trees = ref(null)
            const setTreeSelect = (val) => {
                trees.value.forEach(element => {
                    element.setSelected(val)
                })
            }
            const jump = (routeName) => {
                setTreeSelect(null)
                //  详情切换 方式 由外部决定
                ctx.emit('pageSwitchMethod', routeName)
            }

            const handlerSelectTreeData = (data) => {
                if (data.isLeaf) {
                    // 详情切换 方式 由外部决定
                    ctx.emit('pageSwitchMethod', data.id)
                } else {
                    // 保持一个树下 叶子节点 是选中状态 is-selected
                    data.tree.setSelected(props.selectDoc)
                }
            }

            onMounted(() => {
                adjustAnchor()
                setTimeout(() => {
                    document.querySelector('.nav-list .nav-child.nav-active')?.scrollIntoView()
                }, 0)
            })

            return {
                navList,
                trees,
                jump,
                isSingleTree,
                isExistDoc,
                handlerSelectTreeData
            }
        }
    })
</script>

<style lang="postcss">
    @import './index.css';
    .doc-container{
        width: 1000px;
        margin: 0 auto;
    }
    .tree-cls{
        .bk-big-tree-node{
            padding-left: 20px;
            height: 40px;
            line-height: 40px;
            &:hover {
                background-color: #f0f1f5;
            }
            &.is-root.is-selected {
                background: none;
                .node-content {
                    color: #63656e;
                }
            }
        }
        .is-leaf{
            .node-content{
                padding-left: 20px;
            }
        }
        .is-selected{
            color: #2d8cf0;
            background: #f0faff;
        }
    }
    .nav-list{
        .nav-item{
            .item-title{
                padding-left: 20px;
                padding-bottom: 10px;
                font-weight: 600;
                font-size: 19px;
                color: #313238;
            }
            .nav-child{
                padding-left: 20px;
                font-size: 14px;
                line-height: 40px;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .bk-drag-icon {
                    font-size: 24px;
                }
                .name {
                    margin-left: 10px;
                }
                &:hover {
                    background-color: #f0f1f5;
                }
            }
        }
    }
    .excep-cls.bk-exception {
        top: 50%;
        margin-top: -60px;
    }
</style>
