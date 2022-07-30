import React, { CSSProperties, useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../styles/dropzoneStyles"
import { Component } from "../types"

const rejectedFileTypeErrorMessage = `File type invalid. Please submit a .txt file and try again`
const rejectedTextFileErrorMessage = `Pokerstars hand history file not recognised. Please try again`
const successMessage = `Successfully uploaded`

interface Props extends Component {}

export default function UploadPage({ testId }: Props) {
  const [errorMsg, setErrorMsg] = useState("")

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onabort = () => console.warn("file reading was aborted")
      reader.onerror = () => console.warn("file reading has failed")
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target as FileReader | null
        if (!target?.result) return
        console.warn("target.result", target.result)
        // if (target?.result.includes(`PokerStars Tournament #`)) {
        //   fetch('http://localhost:5000/data', {
        //     method: 'post',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(e.target.result),
        //   })
        //   setErrorMsg(successMessage)
        // } else {
        //   setErrorMsg(rejectedTextFileErrorMessage)
        // }
      }
    })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  })

  const style: CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  )

  return (
    <div data-testid={testId}>
      This is the upload page
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Upload hand histories</p>
      </div>
      <div>{errorMsg}</div>
    </div>
  )
}
