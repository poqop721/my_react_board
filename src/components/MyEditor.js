import { Editor } from '@toast-ui/react-editor';

const MyEditor = (props) => {
    return (
        <>
            <div>title : <input type='text' value={props.title} onChange={props.onWriteTitle}/></div>
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