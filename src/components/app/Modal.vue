<template>
    <b-modal
        v-model="modelValue"
        :id="id"
        :size="size"
        :fullscreen="fullscreen"
        no-close-on-backdrop
        no-close-on-esc
        :scrollable="scrollable"
        :no-footer="noFooter"
        :no-header="noHeader"
        @ok.prevent="handleOk"
        @close="handleHidden"
    >
        <template #title>
            <slot name="title">{{ title }}</slot>
        </template>
        <template #footer="{ ok, close }">
            <slot name="footer" v-bind="slotScope">
                <b-button v-if="!okOnly" :size="buttonSize" :variant="cancelVariant" @click.prevent="close()" :disabled="disabled || submitted">{{ titleCancel }}</b-button>
                <b-button :size="buttonSize" v-if="!cancelOnly" :variant="okVariant" @click.prevent="ok()" :disabled="disabled || submitted">
					{{ titleOk }} <b-spinner class="align-middle" small v-if="submitted" />
				</b-button>
            </slot>
        </template>
        <slot />
    </b-modal>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { empty } from 'php-in-js/modules/types'
import { useModal } from 'bootstrap-vue-next'

import { $i18n } from '@/plugins/i18n'

defineOptions({ name: 'AppModal' })

const modelValue = defineModel({ type: Boolean })

const emit = defineEmits(['close', 'ok', 'update:modelValue'])

const props = defineProps({
    buttonSize   : { default: 'sm', type: String },
    cancelOnly   : { default: false, type: Boolean },
    cancelTitle  : { default: null, type: String },
    cancelVariant: { default: 'secondary', type: String },
    disabled     : { default: false, type: Boolean },
    fullscreen   : { default: false, type: Boolean },
    id           : { required: true, type: String },
    noFooter     : { default: false, type: Boolean },
    noHeader     : { default: false, type: Boolean },
    okOnly       : { default: false, type: Boolean },
    okTitle      : { default: null, type: String },
    okVariant    : { default: 'primary', type: String },
    scrollable   : { default: false, type: Boolean },
    size         : { default: 'md', type: String },
    submitted    : { default: false, type: Boolean },
    title        : { default: '', type: String },
})

const modal = useModal(props.id)

const titleCancel = ref('')
const titleOk     = ref('')

const slotScope = computed(() => ({
    close: () => modal.hide(),
}))

onMounted(() => {
    retriveTitle()
})

onUpdated(() => {
    retriveTitle()
})

function handleHidden() {
    emit('close')
    emit('update:modelValue', false)
}

function handleOk(btvEvt) {
    emit('ok', btvEvt)
}

function retriveTitle() {
    titleCancel.value = JSON.parse(JSON.stringify(props.cancelTitle))
    if (empty(titleCancel.value)) {
        titleCancel.value = $i18n.t(`actions.${props.cancelOnly === true ? 'fermer' : 'annuler'}`)
    }

    titleOk.value = JSON.parse(JSON.stringify(props.okTitle))
    if (empty(titleOk.value)) {
        titleOk.value = $i18n.t('actions.valider')
    }
}
</script>

<style></style>
