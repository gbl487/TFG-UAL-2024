import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export default function checkDatosTarjeta({ datosOld, datosNew }) {
  let resultado = ''
  var contenidoOld = new QuillDeltaToHtmlConverter(
    datosOld.contenido,
    {}
  ).convert()
  var contenidoNew = new QuillDeltaToHtmlConverter(
    datosNew.contenido,
    {}
  ).convert()
  if (
    datosOld.titulo !== datosNew.titulo ||
    datosOld.imagen !== datosNew.imagen ||
    JSON.stringify(datosOld.categorias) !==
      JSON.stringify(datosNew.categorias) ||
    contenidoOld !== contenidoNew
  ) {
    resultado = 'OK'
  } else {
    resultado = 'NO_CHANGE'
  }
  return { resultado }
}
