import { Editor } from '@toast-ui/react-editor';

const MyEditor = (props) => {
    return (
        <>
        <div>title : <input type="text" value={props.title} placeholder="title" onChange={props.onWriteTitle} /></div>
            <div>writer : <input type="text" value={props.writer} placeholder="writer" onChange={props.onWriteWriter} /></div>
            <div>password : <input type="text" value={props.password} placeholder="passswd" onChange={props.onWritePassword} /></div>

            <Editor
                initialValue={props.initVal}
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
                language="ko-KR"
                ref={props.contentRef}
                onChange={props.onWriteContent}
            />
        </>
    )
}

export default MyEditor;