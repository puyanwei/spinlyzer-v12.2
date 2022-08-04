import React, { CSSProperties, useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../styles/dropzoneStyles"
import { Component } from "../types"
import { trpc } from "../utils/trpc"

const rejectedFileTypeErrorMessage = `File type invalid. Please submit a .txt file and try again`
const rejectedTextFileErrorMessage = `Pokerstars hand history file not recognised. Please try again`
const successMessage = `Successfully uploaded`

interface Props extends Component {}

export default function UploadPage({ testId = `upload-page` }: Props) {
  const [errorMessage, setErrorMessage] = useState("")
  const sendHandHistory = trpc.useMutation(["spinlyzer.add"])

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onabort = () => console.warn("file reading was aborted")
      reader.onerror = () => console.warn("file reading has failed")
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target as FileReader | null
        const handHistory = target?.result as string
        if (!handHistory.includes(`PokerStars Tournament #`))
          setErrorMessage(rejectedTextFileErrorMessage)
        sendHandHistory.mutate(handHistory)
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
    accept: {
      "text/html": [".txt"],
    },
    onDrop,
  })

  const style: CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <div data-testid={testId}>
      This is the upload page
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Upload hand histories</p>
      </div>
      <div>{errorMessage}</div>
    </div>
  )
}
