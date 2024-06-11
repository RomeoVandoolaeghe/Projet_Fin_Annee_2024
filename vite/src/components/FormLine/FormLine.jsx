import './FormLine.css';

function FormLine({ title }) {
    return (
        <div className='input-box'>
            <p className='input-label'>{title} :</p>
            <input type="text" className='input-field' />
        </div>
    );
}

export default FormLine;
