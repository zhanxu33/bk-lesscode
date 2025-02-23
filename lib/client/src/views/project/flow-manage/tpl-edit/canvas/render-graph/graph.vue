<template>
    <div class="render-graph">
        <Tools v-if="instance" class="tools-container" />
        <Dnd v-if="instance && !viewMode" class="dnd-container" :instance="instance" />
        <div ref="graphRef" class="graph-canvas-container"></div>
    </div>
</template>
<script>
    import { defineComponent, ref, onMounted } from 'vue'
    import { Graph } from '@antv/x6';
    import { Snapline } from '@antv/x6-plugin-snapline'
    import { registryNode } from './registry'
    import { GET_GRAPH_CONFIG, GET_EDGE_DEFAULT_CONFIG } from './constants'
    import Dnd from './dnd.vue'
    import Tools from './tools.vue'

    export default defineComponent({
        name: 'RenderGraph',
        components: {
            Dnd,
            Tools
        },
        props: {
            viewMode: {
                type: Boolean,
                default: false
            },
            nodes: {
                type: Array,
                default: () => []
            },
            edges: {
                type: Array,
                default: () => []
            }
        },
        setup (props, ctx) {
            const graphRef = ref(null)
            const instance = ref(null)

            onMounted(() => {
                initGraph()
            })

            const initGraph = () => {
                let config = GET_GRAPH_CONFIG(graphRef.value)

                if (props.viewMode) {
                    config = Object.assign({}, config, {
                        interacting: {
                            nodeMovable: false
                        }
                    })
                }

                instance.value = new Graph(config)

                // 节点对齐线
                instance.value.use(
                    new Snapline({
                        enabled: true
                    })
                )

                registryNode(
                    {
                        click: handleClick,
                        delete: handleDeleteNode
                    },
                    props.viewMode
                )
                setGraphEvents()
                updateGraph()
            }

            const setGraphEvents = () => {
                if (!props.viewMode) {
                    // 控制连接桩显示/隐藏
                    instance.value.on('node:mouseenter', ({ cell }) => {
                        const ports = cell.getPorts()
                        ports.forEach((item) => {
                            cell.setPortProp(item.id, 'attrs/circle/style/visibility', 'visible')
                        })
                    })
                    instance.value.on('node:mouseleave', ({ cell }) => {
                        const ports = cell.getPorts()
                        ports.forEach((item) => {
                            cell.setPortProp(item.id, 'attrs/circle/style/visibility', 'hidden')
                        })
                    })
                    // 边hover
                    instance.value.on('edge:mouseenter', ({ edge }) => {
                        if (!edge.hasTool('button-remove')) {
                            edge.addTools([{ name: 'button-remove' }])
                        }
                    })
                    instance.value.on('edge:mouseleave', ({ edge }) => {
                        if (edge.hasTool('button-remove')) {
                            edge.removeTools([{ name: 'button-remove' }])
                        }
                    })
                    // 节点停止移动
                    instance.value.on('node:moved', ({ node }) => ctx.emit('node:moved', node))
                    // 新增节点
                    instance.value.on('node:added', ({ node }) => ctx.emit('node:added', node))
                    // 新增边
                    instance.value.on('edge:connected', ({ edge }) => ctx.emit('edge:added', edge));
                    // 边删除
                    instance.value.on('edge:removed', ({ edge }) => ctx.emit('edge:deleted', edge));
                } else {
                    // 鼠标点击，触发区域改为icon
                    instance.value.on('cell:click', ({ node }) => ctx.emit('node:click', node));
                }
            }

            const updateGraph = () => {
                const cells = []
                props.nodes.forEach(node => {
                    const { id, axis, type } = node
                    const { x, y } = axis
                    const shape = ['Start', 'End'].includes(type) ? 'custom-circle' : 'custom-rect'
                    cells.push(instance.value.createNode({
                        shape: props.viewMode ? `${shape}-view` : shape,
                        id,
                        x,
                        y,
                        data: node
                    }))
                })
                props.edges.forEach(edge => {
                    cells.push(instance.value.createEdge({
                        ...GET_EDGE_DEFAULT_CONFIG(),
                        ...edge,
                    }))
                })
                instance.value.resetCells(cells)
            }

            const handleClick = (node) => {
                ctx.emit('node:click', node)
            }

            const handleDeleteNode = (node) => {
                const edgeIds = instance.value.getConnectedEdges(node.id).map(item => item.id)
                instance.value.removeNode(node.id)
                ctx.emit('node:deleted', node, edgeIds)
            }

            const updateNode = (data) => {
                const node = instance.value.getCellById(data.id)
                node.setData({
                    ...node.getData(),
                    ...data
                })
            }

            return {
                graphRef,
                instance,
                updateGraph,
                updateNode
            }
        }
    })
</script>
<style lang="postcss" scoped>
    .render-graph {
        position: relative;
        display: flex;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .tools-container {
            position: absolute;
            top: 20px;
            left: 100px;
            z-index: 1;
        }
        .graph-canvas-container {
            height: 100%;
            flex: 1;
            cursor: -webkit-grab;
        }
    }
</style>
<style lang="postcss">
    .graph-edge-label {
        display: flex;
        align-items: center;
        .edge-del-icon {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #d8d8d8;
            color: #fff;
            font-size: 14px;
            text-align: center;
            z-index: 2;
            cursor: pointer;
            &:hover {
                background-color: #979ba5;
            }
        }
    }
</style>
