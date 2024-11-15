export const formValidation = (inputName,
    isRequired = true,
    minLength = null,
    maxLength = null,
    // valueAsNumber = false,
    pattern = null) => {
    return {
        required: {
            value: isRequired,
            message: `${inputName} الزامی است `
        },
        minLength: {
            value: minLength,
            message: `${inputName} حداقل باید ${minLength} کاراکتر باشد`
        },
        maxLength: {
            value: maxLength,
            message: ` ${inputName} حداکثر باید ${maxLength} کاراکتر باشد`
        },
        pattern: {
            value: pattern,
            message: ` ${inputName} وارد شده معتبر نیست`
        },


    }
}
