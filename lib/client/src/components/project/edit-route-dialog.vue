<template>
    <bk-dialog
        v-model="dialog.visible"
        :title="$t('修改路由')"
        width="750"
        :mask-close="false"
        :auto-close="false"
        header-position="left">
        <bk-form class="dialog-form" :label-width="200" form-type="vertical">
            <bk-form-item :label="$t('form_页面路由')" error-display-type="normal">
                <bk-select
                    searchable
                    :clearable="false"
                    :placeholder="$t('未设置')"
                    v-model="selectedRouteId">
                    <bk-option v-for="option in routeOptionList"
                        :key="option.id"
                        :disabled="option.disabled"
                        :id="option.id"
                        :name="option.name">
                    </bk-option>
                    <div slot="extension" style="cursor: pointer;" @click="goToPage('routes')">
                        <i class="bk-drag-icon bk-drag-jump-link"></i> {{ $t('新建路由') }}
                    </div>
                </bk-select>
                <p style="line-height: 20px;" class="mt5 mb0 f12" slot="tip">
                    {{ $t('修改一级路由的同时会变更页面模板，已绑定页面或跳转的路由不能再次选择') }} </p>
            </bk-form-item>
        </bk-form>
        <div class="dialog-footer" slot="footer">
            <bk-button
                theme="primary"
                :disabled="disabled"
                :loading="dialog.loading"
                @click="handleDialogConfirm">{{ $t('确定') }}</bk-button>
            <bk-button @click="handleDialogCancel" :disabled="dialog.loading">{{ $t('取消') }}</bk-button>
        </div>
    </bk-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: {
            routeGroup: {
                type: Array,
                required: true
            },
            currentRoute: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                selectedRouteId: '',
                dialog: {
                    pageId: null,
                    visible: false,
                    loading: false
                }
            }
        },
        computed: {
            ...mapGetters('projectVersion', { versionId: 'currentVersionId' }),
            projectId () {
                return this.$route.params.projectId
            },
            disabled () {
                return !this.selectedRouteId || this.selectedRouteId === this.currentRoute.id
            },
            routeOptionList () {
                const routeList = this.routeGroup.map(({ children }) => children)
                    .reduce((pre, cur) => pre.concat(cur), [])
                    .map(({ id, routeId, layoutPath, path, pageId, redirect }) => ({
                        id: routeId || id,
                        name: `${layoutPath}${layoutPath.endsWith('/') ? '' : '/'}${path}`,
                        pageId,
                        redirect,
                        disabled: pageId !== -1 || Boolean(redirect)
                    }))
                routeList.sort((p1, p2) => p1.disabled - p2.disabled)
                return routeList
            }
        },
        watch: {
            'dialog.visible' (val) {
                if (val) {
                    this.setSelectedRoute()
                } else {
                    this.$emit('closeDialog')
                }
            },
            currentRoute () {
                this.setSelectedRoute()
            }
        },
        methods: {
            async handleDialogConfirm () {
                const route = this.routeOptionList.find(route => route.id === this.selectedRouteId)
                const data = {
                    pageRoute: {
                        routeId: route.id
                    },
                    projectId: this.projectId,
                    versionId: this.versionId,
                    pageId: this.dialog.pageId
                }
                try {
                    this.dialog.loading = true
                    await this.$store.dispatch('route/updatePageRoute', { data })
                    this.$bkMessage({
                        theme: 'success',
                        message: this.$t('路由修改成功')
                    })
                    this.dialog.visible = false
                    this.$emit('success')
                } catch (err) {
                    console.error(err)
                } finally {
                    this.dialog.loading = false
                }
            },
            handleDialogCancel () {
                this.dialog.visible = false
            },
            setSelectedRoute () {
                const { id } = this.currentRoute
                this.selectedRouteId = id || ''
            },
            goToPage (name) {
                const route = this.$router.resolve({
                    name,
                    params: {
                        projectId: this.projectId
                    }
                })
                this.$router.push(route.location)
            }
        }
    }
</script>
