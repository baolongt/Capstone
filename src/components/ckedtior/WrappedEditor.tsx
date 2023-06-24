// // import ClassicEditor from './ClassicEditor';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import DecoupledEditor from './DocumentEditor';
// import React, { useEffect } from 'react';
// import './DocumentEditor.css';
// import './Editor.css';
// const WrappedEditor = () => {
//   useEffect(() => {}, []);
//   const editorStyle = {
//     '--document-width': '80%',
//     '--document-height': '1000px',
//     '--document-margin-top': '50px',
//     '--document-margin-bottom': '50px',
//     '--document-background-color': '#f7f7f7',
//     '--document-color': '#333',
//     '--document-margin-left': '96px',
//     '--document-margin-right': '96px',
//     '--document-min-height': '1000px'
//   } as any;

//   return (
//     <div>
//       <div style={{ backgroundColor: '#e3e8ed' }} className="document-editor">
//         <div id="toolbar-container" className="document-editor__toolbar"></div>
//         <div style={{}} className="document-editor__editable-container">
//           <div
//             style={{
//               ...editorStyle,
//               backgroundColor: '#fff'
//             }}
//             id="editor__editable"
//             className="document-editor__editable"
//           ></div>
//         </div>
//       </div>
//       <CKEditor
//         editor={DecoupledEditor}
//         data=""
//         onReady={(editor) => {
//           // Add the toolbar to the container
//           const toolbarContainer = document.querySelector('#toolbar-container');
//           toolbarContainer.appendChild(editor.ui.view.toolbar.element);

//           const editorContainer = document.querySelector('#editor__editable');
//           editorContainer.appendChild(editor.ui.view.editable.element);

//           // You can store the "editor" and use when it is needed.
//           console.log('Editor is ready to use!', editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log({ event, editor, data });
//         }}
//         onBlur={(event, editor) => {
//           console.log('Blur.', editor);
//         }}
//         onFocus={(event, editor) => {
//           console.log('Focus.', editor);
//         }}
//       />
//     </div>
//   );
// };

// export default WrappedEditor;
