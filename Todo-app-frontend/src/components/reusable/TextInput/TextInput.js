import React, { memo, useCallback } from "react"
import PropTypes from "prop-types"
import { Input } from "antd"
import "./TextInput.stylesheet.sass"

const TextInput = memo((
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
    label = "",
    required = false,
    isInvalid = false,
    ...props
  }
) => {
  const _handleOnChange = useCallback((event) => {
    const { value } = event.target
    onChange(value, name, event)
  }, [])

  return (
        <div className={["input-text", containerClassName].join(" ")} >
            { (label || required)
              ? (
                <div className={["label-container", labelContainerClassName].join(" ")}>
                    {label
                      ? <label className={["label-container__label", labelClassName].join(" ")}>{label}</label>
                      : null
                    }
                    { required
                      ? <label className={["label-container__required-label", requiredLabelClassname].join(" ")}>*</label>
                      : null
                    }
                </div>
                )
              : null }

            <Input className={["input-text__input-box", inputClassname].join(" ")} onChange={_handleOnChange} {...props} />
            { isInvalid ? <span className={["input-text__error", errorClassName].join(" ")}>{ errorMsg }</span> : null }
        </div>
  )
})

TextInput.propTypes = {
  onChange: PropTypes.func,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  labelContainerClassName: PropTypes.string,
  requiredLabelClassname: PropTypes.string,
  inputClassname: PropTypes.string,
  errorClassName: PropTypes.string,
  errorMsg: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  required: PropTypes.bool,
  isInvalid: PropTypes.bool
}

export default TextInput
