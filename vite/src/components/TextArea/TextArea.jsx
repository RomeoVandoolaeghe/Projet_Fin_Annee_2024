import './TextArea.css';

function TextArea({ title }) {
    return (
        <div className='input-box'>
            <p>{title}:</p>
            <textarea cols={50} rows={5} />
        </div>
    );
}

export default TextArea;
