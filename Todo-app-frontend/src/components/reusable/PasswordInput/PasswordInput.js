import React, { useCallback, memo } from "react"
import PropTypes from "prop-types"
import { Input } from "antd"
import "./PasswordInput.stylesheet.sass"

const PasswordInput = memo((
  {
    onChange = () => { /* Nothing here */ },
    containerClassName = "",
    labelClassName = "",
    labelContainerClassName = "",
    requiredLabelClassname = "",
    inputClassname = "",
    errorClassName = "",
    errorMsg = "",
    name = "",
    data = "",
    label = "",
    required = false,
    isInvalid = false,
    ...props
  }
) => {
  const _handleOnChange = useCallback((event) => {
    const { value } = event.target
    if (data) onChange(value, name, event, data)
    else onChange(value, name, event)
  }, [])

  return (
        <div className={["password-input", containerClassName].join(" ")}>
            { (label || required)
              ? (
                <div className={["password-input__label-container", labelContainerClassName].join(" ")}>
                    {label
                      ? <label className={["password-input__label-container__label", labelClassName].join(" ")}>{label}</label>
                      : null
                    }
                    { required
                      ? <label className={["password-input__label-container__required-label", requiredLabelClassname].join(" ")}>*</label>
                      : null
                    }
                </div>
                )
              : null }

            <Input.Password className={["password-input__input", inputClassname].join(" ")} onChange={_handleOnChange} {...props} />
            { isInvalid ? <span className={["password-input__error", errorClassName].join(" ")}>{ errorMsg }</span> : null }
        </div>
  )
})

PasswordInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  data: PropTypes.any,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  isInvalid: PropTypes.bool,
  labelContainerClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  inputClassname: PropTypes.string,
  requiredLabelClassname: PropTypes.string
}

export default PasswordInput
