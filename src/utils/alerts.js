import Swal from 'sweetalert2'

import { $i18n } from '@/plugins/i18n'

const swalSuccess = (options, toast = false) => ({
	...options,
	icon: 'success',
	toast,
})

const swalError = (options, toast = false) => ({
	...options,
	icon: 'error',
	toast,
})

const swalInfo = (options, toast = false) => ({
	...options,
	icon: 'info',
	toast,
})

const alertSuccess = (message, options = {}) => {
	return Swal.fire(
		swalSuccess({
			...options,
			text: message,
			title: $i18n.t('Succès'),
		}),
	)
}

const alertError = (message, options = {}) => {
	return Swal.fire(
		swalError({
			...options,
			text: message,
			title: $i18n.t('Erreur'),
		}),
	)
}

const alertInfo = (message, options = {}) => {
	return Swal.fire(
		swalInfo({
			...options,
			text: message,
			title: $i18n.t('Info'),
		}),
	)
}

export const confirm = (message, callback) => {
	return Swal.fire({
		buttonsStyling: true,
		cancelButtonText: $i18n.t('Non'),
		confirmButtonText: $i18n.t('Oui'),
		customClass: {
			cancelButton: 'btn btn-danger',
			confirmButton: 'btn btn-primary',
		},
		html: message,
		icon: 'warning',
		showCancelButton: true,
	}).then((result) => {
		if (result.isConfirmed) {
			callback()
		} else if (result.isDenied) {
			Swal.close()
		}
	})
}

export const $confirm = confirm

const toastSuccess = (message, options = {}) => {
	return Swal.fire(
		swalSuccess(
			{
				position: 'top-end',
				timer: 4000,
				...options,
				showConfirmButton: false,
				text: message,
				title: $i18n.t('Succès'),
			},
			true,
		),
	)
}

const toastError = (message, options = {}) => {
	return Swal.fire(
		swalError(
			{
				position: 'top-end',
				timer: 4000,
				...options,
				showConfirmButton: false,
				text: message,
				title: $i18n.t('Erreur'),
			},
			true,
		),
	)
}

export const alert = {
	error: alertError,
	info: alertInfo,
	success: alertSuccess,
}

export const $alert = alert

export const toast = {
	error: toastError,
	success: toastSuccess,
}

export const $toast = toast

export const useAlert = () => ({
	...alert,
	confirm,
})

export const useToast = () => ({
	error: toastError,
	success: toastSuccess,
})
