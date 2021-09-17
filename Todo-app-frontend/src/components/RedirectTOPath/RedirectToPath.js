import React from "react"
import { useHistory } from "react-router-dom"
export default function RedirectToPath (path) {
    const history = useHistory()
    history.push(`/${path}`)
}
