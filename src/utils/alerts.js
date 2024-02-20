import Swal from 'sweetalert2'
import { i18n } from '@/plugins/i18n'

const swalSuccess = (options, toast = false) => ({
	...options,
	icon : "success",
	toast: toast
})

const swalError = (options, toast = false) => ({
	...options,
	icon : "error",
	toast: toast
})


const alertSuccess = (message, options = {}) => {
	Swal.fire(swalSuccess({
		...options,
		text : message,
		title: i18n.global.t('Succès'),
	}))
}

const alertError = (message, options = {}) => {
	Swal.fire(swalError({
		...options,
		text: message,
		title: i18n.global.t('Erreur'),
	}))
}

const confirm = (message, callback) => {
	Swal.fire({
        html: message,
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: i18n.global.t('Oui'),
        cancelButtonText: i18n.global.t('Non'),
        customClass: {
          	confirmButton: "btn btn-primary",
          	cancelButton: "btn btn-danger",
        },
	}).then((result) => {
        if (result.isConfirmed) {
          	callback()
        } else if (result.isDenied) {
          Swal.close();
        }
	});
}

const toastSuccess = (message, options = {}) => {
	Swal.fire(swalSuccess({
		timer: 4000,
		position         : "top-end",
		...options,
		text             : message,
		title            : i18n.global.t('Succès'),
		showConfirmButton: false,
	}, true))
}

const toastError = (message, options = {}) => {
	Swal.fire(swalError({
		timer: 4000,
		position         : "top-end",
		...options,
		text             : message,
		title            : i18n.global.t('Erreur'),
		showConfirmButton: false,
	}, true))
}

export const alert = {
    success : alertSuccess,
    error : alertError,
}
export const toast = {
    success: toastSuccess,
    error: toastError,
}


export const useAlert = () => ({
	success: alertSuccess,
	error: alertError,
	confirm,
})

export const useToast = () => ({
	success: toastSuccess,
	error: toastError,
})

