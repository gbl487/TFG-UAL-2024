import { useState } from 'react'
import { Editor } from 'primereact/editor'
import 'primereact/resources/themes/tailwind-light/theme.css'

export default function EditorReact({ texto }) {
  const [text, setText] = useState(texto)

  const CabeceraEditor = () => {
    return (
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
          <button className="ql-strike" aria-label="Strike"></button>
          <button className="ql-link" aria-label="Insert Link"></button>
          <button className="ql-image" aria-label="Insert Image"></button>
        </span>
        <span className="ql-formats">
          <button
            className="ql-list"
            value="ordered"
            aria-label="Ordered List"
          ></button>
          <button
            className="ql-list"
            value="bullet"
            aria-label="Unordered List"
          ></button>
          <select className="ql-align" aria-label="Text Alignment">
            <option value=""></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span className="ql-formats">
          <select className="ql-color" aria-label="Text Color">
            <option value=""></option>
            <option value="red"></option>
            <option value="green"></option>
            <option value="blue"></option>
          </select>
          <select className="ql-background" aria-label="Background Color">
            <option value=""></option>
            <option value="red"></option>
            <option value="green"></option>
            <option value="blue"></option>
          </select>
          <button className="ql-clean" aria-label="Remove Format"></button>
        </span>
      </div>
    )
  }

  const cabecera = CabeceraEditor()

  return (
    <>
      <Editor
        value={text} // Usa defaultValue en lugar de value
        onTextChange={(e) => {
          setText(e.htmlValue)
          console.log(e)
        }}
        headerTemplate={cabecera}
        style={{ height: '320px' }}
      />
    </>
  )
}
